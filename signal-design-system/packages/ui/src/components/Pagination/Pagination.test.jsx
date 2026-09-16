import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Pagination from './Pagination';

describe('design-system Pagination', () => {
  it('renders and shows row labels', () => {
    render(
      <Pagination
        count={100}
        page={0}
        rowsPerPage={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />,
    );
    expect(screen.getByText(/1–10 of 100/)).toBeInTheDocument();
  });

  it('passes through onPageChange', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        count={100}
        page={0}
        rowsPerPage={10}
        onPageChange={onPageChange}
        onRowsPerPageChange={() => {}}
      />,
    );
    fireEvent.click(screen.getByTitle('Go to next page'));
    expect(onPageChange).toHaveBeenCalled();
  });
});
