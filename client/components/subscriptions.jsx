import React, { useState, useEffect, useContext } from 'react';
import Redirect from './redirect';
import SubsItem from './subs-item';
import AppContext from '../lib/app-context';
import SubsForm from './subs-form';
import SubsTalley from './subs-talley';
import LoadingScreen from './loading-screen';
import useForm from '../hooks/use-form';
import calculateBilling from '../lib/calculate-billing';
// import API
import getSubs from '../api/get-subs';
import getServices from '../api/get-services';
import addSubs from '../api/add-subs';
import updateSubs from '../api/update-subs';
import deleteSubs from '../api/delete-subs';
// Import MUI
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

export default function Subscriptions(props) {
  const { token, user } = useContext(AppContext);
  const { openSubsForm, setOpenSubsForm } = props;
  const defaultSubsInfo = {
    subsId: null,
    serviceId: null,
    isActive: true,
    cost: null,
    billingCycle: '',
    cycleStart: dayjs().format('YYYY-MM-DD'),
    serviceName: null
  };
  const handleOpenSubsForm = () => setOpenSubsForm(true);
  const handleCloseSubsForm = () => {
    setOpenSubsForm(false);
    resetFormValues();
  };

  const [subscriptions, setSubscriptions] = useState(null);
  const [allServices, setAllServices] = useState(null);
  const [formValues, handleChange] = useForm({ ...defaultSubsInfo });
  const [billingInfo, setBillingInfo] = useState({
    totalCost: 0,
    totalSavings: 0
  });
  const handleClickSubs = subsInfo => {
    handleChange(subsInfo);
    handleOpenSubsForm();
  };
  const resetFormValues = () => handleChange({ ...defaultSubsInfo });

  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingAllServices, setLoadingAllServices] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    if (formValues.subsId) {
      updateSubs(token, formValues.subsId, formValues);
    } else {
      addSubs(token, formValues);
    }
    handleCloseSubsForm();
    setLoadingSubs(true);
    resetFormValues();
  };

  const handleDelete = () => {
    event.preventDefault();
    deleteSubs(token, formValues.subsId);
    handleCloseSubsForm();
    setLoadingSubs(true);
    resetFormValues();
  };

  // TODO: Have a race! - put a set timeout on second one to delay state change
  useEffect(() => {
    getSubs(token).then(result => {
      setSubscriptions(result);
      setLoadingSubs(false);
      setBillingInfo(calculateBilling(result));
    });
  }, [loadingSubs]);

  useEffect(() => {
    getServices(token).then(result => {
      setAllServices(result);
      setLoadingAllServices(false);
    });
  }, []);

  if (!user) return <Redirect to="login" />;
  if (loadingSubs) return <LoadingScreen />;

  const subsList = subscriptions.map(x =>
    <SubsItem key={x.subsId} subsInfo={x} onClick={handleClickSubs} />
  );

  return (
    <>
      <Stack mb={14} spacing={1} sx={{ width: '100%' }}>
        {subsList}
      </Stack>
      <SubsTalley billingInfo={{ ...billingInfo }} />
      <SubsForm
        formValues={formValues}
        serviceOptions={allServices}
        loading={loadingAllServices}
        open={openSubsForm}
        onChange={handleChange}
        onClose={handleCloseSubsForm}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
}
