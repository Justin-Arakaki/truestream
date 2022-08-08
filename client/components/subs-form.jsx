import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../lib/app-context';
import LoadingScreen from './loading-screen';
import MoneyFormat from './money-format';
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

// TODO: Need to fix updating

export default function SubsForm(props) {
  const { token } = useContext(AppContext);
  const {
    subsId,
    serviceId: currentServiceId,
    isActive: currentIsActive,
    cost: currentCost,
    billingCycle: currentbillingCycle,
    cycleStart: currentCycleStart,
    serviceName: currentServiceName
  } = props.subsInfo;

  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState([{
    serviceName: currentServiceName
  }]);
  const currentServiceIndex = allServices.findIndex(
    x => x.serviceName === currentServiceName
  );
  const [newService, setNewService] = useState(
    allServices[currentServiceIndex]
  );

  const [serviceId, setServiceId] = useState(currentServiceId);
  const [isActive, setIsActive] = useState(currentIsActive);
  const [cost, setCost] = useState(currentCost);
  const [billingCycle, setBillingCycle] = useState(currentbillingCycle);
  const [cycleStart, setCycleStart] = useState(
    dayjs(currentCycleStart).format('YYYY-MM-DD')
  );

  // TODO: Move this up a level
  const handleSubmit = event => {
    const thing = {
      serviceId,
      isActive,
      cost,
      billingCycle,
      cycleStart
    };
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(thing)
    };

    fetch(`/api/subscriptions/${subsId}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) console.error(result);
        props.subsInfo.serviceId = result.serviceId;
        props.onUpdate({
          ...props.subsInfo,
          serviceName: newService.serviceName,
          serviceLogo: newService.serviceLogo,
          ...result
        });
        props.onClose();
      });
  };

  // TODO: Put this a level up
  useEffect(() => {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };

    fetch('/api/subscriptions/services', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          console.error(result);
          return;
        }
        setAllServices(result);
        setLoading(false);
      });
  }, []);

  // console.log('states: ', {
  //   serviceId, isActive, cost, billingCycle, cycleStart
  // });

  // TODO: Put this inside of Dialog
  if (loading) {
    return (
      <Dialog
        component="form"
        onSubmit={handleSubmit}
        open={props.open}
        onClose={props.onClose}
        maxWidth='sm'
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
      open={props.open}
      onClose={props.onClose}
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
            options={allServices}
            getOptionLabel={option => option.serviceName}
            value={allServices[currentServiceIndex]}
            onChange={(event, newValue) => {
              setServiceId(newValue.serviceId);
              setNewService(newValue);
            }}
            renderInput={params => {
              return <TextField {...params} label="Streaming Service" variant="standard" />;
            }}
          />
          <FormControl variant="standard">
            <InputLabel id="billing-cycle-label">Billing Cycle</InputLabel>
            <Select
              id="billing-cycle"
              labelId="billing-cycle"
              value={billingCycle}
              onChange={event => {
                setBillingCycle(event.target.value);
              }}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="annually">Annually</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="cost"
            label="Cost"
            variant="standard"
            defaultValue={cost}
            InputProps={{ inputComponent: MoneyFormat }}
            onChange={event => setCost(event.target.value)}
          />
          <TextField
            id="cycle-start"
            label="Cycle Start"
            variant="standard"
            type="date"
            defaultValue={cycleStart}
            onChange={event => setCycleStart(event.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                id="toggle-subscription"
                checked={isActive}
                onChange={(event, newValue) => {
                  setIsActive(newValue);
                }}
              />
            }
            label="Toggle Subscription"
          />
          <Button
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
