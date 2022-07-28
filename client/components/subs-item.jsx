import React from 'react';
import { Typography, Box, Avatar, Card, Stack, Grid, CardMedia, LinearProgress } from '@mui/material';
import BillingCycle from '../lib/billing-cycle';

export default class SubsItem extends React.Component {
  render() {
    const {
      billingCycle,
      cycleStart,
      cost,
      isActive,
      photoUrl,
      serviceName,
      subscriptionId,
      userId
    } = this.props.subsInfo;
    const cycle = new BillingCycle(cycleStart, billingCycle);

    return (
      <Card sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Avatar
          alt={serviceName}
          src={photoUrl}
          sx={{ height: '3rem', width: '3rem' }}
        />
        <Box width="100%">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Typography variant="body1">
              {serviceName}
            </Typography>
            <Typography variant="body1">
              ${cost}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Billed {billingCycle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cycle.daysUntilPayment} days until next payment
          </Typography>
          <LinearProgress
            variant="determinate"
            value={cycle.progress}
            sx={{ mt: 1 }}
          />
        </Box>
      </Card>
    );
  }
}
