import React, { useRef } from "react";
import {
  Chip,
  Avatar,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import ShowLocationModal from "./ShowLocationModal";

const OrdersTableRow = ({ order, setViewLocation }) => {
  const {
    date,
    _id,
    status,
    location,
    ops,
    deleveryFee,
    transId,
    userInfo: {
      [0]: { profilePic },
    },
  } = order;

  const showLocationModalLabel = useRef();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Avatar src={profilePic} />
      </TableCell>
      <TableCell align="center">
        <input
          type="text"
          className="input input-bordered input-sm mb-2"
          value={date}
          disabled
        />
        <Chip label={_id} />
      </TableCell>
      <TableCell align="center">{deleveryFee} /-</TableCell>
      <TableCell align="center">{transId}</TableCell>
      <TableCell align="center">
        <TextField size="small" value={location?.Address?.address} />
        <label
          ref={showLocationModalLabel}
          htmlFor="showLocationModal"
          className="hidden"
          onClick={() => setViewLocation(location)}
        >
          Show Location
        </label>
        <Button
          onClick={() => showLocationModalLabel.current.click()}
          fullWidth
          size="small"
          className="bg-[steelblue] hover:bg-[steelblue] text-white hover:text-white normal-case mt-2"
        >
          Detail
        </Button>
      </TableCell>
      <TableCell align="center">{ops?.length}</TableCell>
      <TableCell align="center">{status}</TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
