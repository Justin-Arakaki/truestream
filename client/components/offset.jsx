import React from 'react';
import { Box } from '@mui/material';
import dgreenTheme from './dgreen-theme';

export default function Offset() {
  return <Box {...dgreenTheme.mixins.toolbar} width="100%"></Box>;
}
