// lib/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'your_project_id',       // 🔁 Replace with your Sanity project ID
  dataset: 'production',              // Or whatever dataset you're using
  apiVersion: '2023-01-01',           // Use today's date or your API version
  token: process.env.SANITY_API_TOKEN, // 🔁 Add this token to .env.local
  useCdn: false,                      // false = fresh data
});
