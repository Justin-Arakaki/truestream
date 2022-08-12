import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import Subscriptions from '../components/subscriptions';
import SubsForm from '../components/subs-form';
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

export default function Dashboard(props) {
  const { user, route } = useContext(AppContext);

  const [pageName, setPageName] = useState(route);

  const [openFab, setOpenFab] = useState(false);
  const handleOpenFab = () => setOpenFab(true);
  const handleCloseFab = () => setOpenFab(false);

  const [currentSubsInfo, setCurrentSubsInfo] = useState(null);

  const actions = [
    { icon: <LibraryAdd />, name: 'Add' }
  ];

  const renderContent = () => {
    switch (pageName) {
      case 'subscriptions':
        return <Subscriptions />;
      default:
        return <Subscriptions />;
    }
  };

  if (!user) return <Redirect to="login" />;

  return (
    <>
      <Container maxWidth="sm">
        <Grid container mt={2} spacing={1}>
          {renderContent()}
        </Grid>
      </Container>
      <SpeedDial
        ariaLabel="Edit Menu"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleCloseFab}
        onOpen={handleOpenFab}
        open={openFab}
      >
        {actions.map(action =>
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleCloseFab}
          />
        )}
      </SpeedDial>
    </>
  );
}
