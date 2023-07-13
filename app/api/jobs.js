import { makeServer } from '../mocks/server';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = makeServer().schema.all('job');
    return res.status(200).json(jobs);
  }
}
