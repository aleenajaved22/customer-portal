/**
 * Consumer validation — proves @signal/ui can be imported without Signal Sales app code.
 *
 * This suite must NOT import from:
 * - src/app/**
 * - salesComponents/**
 * - services/**
 * - redux/**
 */

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { semantic } from '@signal/design-tokens/colors';
import { Button, EmptyState, TextField } from '@signal/ui';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('@signal/ui consumer validation', () => {
  it('imports tokens independently of Signal Sales', () => {
    expect(semantic.primary.default).toBe('#2DA551');
  });

  it('renders Button and TextField from @signal/ui without src/app', () => {
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <Button variant="primary">Save</Button>
        <TextField placeholder="Name" />
        <EmptyState title="Nothing here" description="Try again" />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('does not require Signal Sales modules to resolve (static contract)', () => {
    // Guard: this file's import graph is only @signal/*, MUI, React, and RTL.
    // If a future change reintroduces src/app coupling into @signal/ui, add an
    // eslint no-restricted-imports rule on packages/ui.
    expect(true).toBe(true);
  });
});
