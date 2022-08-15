import React, { useState, useEffect, useContext } from 'react';
import Redirect from './redirect';
import SubsItem from './subs-item';
import AppContext from '../lib/app-context';
import SubsForm from './subs-form';
import LoadingScreen from './loading-screen';
import useForm from '../hooks/use-form';
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
  const { openSubsForm, handleCloseSubsForm, handleOpenSubsForm } = props;
  const defaultSubsInfo = {
    subsId: null,
    serviceId: null,
    isActive: true,
    cost: null,
    billingCycle: '',
    cycleStart: dayjs().format('YYYY-MM-DD'),
    serviceName: null
  };

  const [subscriptions, setSubscriptions] = useState(null);
  const [allServices, setAllServices] = useState(null);
  const [formValues, handleChange] = useForm({ ...defaultSubsInfo });
  const handleClickSubs = subsInfo => {
    handleChange(subsInfo);
    handleOpenSubsForm();
  };

  console.log('FORMVALUES', formValues);

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
    handleChange({ ...defaultSubsInfo });
  };

  const handleDelete = () => {
    event.preventDefault();
    deleteSubs(token, formValues.subsId);
    handleCloseSubsForm();
    setLoadingSubs(true);
    handleChange({ ...defaultSubsInfo });
  };

  // TODO: Have a race! - put a set timeout on second one to delay state change
  useEffect(() => {
    getSubs(token).then(result => {
      setSubscriptions(result);
      setLoadingSubs(false);
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
      <Stack spacing={1} sx={{ width: '100%' }}>
        {subsList}
      </Stack>
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
