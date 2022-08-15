import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import Subscriptions from '../components/subscriptions';
import AppContext from '../lib/app-context';
// Import MUI
import {
  Grid,
  Container,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material';
import {
  LibraryAdd
} from '@mui/icons-material';
import dayjs from 'dayjs';

export default function Dashboard(props) {
  const { user, route } = useContext(AppContext);
  const defaultSubsInfo = {
    serviceId: 203,
    isActive: true,
    cost: 9.99,
    billingCycle: 'monthly',
    cycleStart: dayjs().format('YYYY-MM-DD'),
    serviceName: 'Netflix'
  };
  // TODO: Move this into SubsInfo

  const [openFab, setOpenFab] = useState(false);
  const handleClickFab = () => setOpenFab(!openFab);
  const handleCloseFab = () => setOpenFab(false);

  const [reloadSubs, setReloadSubs] = useState(false);

  const [openSubsForm, setOpenSubsForm] = useState(false);
  const handleOpenSubsForm = () => setOpenSubsForm(true);
  const handleCloseSubsForm = () => setOpenSubsForm(false);

  const actions = [
    {
      icon: <LibraryAdd />,
      name: 'Add',
      action: () => handleOpenSubsForm()
    }
  ];

  // TODO: Janky solution fix soon
  const renderContent = () => {
    switch (route.path) {
      default:
        return (
          <Subscriptions
            handleOpenSubsForm={handleOpenSubsForm}
            handleCloseSubsForm={handleCloseSubsForm}
            openSubsForm={openSubsForm}
          />
        );
    }
  };

  if (!user) return <Redirect to="login" />;

  return (
    <Grid container mt={2} spacing={1}>
      <Container maxWidth="sm">
        {renderContent()}
      </Container>
      <SpeedDial
        ariaLabel="Edit Menu"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleClickFab}
        open={openFab}
      >
        {actions.map(action =>
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={ () => {
              handleCloseFab();
              action.action();
            }}
          />
        )}
      </SpeedDial>
    </Grid>
  );
}
