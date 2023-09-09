import React from "react";
import { Autocomplete } from "@mui/lab";
import { Box, TextField } from "@mui/material";

const AutoSelect = ({
  sx,
  defaultValue,
  options,
  onChange,
  label,
  value,
  globalLabel,
  imgType,
  imgSrc,
  disabled,
  getOptionDisabled,
  className,
  size,
  ref,
}) => {
  return (
    <Autocomplete
      ref={ref}
      defaultValue={defaultValue}
      disabled={disabled}
      getOptionDisabled={getOptionDisabled}
      value={value}
      className={className}
      size={size}
      id="country-select-demo"
      sx={sx}
      options={options}
      onChange={onChange}
      autoHighlight
      getOptionLabel={(option) => option[globalLabel]}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {imgType && imgType && (
            <img
              loading="lazy"
              width="20"
              src={`/uploads/images/${imgType}/${option[imgSrc]}`}
              alt=""
            />
          )}
          {option[globalLabel]}
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
  );
};

export default AutoSelect;
