import { render, screen } from '@testing-library/react';
import React from 'react';

import Modal from './Modal';

describe('design-system Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open onClose={() => {}}>
        <div>Modal body</div>
      </Modal>,
    );
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });
});
