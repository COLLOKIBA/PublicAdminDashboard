// dashboard/pages/api/update-rating.js

import {client} from '../../lib/sanity';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { projectName, rating } = req.body;

  try {
    const patch = await client
      .patch('2bafmy7w') 
      .set({ rating })
      .commit();

    res.status(200).json({ message: 'Rating updated', patch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update rating' });
  }
};