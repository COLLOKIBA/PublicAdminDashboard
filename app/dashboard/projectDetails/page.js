'use client';

import { useState, useMemo } from 'react';
import { FaSearch, FaFileExcel, FaFilePdf, FaEye } from 'react-icons/fa';
import styles from './project.module.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper to calculate financial year from a date string.
// Financial year: July 1st to June 30th.
const getFinancialYear = (dateStr) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // months are 0-indexed
  if (month >= 7) {
    return `${year}/${year + 1}`;
  } else {
    return `${year - 1}/${year}`;
  }
};

// Sample Project Data
const projects = [
  {
    id: 13,
    title: 'Road Construction',
    projectOutput: '10km of road built',
    allocatedAmount: 5000000,
    contractAmount: 4800000,
    variance: 200000,
    amountPaid: 3000000,
    startDate: '2024-01-15',
    completionDate: '2025-06-30',
    status: 'Ongoing',
    department: 'Trade Energy and Industrilization',
    section: 'Trade Energy and Industrilization',
  },
  {
    id: 22,
    title: 'HEALTH MANAGEMENT INFORMATION SYSTEM',
    projectOutput: 'NEW INFORMATION SYSTEM',
    allocatedAmount: 10000000,
    contractAmount: 9500000,
    variance: 500000,
    amountPaid: 8000000,
    startDate: '2023-07-10',
    completionDate: '2024-12-15',
    status: 'Completed',
    department: 'Public Service Management Administration & ICT',
    section: 'ICT',
  },
  {
    id: 122,
    title: "Treasury Management System Upgrade",
    projectOutput: "Strengthened treasury operations",
    allocatedAmount: 9700000,
    contractAmount: 9400000,
    variance: 300000,
    amountPaid: 7600000,
    startDate: "2023-07-15",
    completionDate: "2024-12-10",
    status: "Ongoing",
    department: "Finance and Economic Planning",
    section: "Treasury"
  }

  
  // Add more projects as needed...
];

// Constants for pagination
const ITEMS_PER_PAGE = 5;

// Export to Excel
const exportToExcel = (data) => {
  if (!data.length) {
    alert('No data to export!');
    return;
  }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Projects');
  XLSX.writeFile(wb, 'projects.xlsx');
};

// Export to PDF
const exportToPDF = (data) => {
  if (!data.length) {
    alert('No data to export!');
    return;
  }
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Serial No.', 'Project Name', 'Project Output', 'Department', 'Section', 'Financial Year']],
    body: data.map((p) => [
      p.id,
      p.title,
      p.projectOutput,
      p.department,
      p.section,
      getFinancialYear(p.startDate),
    ]),
  });
  doc.save('projects.pdf');
};

// Modal Component with improved styling for details and a print feature
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        <h2>{project.title} Details</h2>
        <div className={styles.modalContent}>
          <h3>Financial Details</h3>
          <div className={styles.detailsContainer}>
            <div className={styles.detailItem}>
              <strong>Allocated Amount:</strong>
              <span>Ksh {project.allocatedAmount.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Contract Amount:</strong>
              <span>Ksh {project.contractAmount.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Variance:</strong>
              <span>Ksh {project.variance.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Amount Paid:</strong>
              <span>Ksh {project.amountPaid.toLocaleString()}</span>
            </div>
          </div>

          <h3>Implementation Details</h3>
          <div className={styles.detailsContainer}>
            <div className={styles.detailItem}>
              <strong>Start Date:</strong>
              <span>{project.startDate}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Completion Date:</strong>
              <span>{project.completionDate}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Status:</strong>
              <span>{project.status}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Department:</strong>
              <span>{project.department}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Section:</strong>
              <span>{project.section}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Financial Year:</strong>
              <span>{getFinancialYear(project.startDate)}</span>
            </div>
          </div>
        </div>
        {/* Print Button */}
        <button onClick={handlePrint} className={styles.printBtn}>
          Print Details
        </button>
      </div>
    </div>
  );
};

const DepartmentProjectsClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Unique Departments, Sections, and Financial Years
  const departments = [...new Set(projects.map((p) => p.department))];
  const sections = [
    ...new Set(
      projects
        .filter((p) => (selectedDepartment ? p.department === selectedDepartment : true))
        .map((p) => p.section)
    ),
  ];
  const financialYears = [...new Set(projects.map((p) => getFinancialYear(p.startDate)))];

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.id.toString().includes(searchQuery) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment ? p.department === selectedDepartment : true;
      const matchesSection = selectedSection ? p.section === selectedSection : true;
      const matchesFinancialYear = selectedFinancialYear
        ? getFinancialYear(p.startDate) === selectedFinancialYear
        : true;
      return matchesSearch && matchesDepartment && matchesSection && matchesFinancialYear;
    });
  }, [searchQuery, selectedDepartment, selectedSection, selectedFinancialYear]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset section when department changes
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedSection('');
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      {/* Top Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search projects by Serial No. or Name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className={styles.selectInput}
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {departments.map((dept, idx) => (
            <option key={idx} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className={styles.selectInput}
          value={selectedSection}
          onChange={(e) => {
            setSelectedSection(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Sections</option>
          {sections.map((sec, idx) => (
            <option key={idx} value={sec}>
              {sec}
            </option>
          ))}
        </select>

        <select
          className={styles.selectInput}
          value={selectedFinancialYear}
          onChange={(e) => {
            setSelectedFinancialYear(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Financial Years</option>
          {financialYears.map((fy, idx) => (
            <option key={idx} value={fy}>
              {fy}
            </option>
          ))}
        </select>

        <div className={styles.buttons}>
          <button onClick={() => exportToExcel(filteredProjects)} className={styles.excelBtn}>
            <FaFileExcel /> Export to Excel
          </button>
          <button onClick={() => exportToPDF(filteredProjects)} className={styles.pdfBtn}>
            <FaFilePdf /> Export to PDF
          </button>
        </div>
      </div>

      {/* Projects Table */}
<table className={styles.projectsTable}>
  <thead>
    <tr>
      <th>Serial No.</th>
      <th>Project Name</th>
      <th>Project Output</th>
      <th>Department</th>
      <th>Section</th>
      <th>Financial Year</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {displayedProjects.map((p) => (
      <tr key={p.id}>
        <td><span className={styles.label}>Serial No.</span><span className={styles.value}>{p.id}</span></td>
        <td><span className={styles.label}>Project Name</span><span className={styles.value}>{p.title}</span></td>
        <td><span className={styles.label}>Project Output</span><span className={styles.value}>{p.projectOutput}</span></td>
        <td><span className={styles.label}>Department</span><span className={styles.value}>{p.department}</span></td>
        <td><span className={styles.label}>Section</span><span className={styles.value}>{p.section}</span></td>
        <td><span className={styles.label}>Financial Year</span><span className={styles.value}>{getFinancialYear(p.startDate)}</span></td>
        <td>
          <button onClick={() => setSelectedProject(p)} className={styles.viewBtn}>
            <FaEye /> View Details
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default DepartmentProjectsClient;