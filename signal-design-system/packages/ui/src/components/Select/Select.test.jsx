import MenuItem from '@mui/material/MenuItem';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Select from './Select';

describe('design-system Select', () => {
  it('renders and shows selected value', () => {
    render(
      <Select value="a" onChange={() => {}} inputProps={{ 'aria-label': 'pick' }}>
        <MenuItem value="a">Alpha</MenuItem>
        <MenuItem value="b">Beta</MenuItem>
      </Select>,
    );
    expect(screen.getByLabelText('pick')).toBeInTheDocument();
  });

  it('passes through disabled', () => {
    render(
      <Select value="" disabled onChange={() => {}} inputProps={{ 'aria-label': 'off' }}>
        <MenuItem value="">None</MenuItem>
      </Select>,
    );
    expect(screen.getByLabelText('off')).toHaveAttribute('aria-disabled', 'true');
  });

  it('passes through onChange', () => {
    const onChange = jest.fn();
    render(
      <Select value="a" onChange={onChange} inputProps={{ 'aria-label': 'sel' }}>
        <MenuItem value="a">Alpha</MenuItem>
        <MenuItem value="b">Beta</MenuItem>
      </Select>,
    );
    fireEvent.mouseDown(screen.getByLabelText('sel'));
    fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(
      <Select ref={ref} value="" onChange={() => {}} inputProps={{ 'aria-label': 'ref' }}>
        <MenuItem value="">None</MenuItem>
      </Select>,
    );
    expect(ref.current).not.toBeNull();
  });
});
