import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import Subscriptions from '../components/subscriptions';
import AppContext from '../lib/app-context';
import Offset from '../components/offset';
// Import MUI
import {
  Grid,
  Container,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import {
  LibraryAdd
} from '@mui/icons-material';

export default function Dashboard(props) {
  const { user, handleSignOut } = useContext(AppContext);

  if (!user) return <Redirect to="login" />;

  const [openFab, setOpenFab] = useState(false);
  const handleClickFab = () => setOpenFab(!openFab);
  const handleCloseFab = () => setOpenFab(false);
  const [openSubsForm, setOpenSubsForm] = useState(false);

  // TODO: Create Appdrawer
  const contentType = 'Subscriptions';

  const actions = [
    {
      icon: <LibraryAdd />,
      name: 'Add',
      action: () => setOpenSubsForm(true)
    }
  ];

  const renderContent = () => {
    switch (contentType) {
      default:
        return (
          <Subscriptions
            openSubsForm={openSubsForm}
            setOpenSubsForm={setOpenSubsForm}
          />
        );
    }
  };

  return (
    <Grid container spacing={1}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h2" sx={{ flexGrow: 1 }}>{contentType}</Typography>
          <Button color="inherit" onClick={handleSignOut}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container maxWidth="sm" sx={{ position: 'relative', top: '2rem' }}>
        {renderContent()}
      </Container>
      <SpeedDial
        ariaLabel="Edit Menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
