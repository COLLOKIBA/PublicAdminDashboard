 'use client';


import React, { useState, useMemo } from 'react';
import styles from './ProjectStatus.module.css';

function ProjectStatus() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    department: '',
    year: '',
  });

  const projects = [
    {
      name: 'Bridge Construction',
      output: 'Bridge completed',
      status: 'Ongoing',
      department: 'Roads and Public Works',
      section: 'Roads',
      year: '2024/2025',
      progress: 30,
    },
    {
      name: 'ICT Equipment Delivery',
      output: '100 laptops delivered',
      status: 'Completed',
      department: 'Public Administration and ICT',
      section: 'Public Administration',
      year: '2024/2025',
      progress: 100,
    },
    {
      name: 'Health Center Renovation',
      output: 'Facility refurbished',
      status: 'Ongoing',
      department: 'Health and Sanitation',
      section: 'Sanitation',
      year: '2024/2025',
      progress: 60,
    },
    {
      name: 'Water Project',
      output: '5 boreholes drilled',
      status: 'Ongoing',
      department: 'Water',
      section: 'Water',
      year: '2024/2025',
      progress: 20,
    },
    {
      name: 'School Supplies',
      output: 'Textbooks distributed',
      status: 'Completed',
      department: 'Education',
      section: 'Education',
      year: '2024/2025',
      progress: 75,
    },
  ];

  const uniqueDepartments = useMemo(() => {
    const depts = projects.map((p) => p.department);
    return Array.from(new Set(depts));
  }, [projects]);

  const uniqueYears = useMemo(() => {
    const yrs = projects.map((p) => p.year);
    return Array.from(new Set(yrs));
  }, [projects]);

  const openProgressModal = (project) => setSelectedProject(project);

  const closeModal = () => setSelectedProject(null);

  const getProgressColor = (progress) => {
    if (progress <= 25) return styles.red;
    if (progress <= 50) return styles.gold;
    if (progress <= 75) return styles.orange;
    return styles.green;
  };

  const printModal = () => {
    const printContents = document.getElementById('printable').innerHTML;
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write(
      `<html><head><title>Print Project Progress</title><style>
      body { font-family: Arial; padding: 20px; }
      h3 { color: #28a745; }
      .bar { height: 25px; color: white; text-align: center; line-height: 25px; border-radius: 8px; font-weight: bold; }
      .red { background: red; }
      .gold { background: goldenrod; }
      .orange { background: orange; }
      .green { background: #28a745; }
      </style></head><body>${printContents}</body></html>`
    );
    newWindow.document.close();
    newWindow.print();
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesName = project.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesStatus = filters.status ? project.status.toLowerCase() === filters.status.toLowerCase() : true;
      const matchesDepartment = filters.department ? project.department === filters.department : true;
      const matchesYear = filters.year ? project.year === filters.year : true;
      return matchesName && matchesStatus && matchesDepartment && matchesYear;
    });
  }, [filters, projects]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Project Progress Tracker</h2>

      <div className={styles.filters}>
        <input
          type="text"
          name="name"
          placeholder="Search by Project Name"
          value={filters.name}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className={styles.filterInput}
        >
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          className={styles.filterInput}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className={styles.filterInput}
        >
          <option value="">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Project Name</th>
            <th>Project Output</th>
            <th>Status</th>
            <th>Department</th>
            <th>Section</th>
            <th>Financial Year</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No projects found.
              </td>
            </tr>
          ) : (
            currentProjects.map((project, index) => (
              <tr key={index}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{project.name}</td>
                <td>{project.output}</td>
                <td>{project.status}</td>
                <td>{project.department}</td>
                <td>{project.section}</td>
                <td>{project.year}</td>
                <td>
                  <button
                    onClick={() => openProgressModal(project)}
                    className={styles.progressButton}
                  >
                    {project.progress}%
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.pageBtn}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.pageBtn}>
          Next
        </button>
      </div>

      {selectedProject && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} id="printable" onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{selectedProject.name} Progress</h3>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.bar} ${getProgressColor(selectedProject.progress)}`}
                style={{ width: selectedProject.progress + '%' }}
              >
                {selectedProject.progress}%
              </div>
            </div>

            <div className={styles.modalButtons}>
              <button onClick={printModal} className={styles.printButton}>
                Print
              </button>
              <button onClick={closeModal} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectStatus;
