import React from "react";
import { Chip } from "@mui/material";

const OpsTableRow = ({ op, i }) => {
  const {
    quantity,
    qpInfo: {
      [0]: {
        sizeInfo: {
          [0]: { sizeName },
        },
        psInfo: {
          [0]: {
            sellPrice,
            productInfo: {
              [0]: {
                productName,
                standardImage,
                categoryInfo: {
                  [0]: { categoryName },
                },
              },
            },
          },
        },
      },
    },
  } = op;

  return (
    <tr>
      <th>{i + 1}</th>
      <td className="flex space-x-2 items-center">
        <div className="avatar">
          <div className="w-14 rounded">
            <img src={standardImage} alt={productName?.split("-")[0]} />
          </div>
        </div>
        <p>{productName?.split("-")[0]}</p>
      </td>
      <td>
        <Chip color="primary" label={categoryName} />
      </td>
      <td>
        <Chip color="warning" label={sizeName} />
      </td>
      <td>
        <Chip label={quantity} />
      </td>
      <td>{sellPrice} /-</td>
    </tr>
  );
};

export default OpsTableRow;
