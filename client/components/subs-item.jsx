import React, { useState } from 'react';
import BillingCycle from '../lib/billing-cycle';
import SubsForm from './subs-form';
// Import MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function SubsItem(props) {
  const {
    billingCycle,
    cycleStart,
    cost,
    isActive,
    serviceLogo,
    serviceName
  } = props.subsInfo;
  const cycle = new BillingCycle(cycleStart, billingCycle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Keep the <> component around SubsForm to avoid error
  return (
    <>
      <CardActionArea component="a" onClick={handleOpen}>
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
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Edit service information</DialogTitle>
        <DialogContent>
          <SubsForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
