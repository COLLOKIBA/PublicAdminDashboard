'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

const Home = () => {
  const router = useRouter();

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to Bungoma County Projects Portal</h1>
      
      <p className={styles.description}>
        Discover ongoing and completed projects spanning various sectors within Bungoma County.  
        Our mission is rooted in transparency and continuous development, ensuring that every initiative
        delivers value to the community and drives progress.
      </p>

      <p className={styles.description}>
        Stay informed on key areas such as: <strong>Trade, Energy & Industrialization</strong>, 
        <strong>Public Service Management, ICT</strong>, <strong>Health & Sanitation</strong>, 
        <strong>Roads, Transport, Infrastructure & Public Works</strong>, 
        <strong>Education & Vocational Training</strong>, <strong>Lands, Housing & Physical Planning</strong>, 
        <strong>Water, Natural Resources, Environment, Tourism & Climate Change</strong>, 
        <strong>Finance & Economic Planning</strong>, <strong>Gender, Youth, Culture & Sports</strong>, 
        and <strong>Agriculture, Livestock, Irrigation, Fisheries & Co-operative Development</strong>. 
        Use our filtering tools to dive deeper into each sector&apos;s progress and investments across your subcounty and ward.
      </p>

      <div className={styles.buttonContainer}>
        <button className={styles.dashboardButton} onClick={() => router.push('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
