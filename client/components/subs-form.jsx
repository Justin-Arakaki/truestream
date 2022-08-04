import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

export default function SubsForm() {
  const [streamingService, setStreamingService] = React.useState('');
  const handleChange = e => {
    setStreamingService(e.target.value);
  };

  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel id='streaming-service-label'>Streaming Service</InputLabel>
      <Select
        labelId="streaming-service-label"
        id="streaming-service"
        label="Label"
        value={streamingService}
        onChange={handleChange}
      >
        <MenuItem value="Netflix">Netflix</MenuItem>
        <MenuItem value="Hulu">Hulu</MenuItem>
        <MenuItem value="Amazon Prime Video">Amazon Prime Video</MenuItem>
      </Select>
    </FormControl>
  );
}
