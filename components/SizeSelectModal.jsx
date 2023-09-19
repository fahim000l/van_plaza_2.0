import { Divider } from "@mui/joy";
import React, { useContext, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/joy";
import { Chip } from "@mui/material";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import toast from "react-hot-toast";

const SizeSelectModal = ({ selectedSp, setSelectedProduct }) => {
  const { authUser } = useContext(AUTH_CONTEXT);

  const {
    sellPrice,
    products: {
      [0]: { standardImage, productName },
    },
    qps,
  } = selectedSp;

  const [selectedQp, setSelectedQp] = useState(qps[0]);

  const handleAddToCart = () => {
    const cartInfo = {
      qpId: selectedQp?._id,
      user: authUser?.email,
      quantity: 1,
    };

    fetch("/api/store-cart", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Product Added to the cart");
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="sizeSelectModal" className="modal-toggle" />
      <div className="modal lg:modal-middle modal-bottom">
        <div className="modal-box">
          <div className="flex mb-2">
            <div className="avatar">
              <div className="w-20 rounded">
                <img src={standardImage} alt="Tailwind-CSS-Avatar-component" />
              </div>
            </div>
            <div className="ml-2">
              <h3 className="text-lg font-bold">{productName}</h3>
              <p>
                Selected Size :{" "}
                <Chip label={selectedQp?.sizes?.[0]?.sizeName} />{" "}
              </p>
              <p className="font-bold text-[steelblue]">{sellPrice}/-</p>
            </div>
          </div>
          <Divider />
          <div className="mt-2 mb-2">
            <p className="font-bold mb-2">Select the size you want</p>
            <div className="grid grid-cols-4 gap-5 ">
              {qps?.map((qp) => (
                <button
                  onClick={() => setSelectedQp(qp)}
                  className={`btn btn-primary ${
                    selectedQp !== qp && "btn-outline"
                  } btn-sm`}
                  key={qp?._id}
                >
                  {qp.sizes[0].sizeName}
                </button>
              ))}
            </div>
          </div>
          <Divider />
          <Button
            onClick={handleAddToCart}
            fullWidth
            endDecorator={<AddShoppingCart />}
            className="bg-[steelblue] text-white hover:bg-[blue] mt-2 text-xs addToCartBtn"
            size="sm"
          >
            Add To Cart
          </Button>
        </div>
        <label
          onClick={() => setSelectedProduct(null)}
          className="modal-backdrop"
          htmlFor="sizeSelectModal"
        >
          Close
        </label>
      </div>
    </div>
  );
};

export default SizeSelectModal;
