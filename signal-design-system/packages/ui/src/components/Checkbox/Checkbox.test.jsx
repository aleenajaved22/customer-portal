import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Checkbox from './Checkbox';

describe('design-system Checkbox', () => {
  it('renders', () => {
    render(<Checkbox inputProps={{ 'aria-label': 'accept' }} />);
    expect(screen.getByLabelText('accept')).toBeInTheDocument();
  });

  it('passes through onChange', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} inputProps={{ 'aria-label': 'cb' }} />);
    fireEvent.click(screen.getByLabelText('cb'));
    expect(onChange).toHaveBeenCalled();
  });

  it('passes through disabled', () => {
    render(<Checkbox disabled inputProps={{ 'aria-label': 'off' }} />);
    expect(screen.getByLabelText('off')).toBeDisabled();
  });

  it('passes through checked', () => {
    render(<Checkbox checked inputProps={{ 'aria-label': 'on' }} />);
    expect(screen.getByLabelText('on')).toBeChecked();
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Checkbox ref={ref} inputProps={{ 'aria-label': 'ref' }} />);
    expect(ref.current).not.toBeNull();
  });
});
