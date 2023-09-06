import * as React from "react";
import { Drawer, IconButton, Chip, TextField } from "@mui/material";
import useGetSizesByCategory from "@/hooks/useGetSizesByCategory";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import { STOCK_IN_CONTEXT } from "@/contexts/StockInProvider";

export default function QuantityInDrawer({ disabled, product, i }) {
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

  const { sizes_category } = useGetSizesByCategory(product?.categoryId);
  const { category } = useGetCategoryById(product?.categoryId);
  const { Formik } = React.useContext(STOCK_IN_CONTEXT);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton disabled={disabled} onClick={toggleDrawer(anchor, true)}>
            <Chip
              label={
                Formik.values.stockProducts?.[i]?.quantities?.reduce(
                  (total, nextNumber) => {
                    return total + parseInt(nextNumber?.quantity);
                  },
                  0
                ) || 0
              }
            />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="p-10">
              <div className="grid card bg-base-300 rounded-box p-10">
                <p className="my2">
                  Product :{" "}
                  <Chip color="primary" label={product?.productName} />{" "}
                </p>
                <p className="my-2">
                  Category :{" "}
                  <Chip color="primary" label={category?.categoryName} />{" "}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes_category?.map((size, j) => (
                      <tr key={j}>
                        <th>{j + 1}</th>
                        <td>
                          <Chip color="info" label={size?.sizeName} />
                        </td>
                        <td>
                          <TextField
                            onClick={(event) => (event.target.value = "")}
                            onChange={(event) => {
                              const updatedStockProducts = [
                                ...Formik.values.stockProducts,
                              ];
                              const updatedStockQuantities = [
                                ...updatedStockProducts?.[i]?.quantities,
                              ];
                              const updatedQuantity = {
                                ...updatedStockQuantities[j],
                                size: size?._id,
                                quantity: event.target.value,
                                transId: Formik.values.transId,
                                productId:
                                  Formik.values.stockProducts[i].productId,
                              };
                              updatedStockQuantities[j] = updatedQuantity;
                              updatedStockProducts[i].quantities =
                                updatedStockQuantities;
                              Formik.setFieldValue(
                                "stockProducts",
                                updatedStockProducts
                              );
                            }}
                            value={
                              Formik.values.stockProducts?.[i]?.quantities?.[j]
                                ?.quantity || 0
                            }
                            size="small"
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <th>#</th>
                      <td>
                        <Chip color="info" label={"Total"} />
                      </td>
                      <td>
                        <Chip
                          className="w-full"
                          label={Formik.values.stockProducts?.[
                            i
                          ]?.quantities?.reduce((total, nextNumber) => {
                            return total + parseInt(nextNumber?.quantity);
                          }, 0)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
