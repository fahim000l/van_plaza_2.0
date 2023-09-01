import AddProducts from "@/layouts/AddProducts";
import React, { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { ADD_PRODUCT_CONTEXT } from "@/contexts/AddProductProvider";
import Image from "next/image";
import noImage from "../../../../public/common/no_image.png";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const AddProductForm = () => {
  const { categories } = useGetAllCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    if (selectedCategory) {
      console.log(selectedCategory);
    }
  }, [selectedCategory]);
  const {
    regularImage,
    regularImgFile,
    detailedImage,
    detailedImgFile,
    standardImage,
    standardImgFile,
    setStandardImage,
    setStandardImgFile,
    setDetailedImage,
    setDetailedImgFile,
    setRegularImage,
    setRegularImgFile,
  } = useContext(ADD_PRODUCT_CONTEXT);

  const handleAddProduct = (event) => {
    event.preventDefault();

    const form = event.target;
    const productName = form.productName.value;
    const buyPrice = form.buyPrice.value;
    const sellPrice = form.sellPrice.value;
    const categoryId = selectedCategory?._id;

    const productInfo = {
      productName,
      buyPrice,
      sellPrice,
      categoryId,
    };

    console.log(productInfo);
    const formData = new FormData();
    if (regularImgFile) {
      formData.append("regular_image", regularImgFile);
    }

    if (detailedImgFile) {
      formData.append("detailed_image", detailedImgFile);
    }

    if (standardImgFile) {
      formData.append("standard_image", standardImgFile);
    }

    fetch("/api/store-products-image-file", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData?.success) {
          if (imageData?.fileInfo?.detailed_image) {
            productInfo["detailedImage"] =
              imageData?.fileInfo?.detailed_image[0]?.newFilename;
          }

          if (imageData?.fileInfo?.regular_image) {
            productInfo["regularImage"] =
              imageData?.fileInfo?.regular_image[0]?.newFilename;
          }

          if (imageData?.fileInfo?.standard_image) {
            productInfo["standardImage"] =
              imageData?.fileInfo?.standard_image[0]?.newFilename;
          }

          fetch("/api/store-new-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data?.acknowledged) {
                form.reset();
                setSelectedCategory(null);
                setRegularImage("");
                setRegularImgFile(null);
                setStandardImage("");
                setStandardImgFile(null);
                setDetailedImage("");
                setDetailedImgFile("");
                toast.success("Product inserted successfully");
                push("/dashboard/add-products/regular-image");
              }
            });
        }
      });
  };

  return (
    <AddProducts>
      <div className="flex flex-col w-full lg:flex-row">
        <form
          onSubmit={handleAddProduct}
          className="grid flex-grow card bg-base-300 rounded-box place-items-center p-5"
        >
          <TextField
            variant="filled"
            name="productName"
            fullWidth
            placeholder="Product Name"
            className="my-2 bg-white"
          />
          <TextField
            variant="filled"
            fullWidth
            name="buyPrice"
            placeholder="Buy Price"
            className="my-2 bg-white"
          />
          <TextField
            variant="filled"
            fullWidth
            name="sellPrice"
            placeholder="Sell Price"
            className="my-2 bg-white"
          />
          <div className="flex justify-between w-full items-center">
            <Autocomplete
              fullWidth
              id="country-select-demo"
              sx={{ width: 300 }}
              options={categories}
              onChange={(event, newValue) => setSelectedCategory(newValue)}
              autoHighlight
              getOptionLabel={(option) => option.categoryName}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`/uploads/images/categories/${option?.categoryImage}`}
                    alt=""
                  />
                  {option.categoryName}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  name="category"
                  onChange={() => setSelectedCategory(params)}
                  fullWidth
                  {...params}
                  className="bg-white my-2"
                  label="Select Category"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-[darkblue] h-10"
            >
              Add Product
            </Button>
          </div>
        </form>
        <div className="divider lg:divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-5">
          {[regularImage, standardImage, detailedImage]?.map((image) => (
            <Image
              className="rounded-lg my-2 h-28 w-48"
              src={image ? image : noImage}
              height={150}
              width={150}
            />
          ))}
        </div>
      </div>
    </AddProducts>
  );
};

export default AddProductForm;
