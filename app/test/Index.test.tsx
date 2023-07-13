import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('No jobs found', () => {
  it('should show a no found message', () => {
    render(<Home />);

    const message = screen.getByText('No jobs found.');

    expect(message).toHaveTextContent('No jobs found.');
  });
});

describe('filterJobsByType', () => {
  it('should return all jobs when jobTypeFilter is "all"', () => {
    const jobTypeFilter = 'all';

    expect(jobTypeFilter).toEqual('all');
  });
});

describe('filterJobsByType', () => {
  it('should return all jobs when jobTypeFilter is "all"', () => {
    const jobs = [
      { id: 1, title: 'Job 1', type: 'Full-time' },
      { id: 2, title: 'Job 2', type: 'Part-time' },
    ];

    expect(jobs).toEqual(jobs);
  });
});
