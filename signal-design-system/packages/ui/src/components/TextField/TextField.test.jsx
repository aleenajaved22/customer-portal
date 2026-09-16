import InputAdornment from '@mui/material/InputAdornment';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import TextField from './TextField';

describe('design-system TextField', () => {
  it('renders an input', () => {
    render(<TextField placeholder="Enter name" />);

    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('passes through value and onChange', () => {
    const handleChange = jest.fn();

    render(<TextField value="hello" onChange={handleChange} />);
    const input = screen.getByDisplayValue('hello');
    fireEvent.change(input, { target: { value: 'world' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('passes through disabled', () => {
    render(<TextField disabled placeholder="Disabled field" />);

    expect(screen.getByPlaceholderText('Disabled field')).toBeDisabled();
  });

  it('passes through error', () => {
    render(<TextField error placeholder="Error field" />);

    expect(screen.getByPlaceholderText('Error field')).toHaveAttribute('aria-invalid', 'true');
  });

  it('passes through helperText', () => {
    render(<TextField helperText="Required field" />);

    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('passes through multiline', () => {
    render(<TextField multiline minRows={3} placeholder="Notes" />);

    const input = screen.getByPlaceholderText('Notes');
    expect(input.tagName).toBe('TEXTAREA');
  });

  it('passes through startAdornment and endAdornment', () => {
    render(
      <TextField
        placeholder="Adorned"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span data-testid="start-adornment">S</span>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <span data-testid="end-adornment">E</span>
            </InputAdornment>
          ),
        }}
      />,
    );

    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
  });

  it('passes through fullWidth', () => {
    const { container } = render(<TextField fullWidth placeholder="Full width" />);

    expect(container.querySelector('.MuiFormControl-fullWidth')).toBeInTheDocument();
  });

  it('forwards ref to the underlying FormControl root', () => {
    const ref = createRef();

    render(<TextField ref={ref} placeholder="Ref field" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('leaves default MUI variant behavior intact when variant is omitted', () => {
    const { container } = render(<TextField placeholder="Default variant" />);

    expect(container.querySelector('.MuiOutlinedInput-root')).toBeInTheDocument();
  });
});
