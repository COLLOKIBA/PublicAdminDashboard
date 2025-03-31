'use client';

import { useState, useMemo } from 'react';
import { FaSearch, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import styles from './ProjectStatus.module.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Sample Project Data
const projects = [
  { id: 1, title: 'Road Construction', projectOutput: '10km road', status: 'Ongoing', department: 'Infrastructure', section: 'Roads' },
  { id: 2, title: 'Hospital Expansion', projectOutput: 'New hospital wing', status: 'Completed', department: 'Health', section: 'Hospitals' },
  { id: 3, title: 'Water Supply Project', projectOutput: 'Clean water to 5k homes', status: 'New/Yet to Start', department: 'Water', section: 'Distribution' },
  { id: 4, title: 'School Renovation', projectOutput: '5 schools renovated', status: 'Stalled', department: 'Education', section: 'Facilities' },
  { id: 5, title: 'Library Construction', projectOutput: 'Public library built', status: 'Completed and Not in Use', department: 'Culture', section: 'Libraries' },
];

// Get unique departments and sections dynamically
const departments = [...new Set(projects.map(p => p.department))];

const getSectionsByDepartment = (department) => {
  return [...new Set(projects.filter(p => p.department === department).map(p => p.section))];
};

// Export to Excel
const exportToExcel = (filteredProjects) => {
  if (!filteredProjects.length) return alert('No data to export!');
  const ws = XLSX.utils.json_to_sheet(filteredProjects);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Projects');
  XLSX.writeFile(wb, 'projects.xlsx');
};

// Export to PDF
const exportToPDF = (filteredProjects) => {
  if (!filteredProjects.length) return alert('No data to export!');
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Serial No.', 'Project Name', 'Project Output', 'Status', 'Department', 'Section']],
    body: filteredProjects.map(p => [p.id, p.title, p.projectOutput, p.status, p.department, p.section]),
  });
  doc.save('projects.pdf');
};

const ProjectStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3; // Number of projects per page

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p =>
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectOutput.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery)) &&
      (statusFilter === '' || p.status === statusFilter) &&
      (departmentFilter === '' || p.department === departmentFilter) &&
      (sectionFilter === '' || p.section === sectionFilter)
    );
  }, [searchQuery, statusFilter, departmentFilter, sectionFilter]);

  // Reset section filter when department changes
  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value);
    setSectionFilter(''); // Reset section when department changes
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className={styles.container}>
      {/* Top Controls */}
      <div className={styles.controls}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by Project Name, Output, or Serial No."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <select className={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Stalled">Stalled</option>
          <option value="Completed and Not in Use">Completed and Not in Use</option>
          <option value="New/Yet to Start">New/Yet to Start</option>
        </select>

        <select className={styles.select} value={departmentFilter} onChange={handleDepartmentChange}>
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select className={styles.select} value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} disabled={!departmentFilter}>
          <option value="">All Sections</option>
          {departmentFilter && getSectionsByDepartment(departmentFilter).map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>

        {/* Export Buttons */}
        <div className={styles.buttons}>
          <button onClick={() => exportToExcel(filteredProjects)} className={`${styles.button} ${styles.excelBtn}`}>
            <FaFileExcel /> Export to Excel
          </button>
          <button onClick={() => exportToPDF(filteredProjects)} className={`${styles.button} ${styles.pdfBtn}`}>
            <FaFilePdf /> Export to PDF
          </button>
        </div>
      </div>

      {/* Project Table */}
      <table className={styles.projectsTable}>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Project Name</th>
            <th>Project Output</th>
            <th>Status</th>
            <th>Department</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.projectOutput}</td>
              <td>{p.status}</td>
              <td>{p.department}</td>
              <td>{p.section}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectStatus;
