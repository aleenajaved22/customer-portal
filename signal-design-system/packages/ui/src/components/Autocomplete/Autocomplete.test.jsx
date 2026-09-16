import TextField from '@mui/material/TextField';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Autocomplete from './Autocomplete';

describe('design-system Autocomplete', () => {
  it('renders with options via renderInput', () => {
    render(
      <Autocomplete
        options={['Alpha', 'Beta']}
        renderInput={(params) => <TextField {...params} label="Pick" />}
      />,
    );
    expect(screen.getByLabelText('Pick')).toBeInTheDocument();
  });

  it('passes through disabled', () => {
    render(
      <Autocomplete
        disabled
        options={[]}
        renderInput={(params) => <TextField {...params} label="Off" />}
      />,
    );
    expect(screen.getByLabelText('Off')).toBeDisabled();
  });
});
