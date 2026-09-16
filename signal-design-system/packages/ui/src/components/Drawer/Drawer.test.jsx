import { render, screen } from '@testing-library/react';
import React from 'react';

import Drawer from './Drawer';

describe('design-system Drawer', () => {
  it('renders children when open', () => {
    render(
      <Drawer open onClose={() => {}} anchor="right">
        <div>Drawer content</div>
      </Drawer>,
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('accepts temporary variant', () => {
    render(
      <Drawer open onClose={() => {}} variant="temporary" anchor="right">
        <div>Temp</div>
      </Drawer>,
    );
    expect(screen.getByText('Temp')).toBeInTheDocument();
  });
});
