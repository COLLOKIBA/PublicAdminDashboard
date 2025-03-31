'use client';

import React, { useState } from 'react';
import styles from './dashboard.module.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

// Function to determine financial year (July 1st - June 30th)
const getFinancialYear = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return date.getMonth() >= 6 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
};

// Sample projects data with cost
const projects = [
  { id: 1, title: 'Road Construction', startDate: '2023-07-15', status: 'Ongoing', department: 'Infrastructure', section: 'Roads', subcounty: 'Bungoma South', ward: 'Kanduyi', cost: 50000000 },
  { id: 2, title: 'Hospital Expansion', startDate: '2024-03-10', status: 'New', department: 'Health', section: 'Medical', subcounty: 'Bungoma North', ward: 'Kimilili', cost: 25000000 },
  { id: 3, title: 'School Renovation', startDate: '2023-08-01', status: 'Ongoing', department: 'Education', section: 'Learning', subcounty: 'Webuye East', ward: 'Mihuu', cost: 12000000 },
  { id: 4, title: 'Bridge Repair', startDate: '2024-06-20', status: 'New', department: 'Infrastructure', section: 'Bridges', subcounty: 'Bumula', ward: 'Kabula', cost: 18000000 },
  { id: 5, title: 'Clinic Upgrade', startDate: '2022-09-10', status: 'Completed', department: 'Health', section: 'Medical', subcounty: 'Sirisia', ward: 'Lwandanyi', cost: 9000000 },
  { id: 6, title: 'Market Expansion', startDate: '2023-04-01', status: 'Stalled', department: 'Trade', section: 'Markets', subcounty: 'Bungoma Central', ward: 'Bukembe', cost: 30000000 },
];

// Extract unique filter options
const financialYears = ['All', ...new Set(projects.map(p => getFinancialYear(p.startDate)))];
const departments = ['All', ...new Set(projects.map(p => p.department))];
const subcounties = ['All', ...new Set(projects.map(p => p.subcounty))];

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedSubcounty, setSelectedSubcounty] = useState('All');
  const [selectedWard, setSelectedWard] = useState('All');

  // Get sections based on selected department
  const sections = selectedDepartment === 'All'
    ? ['All']
    : ['All', ...new Set(projects.filter(p => p.department === selectedDepartment).map(p => p.section))];

  // Get wards based on selected subcounty
  const wards = selectedSubcounty === 'All'
    ? ['All']
    : ['All', ...new Set(projects.filter(p => p.subcounty === selectedSubcounty).map(p => p.ward))];

  // Filter projects based on selected criteria
  const filteredProjects = projects.filter(project =>
    (selectedYear === 'All' || getFinancialYear(project.startDate) === selectedYear) &&
    (selectedDepartment === 'All' || project.department === selectedDepartment) &&
    (selectedSection === 'All' || project.section === selectedSection) &&
    (selectedSubcounty === 'All' || project.subcounty === selectedSubcounty) &&
    (selectedWard === 'All' || project.ward === selectedWard)
  );

  // **Summary Metrics**
  const totalProjects = filteredProjects.length;
  const newProjects = filteredProjects.filter(p => p.status === 'New').length;
  const ongoingProjects = filteredProjects.filter(p => p.status === 'Ongoing').length;
  const stalledProjects = filteredProjects.filter(p => p.status === 'Stalled').length;
  const completedProjects = filteredProjects.filter(p => p.status === 'Completed').length;
  const totalCost = filteredProjects.reduce((sum, p) => sum + p.cost, 0);

  return (
    <div className={styles.dashboardContainer}>
      <h1>Projects Dashboard</h1>

      {/* Filters */}
      <div className={styles.filterContainer}>
        <label>Financial Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {financialYears.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        <label>Department:</label>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>

        <label>Section:</label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} disabled={selectedDepartment === 'All'}>
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>

        <label>Subcounty:</label>
        <select value={selectedSubcounty} onChange={(e) => setSelectedSubcounty(e.target.value)}>
          {subcounties.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>

        <label>Ward:</label>
        <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={selectedSubcounty === 'All'}>
          {wards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
        </select>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.card}><h2>New Projects</h2><p>{newProjects}</p></div>
        <div className={styles.card}><h2>Ongoing Projects</h2><p>{ongoingProjects}</p></div>
        <div className={styles.card}><h2>Stalled Projects</h2><p>{stalledProjects}</p></div>
        <div className={styles.card}><h2>Completed Projects</h2><p>{completedProjects}</p></div>
        <div className={styles.card}><h2>Total Projects (Filtered)</h2><p>{totalProjects}</p></div>
        <div className={styles.card}><h2>Total Cost</h2><p>Ksh {totalCost.toLocaleString()}</p></div>
      </div>

      {/* Charts */}
      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <h2>Projects by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProjects.map(p => ({ department: p.department, count: 1 }))}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#28A745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
