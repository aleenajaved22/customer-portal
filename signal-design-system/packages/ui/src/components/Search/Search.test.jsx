import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Search from './Search';

describe('design-system Search', () => {
  it('renders a search input', () => {
    render(<Search placeholder="Search…" />);
    expect(screen.getByPlaceholderText('Search…')).toHaveAttribute('type', 'search');
  });

  it('passes through onChange', () => {
    const onChange = jest.fn();
    render(<Search placeholder="Q" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Q'), { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('passes through disabled', () => {
    render(<Search disabled placeholder="Off" />);
    expect(screen.getByPlaceholderText('Off')).toBeDisabled();
  });

  it('renders startAdornment', () => {
    render(<Search placeholder="S" startAdornment={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef();
    render(<Search ref={ref} placeholder="Ref" />);
    expect(ref.current).not.toBeNull();
  });
});
