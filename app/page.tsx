'use client';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { makeServer } from './mock/server';

interface Job {
  id: number;
  title: string;
  description: string;
  type: string;
  publicationDate?: Date;
}

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export default function Home(): JSX.Element {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle);

  const handleFilter = useCallback((jobType: string): void => {
    setJobTypeFilter(jobType);
  }, []);

  const handleSort = useCallback((sortOrder: 'asc' | 'desc'): void => {
    setSortOrder(sortOrder);
  }, []);

  useEffect(() => {
    const server = makeServer({ environment: 'development' });

    setStatus(RequestStatus.Loading);

    axios
      .get('/api/jobs')
      .then((response) => {
        setJobs(response.data.jobs);
        setStatus(RequestStatus.Success);
      })
      .catch((error) => {
        console.error(error);
        setStatus(RequestStatus.Error);
      });

    return () => {
      server.shutdown();
    };
  }, []);

  const filteredJobs = useMemo(() => {
    if (jobTypeFilter === 'all') {
      return jobs;
    } else {
      return jobs.filter((job) => job.type === jobTypeFilter);
    }
  }, [jobTypeFilter, jobs]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const dateA = a.publicationDate
        ? new Date(a.publicationDate)
        : new Date();
      const dateB = b.publicationDate
        ? new Date(b.publicationDate)
        : new Date();
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }, [filteredJobs, sortOrder]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-5">Job Listings</h1>
        <div className="flex flex-row justify-center text-xs mt-5">
          <div className="border-2 border-gray-500 p-2 rounded-md">
            <label htmlFor="filter">Filter by Job Type:</label>
            <select
              className="data-te-select-init"
              name="filter"
              id="filter"
              value={jobTypeFilter}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div className="border-2 border-gray-500 p-2 ml-5 rounded-md">
            <label htmlFor="sort">Sort by Publication Date:</label>
            <select
              className="border-blue-600"
              name="sort"
              id="sort"
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {status === RequestStatus.Loading ? (
          <p className="text text-center text-xl mt-20">
            Loading... Please Wait
          </p>
        ) : status === RequestStatus.Error ? (
          <p className="text text-center text-xl mt-20">
            Error occurred while fetching jobs.
          </p>
        ) : sortedJobs.length > 0 ? (
          <main>
            {sortedJobs.map((job) => (
              <section
                key={job.id}
                className="border-2 border-blue-600 container mx-auto mt-5 m-5 bg-stone-400 bg-opacity-50 border-opacity-70 rounded-md"
              >
                <h2 className="text text-center text-blue-600 mt-2">
                  {job.title}
                </h2>
                <p className="text text-center text-xs mr-2 font-bold mb-2">
                  Job Type: {job.type}
                </p>
                <p className="text text-center text-xs ml-2">
                  {job.description}
                </p>
                {job.publicationDate && (
                  <p className="texte text-right text-xs m-2 italic font-semibold">
                    Posted On:{' '}
                    {new Date(job.publicationDate).toLocaleDateString()}
                  </p>
                )}
              </section>
            ))}
          </main>
        ) : (
          <p className="text text-center text-xl mt-20">No jobs found.</p>
        )}
      </div>
    </>
  );
}
