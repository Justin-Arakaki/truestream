import React from 'react';
import BillingCycle from '../lib/billing-cycle';
// Import MUI
import {
  Typography,
  Box,
  Avatar,
  Card,
  CardActionArea,
  LinearProgress
} from '@mui/material';
import dayjs from 'dayjs';

export default function SubsItem(props) {
  const {
    serviceName,
    serviceLogo,
    cost,
    billingCycle,
    isActive
  } = props.subsInfo;
  const cycleStart = dayjs(props.subsInfo.cycleStart).format('YYYY-MM-DD');
  const cycle = new BillingCycle(cycleStart, billingCycle);

  const costFormat = {
    sx: {
      color: isActive ? 'text.primary' : 'text.secondary',
      textDecoration: isActive ? 'none' : 'line-through'
    }
  };
  const handleClick = () => props.onClick({ ...props.subsInfo, cycleStart });

  return (
    <CardActionArea component="a" onClick={handleClick}>
      <Card sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Avatar
          alt={serviceName}
          src={serviceLogo}
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
            <Typography {...costFormat} variant="body1">
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
    </CardActionArea>
  );
}
