import React from 'react';
import {
  Card,
  Box,
  Typography
} from '@mui/material';

export default function SubsTalley(props) {
  const {
    totalCost,
    totalSavings
  } = props.billingInfo;

  // TODO: Sizing is gross
  return (
    <Card
      sx={{
        position: 'fixed',
        bottom: '1rem',
        alignContent: 'space-between',
        width: '70vw',
        maxWidth: 452,
        p: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          Cost Per Month:
        </Typography>
        <Typography>
          ${totalCost.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          Monthly Savings:
        </Typography>
        <Typography>
          ${totalSavings.toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
}
