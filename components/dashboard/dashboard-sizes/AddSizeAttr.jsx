import React, { useRef, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const AddSizeAttr = ({ record, setRecords, i, records }) => {
  const [firstFieldValue, setFirstFieldFalue] = useState("");
  const [secondFieldValue, setSecondFieldValue] = useState("");

  return (
    <tr>
      <td>
        <TextField
          onClick={(event) => (event.target.value = "")}
          required
          value={Object.keys(record)[0]}
          onChange={(event) => {
            setFirstFieldFalue(event.target.value);
            if (event.target.value) {
              setRecords((r) => {
                const newArray = [...r];
                newArray[i] = {
                  ...{ [event.target.value]: secondFieldValue },
                };
                return newArray;
              });
            }
          }}
          size="small"
          className="bg-[white]"
        />
      </td>
      <td>
        <TextField
          required
          onClick={(event) => (event.target.value = "")}
          value={record[firstFieldValue]}
          onChange={(event) => {
            setSecondFieldValue(event.target.value);
            setRecords((r) => {
              const newArray = [...r];
              newArray[i] = {
                ...{ [firstFieldValue]: event.target.value },
              };
              return newArray;
            });
          }}
          size="small"
          className="bg-[white]"
        />
      </td>
      <td>
        <IconButton
          onClick={() => {
            setRecords((r) => {
              const tempArray = [...r];
              tempArray.splice(i, 1);
              return tempArray;
            });
          }}
          disabled={i === 0}
          className="bg-red-200 text-[red]"
        >
          <Cancel />
        </IconButton>
      </td>
    </tr>
  );
};

export default AddSizeAttr;
