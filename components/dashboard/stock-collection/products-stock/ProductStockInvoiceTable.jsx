import useGetInvoiceById from "@/hooks/useGetInvoiceById";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";
import useGetQsByInvoiceId from "@/hooks/useGetQsByInvoiceId";
import usegetSupplierById from "@/hooks/usegetSupplierById";
import React from "react";

const ProductStockInvoiceTable = ({ sp }) => {
  const { invoice } = useGetInvoiceById(sp?.invoiceId);

  const { supplier } = usegetSupplierById(invoice?.supplierId);

  const { sps_invoice } = useGetPsByInvoiceId(sp?.invoiceId);

  const { qps_invoice } = useGetQsByInvoiceId(sp?.invoiceId);

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
              <td>{invoice?._id}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>Supplier Name</th>
              <td>{supplier?.supplierName}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>Supplier Contact Info</th>
              <td>{supplier?.contactInfo}</td>
            </tr>
            <tr>
              <th>Invoice Date</th>
              <td>{invoice?.date}</td>
            </tr>
            <tr>
              <th>Trans Id</th>
              <td>{invoice?.transId}</td>
            </tr>
            <tr>
              <th>Total Products</th>
              <td>{sps_invoice?.length}</td>
            </tr>
            <tr>
              <th>Including Sizes</th>
              <td>{qps_invoice?.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStockInvoiceTable;
