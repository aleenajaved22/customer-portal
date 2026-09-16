import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import Button, { BUTTON_VARIANTS } from './Button';

describe('design-system Button', () => {
  it('renders children', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('passes through onClick', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes through disabled', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it.each(BUTTON_VARIANTS)('accepts variant="%s"', (variant) => {
    render(<Button variant={variant}>{variant}</Button>);

    expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
  });

  it('passes through startIcon and endIcon', () => {
    render(
      <Button
        startIcon={<span data-testid="start-icon">S</span>}
        endIcon={<span data-testid="end-icon">E</span>}
      >
        Icons
      </Button>,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('passes through fullWidth', () => {
    render(<Button fullWidth>Full width</Button>);

    expect(screen.getByRole('button', { name: 'Full width' })).toHaveClass('MuiButton-fullWidth');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef();

    render(<Button ref={ref}>Ref button</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
