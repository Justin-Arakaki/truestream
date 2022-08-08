import React, { useState } from 'react';
import BillingCycle from '../lib/billing-cycle';
import SubsForm from './subs-form';
// Import MUI
import {
  Typography,
  Box,
  Avatar,
  Card,
  CardActionArea,
  LinearProgress,
  Dialog
} from '@mui/material';

export default function SubsItem(props) {
  const [subsInfo, setSubsInfo] = useState(props.subsInfo);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cycle = new BillingCycle(subsInfo.cycleStart, subsInfo.billingCycle);

  // Keep the <> component around SubsForm to avoid error
  return (
    <>
      <CardActionArea component="a" onClick={handleOpen}>
        <Card sx={{ p: 2, display: 'flex', gap: 2 }}>
          <Avatar
            alt={subsInfo.serviceName}
            src={subsInfo.serviceLogo}
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
                {subsInfo.serviceName}
              </Typography>
              <Typography variant="body1">
                ${subsInfo.cost}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Billed {subsInfo.billingCycle}
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
      <SubsForm
        subsInfo={subsInfo}
        onUpdate={setSubsInfo}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
