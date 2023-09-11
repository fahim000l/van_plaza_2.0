import useGetQsByProductIdSizeId from "@/hooks/useGetQsByProductIdSizeId";
import React from "react";
import SizeDetailsDrawer from "../../dashboard-sizes/SizeDetailsDrawer";
import useGetSizeById from "@/hooks/useGetSizeById";
import useGetProductById from "@/hooks/useGetProductById";

const InvoiceStockQuantiryRow = ({ qp }) => {
  const { size: sizeId, quantity, productId } = qp;

  const { size } = useGetSizeById(sizeId);
  const { product } = useGetProductById(productId);

  return (
    <tr>
      <th>{sizeId}</th>
      <td>{size?.sizeName}</td>
      <td>{quantity}</td>
      <td>
        {size && product && (
          <SizeDetailsDrawer
            sizeAttributes={size?.sizeAttributes}
            sizeName={size?.sizeName}
            categoryId={product?.categoryId}
            sizeId={sizeId}
          />
        )}
      </td>
    </tr>
  );
};

export default InvoiceStockQuantiryRow;
