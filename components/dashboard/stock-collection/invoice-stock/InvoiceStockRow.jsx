import React from "react";
import { TableRow, TableCell, TextField, Chip } from "@mui/material";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";
import AutoSelect from "@/components/common_auto-complete";
import usegetSupplierById from "@/hooks/usegetSupplierById";
import useGetPsByInvoiceId from "@/hooks/useGetPsByInvoiceId";
import useGetQsByInvoiceId from "@/hooks/useGetQsByInvoiceId";

const InvoiceStockRow = ({ invoice }) => {
  const { _id, supplierId, date, transId } = invoice;

  const { suppliers } = useGetAllSuppliers();
  const { supplier } = usegetSupplierById(supplierId);

  const { sps_invoice } = useGetPsByInvoiceId(_id);
  const { qps_invoice } = useGetQsByInvoiceId(_id);

  const totalPrice = (priceTitle) => {
    return sps_invoice?.reduce((total, newValue) => {
      return total + parseFloat(newValue[priceTitle]).toFixed(3);
    }, 0);
  };

  const totalQuantity = () => {
    return qps_invoice?.reduce((total, newValue) => {
      return total + parseInt(newValue?.quantity);
    }, 0);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <div className="full">
          <TextField fullWidth className="my-1 w-60" size="small" value={_id} />
          <TextField fullWidth className="my-1" size="small" value={date} />
        </div>
      </TableCell>
      <TableCell align="right">
        {supplier && (
          <div className="w-full">
            <AutoSelect
              className={"w-40 my-1"}
              size={"small"}
              options={suppliers}
              globalLabel={"supplierName"}
              value={supplier}
            />
            <Chip label={supplier?.contactInfo} className="my-1" />
          </div>
        )}
      </TableCell>
      <TableCell align="right">
        <div className="w-full">
          <TextField size="small" className="my-1 w-52" value={transId} />
        </div>
      </TableCell>
      <TableCell align="right">
        <div>
          <Chip className="my-1" label={`Single : ${totalPrice("buyPrice")}`} />
          <Chip
            className="my-1"
            label={`Each : ${totalPrice("buyPrice") * totalQuantity()}`}
          />
        </div>
      </TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
      <TableCell align="right">Something</TableCell>
    </TableRow>
  );
};

export default InvoiceStockRow;
