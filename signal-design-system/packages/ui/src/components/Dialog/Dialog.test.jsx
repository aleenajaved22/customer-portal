import { render, screen } from '@testing-library/react';
import React from 'react';

import Dialog from './Dialog';

describe('design-system Dialog', () => {
  it('renders children when open', () => {
    render(
      <Dialog open onClose={() => {}}>
        <div>Dialog body</div>
      </Dialog>,
    );
    expect(screen.getByText('Dialog body')).toBeInTheDocument();
  });

  it('does not show children when closed', () => {
    render(
      <Dialog open={false} onClose={() => {}}>
        <div>Hidden</div>
      </Dialog>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
