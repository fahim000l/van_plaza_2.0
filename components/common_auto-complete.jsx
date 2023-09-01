import React from "react";
import { Autocomplete } from "@mui/lab";
import { Box } from "@mui/material";

const AutoSelect = ({
  sx,
  defaultValue,
  options,
  onChange,
  label,
  value,
  getOptionLabel,
  children,
  src,
}) => {
  return (
    <div>
      <Autocomplete
        defaultValue={defaultValue}
        value={value}
        size="small"
        id="country-select-demo"
        sx={sx}
        options={options}
        onChange={onChange}
        autoHighlight
        getOptionLabel={getOptionLabel}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="20" src={src} alt="" />
            {children}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            name="category"
            fullWidth
            {...params}
            className="bg-white my-2"
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
};

export default AutoSelect;
