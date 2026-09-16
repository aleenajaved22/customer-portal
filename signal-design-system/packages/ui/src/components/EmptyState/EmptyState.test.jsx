import { render, screen } from '@testing-library/react';
import React from 'react';

import EmptyState from './EmptyState';

describe('design-system EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No results" description="Try another filter" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try another filter')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState icon={<span data-testid="icon">I</span>} title="Empty" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <EmptyState title="Empty">
        <button type="button">Reset</button>
      </EmptyState>,
    );
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });
});
