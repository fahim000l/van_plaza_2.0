import React, { useRef } from "react";
import {
  Chip,
  Avatar,
  TableRow,
  TableCell,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ShowLocationModal from "./ShowLocationModal";
import OpsDrawer from "./OpsDrawer";

const OrdersTableRow = ({ order, setViewLocation, setViewUser }) => {
  const {
    date,
    _id,
    status,
    location,
    ops,
    deleveryFee,
    transId,
    userInfo,
    userInfo: {
      [0]: { profilePic },
    },
  } = order;

  const showLocationModalLabel = useRef();
  const showUserModalLabel = useRef();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <label
          onClick={() => setViewUser(userInfo[0])}
          ref={showUserModalLabel}
          className="hidden"
          htmlFor="showUserModal"
        >
          Show User
        </label>
        <IconButton onClick={() => showUserModalLabel.current.click()}>
          <Avatar src={profilePic} />
        </IconButton>
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
      <TableCell align="center">
        <OpsDrawer ops={ops} />
      </TableCell>
      <TableCell align="center">
        <button className="btn btn-info btn-xs normal-case">{status}</button>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
