import React, { useRef, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Done, Edit, Delete } from "@mui/icons-material";

const ShowSizeAttr = ({
  record,
  editingAttr,
  setEditingAttr,
  setRecords,
  i,
}) => {
  const [firstFieldValue, setFirstFieldFalue] = useState(
    Object.keys(record)[0]
  );
  const [secondFieldValue, setSecondFieldValue] = useState("");

  return (
    <tr>
      <td>
        <TextField
          disabled={editingAttr !== i}
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
          disabled={editingAttr !== i}
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
        {editingAttr === i ? (
          <IconButton
            onClick={() => setEditingAttr("")}
            className="bg-[green] text-white hover:bg-green-400"
          >
            <Done />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setEditingAttr(i)}
            className="bg-[darkblue] text-white hover:bg-blue-400"
          >
            <Edit />
          </IconButton>
        )}
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
          className="bg-[red] text-white hover:bg-red-500"
        >
          <Delete />
        </IconButton>
      </td>
    </tr>
  );
};

export default ShowSizeAttr;
