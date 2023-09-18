import React, { useRef } from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useGetAllSuppliers from "@/hooks/useGetAllSuppliers";

const AddSupplierModal = () => {
  const modalToggleRef = useRef();
  const { suppliersRefetch } = useGetAllSuppliers();

  const Formik = useFormik({
    initialValues: {
      supplierName: "",
      contactInfo: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetch("/api/store-new-supplier", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            suppliersRefetch();
            toast.success("New Supplier Inserted successfully");
            Formik.resetForm();
            modalToggleRef.current.click();
          }
        });
    },
  });

  return (
    <div>
      <input
        ref={modalToggleRef}
        type="checkbox"
        id="AddSupplierModal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box text-center">
          <h3 className="text-lg font-bold">Add New Supplier</h3>
          <p className="py-4">Please provide necessery info</p>
          <form onSubmit={Formik.handleSubmit}>
            <TextField
              required
              className="my-2"
              fullWidth
              {...Formik.getFieldProps("supplierName")}
              label={"Supplier Name"}
              name="supplierName"
              variant="filled"
            />
            <TextField
              required
              className="my-2"
              fullWidth
              {...Formik.getFieldProps("contactInfo")}
              name="contactInfo"
              label={"Contact Info"}
              variant="filled"
            />
            <Button
              type="submit"
              className="bg-[darkblue] mt-2"
              variant="contained"
            >
              Add Supplier
            </Button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="AddSupplierModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddSupplierModal;
