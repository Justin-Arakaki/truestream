import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';
import LoadingScreen from './loading-screen';
import MoneyFormat from './money-format';
import updateSubs from '../api/update-subs';
import addSubs from '../api/add-subs';
import deleteSubs from '../api/delete-subs';
import getServices from '../api/get-services';
import {
  FormControl,
  Stack,
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Switch,
  Button
} from '@mui/material';
import dayjs from 'dayjs';

export default function SubsForm(props) {
  const {
    formValues,
    serviceOptions,
    loading,
    open,
    onChange: handleChange,
    onClose: handleClose,
    onSubmit: handleSubmit,
    onDelete: handleDelete
  } = props;
  const serviceOptionIndex = serviceOptions && formValues.serviceName
    ? serviceOptions.findIndex(x => x.serviceName === formValues.serviceName)
    : null;
  const currentService = serviceOptions && formValues.serviceName
    ? serviceOptions[serviceOptionIndex]
    : null;

  const [autoValue, setAutoValue] = useState(currentService);
  const [autoInputValue, setAutoInputValue] = useState('');
  useEffect(() => setAutoValue(currentService), [currentService]);

  const renderActionButtons = () => {
    if (!formValues.subsId) {
      return (
        <Button type="submit" variant="contained">Create</Button>
      );
    } else {
      return (
        <>
          <Button type="submit" variant="contained">Update</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </>
      );
    }
  };

  // TODO: Put this inside of Dialog
  if (loading) {
    return (
      <Dialog
        component="form"
        maxWidth='sm'
        open={open}
        fullWidth
      >
        <LoadingScreen />
      </Dialog>
    );
  }

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit}
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle textAlign="center" variant="h4">
        Edit Service
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: '1rem' }}>
          <Autocomplete
            id="streaming-service"
            name="streaming-service"
            value={autoValue}
            onChange={(event, newValue) => {
              setAutoValue(newValue);
              handleChange({ serviceId: newValue.serviceId });
            }}
            inputValue={autoInputValue}
            onInputChange={(event, newInputValue) => {
              setAutoInputValue(newInputValue);
            }}
            options={serviceOptions}
            getOptionLabel={option => option.serviceName}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  required={true}
                  label="Streaming Service"
                  variant="standard"
                />
              );
            }}
          />
          <FormControl variant="standard">
            <InputLabel id="billing-cycle-label">Billing Cycle *</InputLabel>
            <Select
              required
              id="billing-cycle"
              name="billingCycle"
              labelId="billing-cycle"
              value={formValues.billingCycle}
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="annually">Annually</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="cost"
            name="cost"
            label="Cost"
            variant="standard"
            defaultValue={formValues.cost}
            InputProps={{ inputComponent: MoneyFormat }}
            onChange={handleChange}
          />
          <TextField
            required
            id="cycle-start"
            name="cycleStart"
            label="Cycle Start"
            variant="standard"
            type="date"
            defaultValue={formValues.cycleStart}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                id="is-active"
                name="isActive"
                checked={formValues.isActive}
                onChange={handleChange}
              />
            }
            label="Toggle Subscription"
          />
          {renderActionButtons()}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
