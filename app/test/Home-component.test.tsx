import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from '../pages/index';
jest.mock('axios');

describe('Home component', () => {
  test('displays job listings', async () => {
    const mockJobs = [
      {
        id: 1,
        title: 'Job 1',
        description: 'Job 1 description',
        type: 'Full-time',
        publicationDate: new Date('2023-07-10'),
      },
      {
        id: 2,
        title: 'Job 2',
        description: 'Job 2 description',
        type: 'Part-time',
        publicationDate: new Date('2023-07-11'),
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { jobs: mockJobs },
    });

    render(<Home />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/jobs');
      expect(screen.queryByText('No jobs found.')).toBeNull();
    });

    expect(screen.getByText('Job 1')).toBeInTheDocument();
    expect(screen.getByText('Job 2')).toBeInTheDocument();
  });

  test('filters job listings by type', async () => {
    const mockJobs = [
      {
        id: 1,
        title: 'Job 1',
        description: 'Job 1 description',
        type: 'Full-time',
        publicationDate: new Date('2023-07-10'),
      },
      {
        id: 2,
        title: 'Job 2',
        description: 'Job 2 description',
        type: 'Part-time',
        publicationDate: new Date('2023-07-11'),
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { jobs: mockJobs },
    });

    render(<Home />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/jobs');
    });

    const filterSelect = screen.getByLabelText('Filter by Job Type:');
    fireEvent.change(filterSelect, { target: { value: 'Part-time' } });

    await waitFor(() => {
      expect(screen.getByText('Job 2')).toBeInTheDocument();
      expect(screen.queryByText('Job 1')).toBeNull();
    });
  });

  test('sorts job listings by publication date', async () => {
    const mockJobs = [
      {
        id: 1,
        title: 'Job 1',
        description: 'Job 1 description',
        type: 'Full-time',
        publicationDate: new Date('2023-07-10'),
      },
      {
        id: 2,
        title: 'Job 2',
        description: 'Job 2 description',
        type: 'Part-time',
        publicationDate: new Date('2023-07-11'),
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { jobs: mockJobs },
    });

    render(<Home />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/jobs');
    });

    const sortSelect = screen.getByLabelText('Sort by Publication Date:');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });

    await waitFor(() => {
      expect(screen.getByText('Job 2')).toBeInTheDocument();
      expect(screen.getByText('Job 1')).toBeInTheDocument();
    });
  });
});
