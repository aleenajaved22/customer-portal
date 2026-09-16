import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Switch from './Switch';

describe('design-system Switch', () => {
  it('renders', () => {
    render(<Switch inputProps={{ 'aria-label': 'toggle' }} />);
    expect(screen.getByLabelText('toggle')).toBeInTheDocument();
  });

  it('passes through onChange', () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} inputProps={{ 'aria-label': 'sw' }} />);
    fireEvent.click(screen.getByLabelText('sw'));
    expect(onChange).toHaveBeenCalled();
  });

  it('passes through disabled', () => {
    render(<Switch disabled inputProps={{ 'aria-label': 'off' }} />);
    expect(screen.getByLabelText('off')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Switch ref={ref} inputProps={{ 'aria-label': 'ref' }} />);
    expect(ref.current).not.toBeNull();
  });
});
