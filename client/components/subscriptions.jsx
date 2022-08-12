import React, { useState, useEffect, useContext } from 'react';
import Redirect from './redirect';
import SubsItem from './subs-item';
import AppContext from '../lib/app-context';
import LoadingScreen from './loading-screen';
// Import MUI
import { Stack } from '@mui/material';

export default function Subscriptions(props) {
  const { token, user } = useContext(AppContext);

  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };
    fetch('/api/subscriptions', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          console.error(result);
        }
        setSubscriptions(result);
        setLoading(false);
      });
  }, []);

  if (!user) return <Redirect to="login" />;
  if (loading) return <LoadingScreen />;

  const subsList = subscriptions.map(x =>
    <SubsItem key={x.subsId} subsInfo={x} />
  );

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      {subsList}
    </Stack>
  );
}
