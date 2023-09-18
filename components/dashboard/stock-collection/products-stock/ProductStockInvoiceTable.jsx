import useGetInvoiceById from "@/hooks/useGetInvoiceById";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";
import useGetQsByInvoiceId from "@/hooks/useGetQsByInvoiceId";
import usegetSupplierById from "@/hooks/usegetSupplierById";
import React from "react";

const ProductStockInvoiceTable = ({ sp }) => {
  const { invoice } = useGetInvoiceById(sp?.invoiceId);

  return (
    <div className="grid card bg-base-300 rounded-box m-5">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>Invoice Id</th>
              <td>{invoice?.[0]?._id}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>Supplier Name</th>
              <td>{invoice?.[0]?.supplier?.[0]?.supplierName}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>Supplier Contact Info</th>
              <td>{invoice?.[0]?.supplier?.[0]?.contactInfo}</td>
            </tr>
            <tr>
              <th>Invoice Date</th>
              <td>{invoice?.[0]?.date}</td>
            </tr>
            <tr>
              <th>Trans Id</th>
              <td>{invoice?.[0]?.transId}</td>
            </tr>
            <tr>
              <th>Total Products</th>
              <td>{invoice?.[0]?.sps_invoice?.length}</td>
            </tr>
            <tr>
              <th>Including Sizes</th>
              <td>{invoice?.[0]?.qps_invoice?.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStockInvoiceTable;
