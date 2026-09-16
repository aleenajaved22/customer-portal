import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Radio from './Radio';

describe('design-system Radio', () => {
  it('renders', () => {
    render(<Radio inputProps={{ 'aria-label': 'option' }} />);
    expect(screen.getByLabelText('option')).toBeInTheDocument();
  });

  it('passes through onChange', () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} inputProps={{ 'aria-label': 'r' }} />);
    fireEvent.click(screen.getByLabelText('r'));
    expect(onChange).toHaveBeenCalled();
  });

  it('passes through disabled', () => {
    render(<Radio disabled inputProps={{ 'aria-label': 'off' }} />);
    expect(screen.getByLabelText('off')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Radio ref={ref} inputProps={{ 'aria-label': 'ref' }} />);
    expect(ref.current).not.toBeNull();
  });
});
