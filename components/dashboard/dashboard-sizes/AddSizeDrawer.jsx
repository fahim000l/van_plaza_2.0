import React, { useRef, useState } from "react";
import { Box, Drawer, Button, Fab, TextField, IconButton } from "@mui/material";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import { Autocomplete } from "@mui/lab";
import { Add, Cancel } from "@mui/icons-material";
import { useFormik } from "formik";
import AddSizeAttr from "./AddSizeAttr";
import { toast } from "react-hot-toast";
import useGetAllSizes from "@/hooks/useGetAllSizes";

const AddSizeDrawer = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { categories } = useGetAllCategories();
  const { sizesRefetch } = useGetAllSizes();
  const [records, setRecords] = useState([{}]);
  const Formik = useFormik({
    initialValues: {
      sizeName: "",
      categoryId: "",
      sizeAttributes: [],
    },
    onSubmit: (values) => {
      setRecords((r) => r.filter((obj) => obj !== {}));
      values.sizeAttributes = records?.filter((record) => record !== {});

      fetch("/api/store-new-size", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.acknowledged) {
            sizesRefetch();
            toast.success("New Size inserted successfully");
            Formik.resetForm();
            setRecords([{}]);
          }
        });
    },
  });

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            sx={{ backgroundColor: "darkblue !important", marginY: 2 }}
          >
            Add New Size
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <form
              onSubmit={Formik.handleSubmit}
              className="w-full p-10 flex flex-col"
            >
              <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-10 h-52">
                  <TextField
                    required
                    fullWidth
                    className="bg-[white] my-2"
                    variant="filled"
                    name="sizeName"
                    {...Formik.getFieldProps("sizeName")}
                    label="Size Name"
                  />
                  <Autocomplete
                    fullWidth
                    size="small"
                    onChange={(event, newValue) =>
                      Formik.setFieldValue("categoryId", newValue?._id)
                    }
                    id="country-select-demo"
                    options={categories}
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
                </div>
                <div className="divider lg:divider-horizontal" />
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-10">
                  <p className="font-bold my-2">
                    Add Attributes & Measurements
                  </p>
                  <div className="overflow-x-auto w-full mb-10">
                    <table className="table border-2 border-gray-500 border-solid rounded-xl">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Attribute</th>
                          <th>Measurement</th>
                          <th>Cancel</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records?.map((record, i) => (
                          <AddSizeAttr
                            key={i}
                            record={record}
                            setRecords={setRecords}
                            records={records}
                            i={i}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Fab
                    onClick={() => setRecords((r) => [...r, {}])}
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                    }}
                    size="small"
                    aria-label={"Add"}
                    color="primary"
                    className="bg-[darkblue]"
                  >
                    <Add />
                  </Fab>
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="bg-[darkblue] w-32 ml-auto mb-5 mt-5"
              >
                Add Size
              </Button>
            </form>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddSizeDrawer;
