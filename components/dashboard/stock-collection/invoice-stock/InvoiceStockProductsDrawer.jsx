import * as React from "react";
import { IconButton, Drawer, Chip } from "@mui/material";
import { ArrowRight, ArrowLeft, Backspace } from "@mui/icons-material";
import InvoiceStockProductsRow from "./InvoiceStockProductsRow";

export default function InvoiceStockProductsDrawer({ sps_invoice }) {
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

  const tableContainerRef = React.useRef();

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft += 100; // Adjust the scrolling distance as needed
    }
  };

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft -= 100; // Adjust the scrolling distance as needed
    }
  };

  const [editindProduct, setEditingProduct] = React.useState("");

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Chip className="my-1" label={10} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="m-5">
              <IconButton
                onClick={toggleDrawer(anchor, false)}
                color="primary"
                className="bg-blue-200"
              >
                <Backspace />
              </IconButton>
              <div className="mt-2">
                <IconButton onClick={scrollLeft}>
                  <ArrowLeft />
                </IconButton>
                <IconButton onClick={scrollRight}>
                  <ArrowRight />
                </IconButton>
              </div>
            </div>
            <div className="grid m-5 card bg-base-300 rounded-box">
              <div ref={tableContainerRef} className="overflow-x-hidden">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="font-bold text-white sticky left-0 bg-[darkblue] z-auto">
                        Product
                      </th>
                      <th>Net Buy Price</th>
                      <th>Net Sell Price</th>
                      <th>Net Profit</th>
                      <th>Avg Buy Price</th>
                      <th>Avg Sell Price</th>
                      <th>Avg Profit</th>
                      <th>Quantity</th>
                      <th className="font-bold text-white flex justify-evenly sticky right-0 bg-[darkblue] z-auto">
                        <span>Edit</span> <span>Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sps_invoice?.map((sp, i) => (
                      <InvoiceStockProductsRow
                        setEditingProduct={setEditingProduct}
                        editindProduct={editindProduct}
                        sp={sp}
                        key={sp?._id}
                        i={i}
                      />
                    ))}
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
