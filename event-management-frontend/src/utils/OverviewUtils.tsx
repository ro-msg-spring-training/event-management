import React from "react";
import { Grid, TextField } from "@material-ui/core";

export const createTextField = (
  style: string,
  handleEnterKey: (e: any) => void,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: any) => void,
  defaultValueText: string | number,
  errorText: string,
  inputType: string) => {

  return (
    <Grid item xl={4} lg={4} sm={8} xs={11}>
      <form className={style} autoComplete="off">
        <TextField
          onKeyDown={handleEnterKey}
          disabled={!isAdmin}
          name={name}
          type={inputType}
          fullWidth
          label={labelText}
          variant="outlined"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          required
        />
      </form>
    </Grid>
  );
}

export const createDateTextField = (
  style: string,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: any) => void,
  defaultValueText: string,
  errorText: string) => {

  return (
    <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
      <form className={style} autoComplete="off">
        <TextField
          label={labelText}
          name={name}
          disabled={!isAdmin}
          type="date"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </Grid>
  );
}

export const createTimeTextField = (
  style: string,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: any) => void,
  defaultValueText: string,
  errorText: string) => {

  return (
    <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
      <form className={style} autoComplete="off">
        <TextField
          label={labelText}
          name={name}
          disabled={!isAdmin}
          type="time"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </form>
    </Grid>
  );
}
