import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Chip from './Chip';

describe('design-system Chip', () => {
  it('renders label', () => {
    render(<Chip label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('passes through onDelete', () => {
    const onDelete = jest.fn();
    render(<Chip label="Tag" onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('CancelIcon'));
    expect(onDelete).toHaveBeenCalled();
  });

  it('passes through disabled', () => {
    render(<Chip label="Off" disabled />);
    expect(screen.getByText('Off').closest('.MuiChip-root')).toHaveClass('Mui-disabled');
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Chip ref={ref} label="Ref" />);
    expect(ref.current).not.toBeNull();
  });
});
