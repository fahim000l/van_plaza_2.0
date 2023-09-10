import useGetQsByProductIdSizeId from "@/hooks/useGetQsByProductIdSizeId";
import React from "react";
import SizeDetailsDrawer from "../../dashboard-sizes/SizeDetailsDrawer";

const InvoiceStockQuantiryRow = ({ size, product }) => {
  const { sizeName, _id, sizeAttributes } = size;

  const { qps_product_size } = useGetQsByProductIdSizeId(
    product?._id,
    size?._id
  );

  if (qps_product_size?.length > 0) {
    console.log(qps_product_size);

    const totalQuantity = () => {
      return qps_product_size?.reduce((total, newValue) => {
        return total + parseInt(newValue?.quantity);
      }, 0);
    };

    return (
      <tr>
        <th>{_id}</th>
        <td>{sizeName}</td>
        <td>{totalQuantity()}</td>
        <td>
          <SizeDetailsDrawer
            sizeAttributes={sizeAttributes}
            sizeName={sizeName}
            categoryId={product?.categoryId}
            sizeId={_id}
          />
        </td>
      </tr>
    );
  }
};

export default InvoiceStockQuantiryRow;
