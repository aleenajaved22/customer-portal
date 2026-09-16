import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Tab from './Tab';
import Tabs from './Tabs';

describe('design-system Tabs', () => {
  it('renders tabs and passes through onChange', () => {
    const onChange = jest.fn();
    render(
      <Tabs value={0} onChange={onChange}>
        <Tab label="One" />
        <Tab label="Two" />
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalled();
  });

  it('passes through disabled on Tab', () => {
    render(
      <Tabs value={0} onChange={() => {}}>
        <Tab label="Enabled" />
        <Tab label="Disabled" disabled />
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'Disabled' })).toBeDisabled();
  });
});
