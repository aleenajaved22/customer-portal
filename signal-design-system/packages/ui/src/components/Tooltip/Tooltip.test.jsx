import { render, screen } from '@testing-library/react';
import React from 'react';

import Tooltip from './Tooltip';

describe('design-system Tooltip', () => {
  it('renders children', () => {
    render(
      <Tooltip title="Help">
        <button type="button">Info</button>
      </Tooltip>,
    );
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('passes through title prop', () => {
    const { container } = render(
      <Tooltip title="Details" open>
        <button type="button">Hover</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Details');
    expect(container.querySelector('[data-mui-internal-clone-element]')).toBeTruthy();
  });
});
