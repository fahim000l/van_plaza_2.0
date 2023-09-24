import useGetPsById from "@/hooks/useGetPsById";
import Main from "@/layouts/Main";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AddShoppingCartSharp } from "@mui/icons-material";
import SizeSelectModal from "@/components/SizeSelectModal";

const OnSaleProductDetails = () => {
  const { query } = useRouter();

  const results = useGetPsById(query?.psId);

  const {
    ps,
    ps: {
      [0]: {
        qps = [],
        sellPrice = "",
        flaw1 = "",
        flaw2 = "",
        flaw3 = "",
        products: {
          [0]: {
            productName = "",
            categories: { [0]: { allSizes = [] } = {} } = {},
            standardImage = "",
            regularImage = "",
            detailedImage = "",
          } = {},
        } = {},
      } = {},
    } = {},
  } = results;

  const [mainImage, setMainImage] = useState(standardImage);
  const sizeSelectModal = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (standardImage) {
      setMainImage(standardImage);
    }
  }, [standardImage]);

  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    if (ps) {
      const imgToAdd = [
        { src: standardImage, tag: "Product Featuring Image" },
        { src: regularImage, tag: "Product Featuring Image" },
        { src: detailedImage, tag: "Product Featuring Image" },
        { src: flaw1, tag: "Defect Image" },
        { src: flaw2, tag: "Defect Image" },
        { src: flaw3, tag: "Defect Image" },
      ].filter((img) => Boolean(img.src) === true);

      setImagesArray((imgs) => [...imgs, ...imgToAdd]);
    }
  }, [ps, standardImage, regularImage, detailedImage, flaw1, flaw2, flaw3]);

  return (
    <Main>
      <div className="flex bg-[steelblue] rounded-box m-2 p-1 md:m-5 lg:m-10 md:p-5 lg:p-10">
        <div className="flex flex-col w-full">
          <div className="flex lg:flex-row flex-col space-x-2 w-full">
            <div className="carousel lg:hidden h-64">
              {imagesArray?.map((img, i) => (
                <div
                  id={`slide${i}`}
                  className="carousel-item flex flex-col w-full"
                >
                  <p className="text-center font-bold text-white">{img?.tag}</p>
                  <img src={img?.src} className="h-40 rounded-lg" />
                  <div className="flex justify-between my-2">
                    <a
                      href={`#slide${i - 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${i + 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-[40%] hidden lg:inline mb-2 lg:mb-0">
              <div className="rounded-lg">
                <p className="text-white font-bold">Product Featuring Images</p>
                <div className="flex space-x-5">
                  {regularImage && (
                    <img
                      onClick={() => setMainImage(regularImage)}
                      src={regularImage}
                      className="rounded-lg cursor-pointer h-12 w-12"
                    />
                  )}
                  {detailedImage && (
                    <img
                      onClick={() => setMainImage(detailedImage)}
                      src={detailedImage}
                      className="rounded-lg cursor-pointer h-12 w-12"
                    />
                  )}
                  {standardImage && (
                    <img
                      onClick={() => setMainImage(standardImage)}
                      src={standardImage}
                      className="rounded-lg cursor-pointer h-12 w-12"
                    />
                  )}
                </div>
              </div>
              <img
                src={mainImage}
                className="w-full h-64 rounded-lg my-2"
                alt=""
              />
              <div hidden={!flaw1 && !flaw2 && !flaw3} className="rounded-lg">
                <p className="text-white font-bold">Defect Images</p>
                <div className="flex space-x-5">
                  {flaw1 && (
                    <img
                      onClick={() => setMainImage(flaw1)}
                      src={flaw1}
                      className="rounded-lg w-12 h-12 cursor-pointer"
                    />
                  )}
                  {flaw2 && (
                    <img
                      onClick={() => setMainImage(flaw2)}
                      src={flaw2}
                      className="rounded-lg w-12 h-12 cursor-pointer"
                    />
                  )}
                  {flaw3 && (
                    <img
                      onClick={() => setMainImage(flaw3)}
                      src={flaw3}
                      className="rounded-lg w-12 h-12 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col bg-base-300 rounded-box py-5 px-2 lg:w-[60%]">
              <div className="lg:w-[50%]">
                <p className="lg:text-3xl text-2xl upper-case">{productName}</p>
                <div className="divider"></div>
                <p className="lg:text-5xl text-3xl text-[blue]">
                  {sellPrice} /-
                </p>
                <label
                  onClick={() => setSelectedProduct(results?.ps)}
                  ref={sizeSelectModal}
                  hidden
                  htmlFor="sizeSelectModal"
                >
                  Size Select Modal
                </label>
                <Button
                  onClick={() => sizeSelectModal.current.click()}
                  variant="contained"
                  className="bg-[steelblue] text-white"
                  endIcon={<AddShoppingCartSharp />}
                >
                  Add to Cart
                </Button>
                <div className="divider"></div>
                <div>
                  <p>Available Sizes</p>
                  <div className="grid grid-cols-4 gap-5">
                    {qps?.map((quantity) => (
                      <div
                        key={quantity?._id}
                        className="rounded-lg bg-primary text-white font-bold text-center"
                      >
                        {quantity?.sizes[0].sizeName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="overflow-x-auto rounded-box lg:w-[50%]">
                <table className="table">
                  {/* head */}
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="font-bold">Size</th>
                      {allSizes?.[0]?.sizeAttributes?.map((attr, i) => (
                        <th className="font-bold" key={i}>
                          {Object.keys(attr)[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {allSizes?.map((size, i) => (
                      <tr key={i}>
                        <td className="font-bold">{size?.sizeName}</td>
                        {size?.sizeAttributes?.map((attr, i) => (
                          <td key={i}>{Object.values(attr)[0]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <SizeSelectModal
          setSelectedProduct={setSelectedProduct}
          selectedSp={selectedProduct}
        />
      )}
    </Main>
  );
};

export default OnSaleProductDetails;
