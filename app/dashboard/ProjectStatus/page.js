//  'use client';


// import React, { useState, useMemo } from 'react';
// import styles from './ProjectStatus.module.css';
// import { FaStar } from 'react-icons/fa';

// function ProjectStatus() {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 10;

//   const [filters, setFilters] = useState({
//     name: '',
//     status: '',
//     department: '',
//     year: '',
//   });

//   const projects = [
//     {
//       name: 'Bridge Construction',
//       output: 'Bridge completed',
//       status: 'Ongoing',
//       department: 'Roads and Public Works',
//       section: 'Roads',
//       year: '2024/2025',
//       progress: 30,
//     },
//     {
//       name: 'ICT Equipment Delivery',
//       output: '100 laptops delivered',
//       status: 'Completed',
//       department: 'Public Administration and ICT',
//       section: 'Public Administration',
//       year: '2024/2025',
//       progress: 100,
//     },
//     {
//       name: 'Health Center Renovation',
//       output: 'Facility refurbished',
//       status: 'Ongoing',
//       department: 'Health and Sanitation',
//       section: 'Sanitation',
//       year: '2024/2025',
//       progress: 60,
//     },
//     {
//       name: 'Water Project',
//       output: '5 boreholes drilled',
//       status: 'Ongoing',
//       department: 'Water',
//       section: 'Water',
//       year: '2024/2025',
//       progress: 20,
//     },
//     {
//       name: 'School Supplies',
//       output: 'Textbooks distributed',
//       status: 'Completed',
//       department: 'Education',
//       section: 'Education',
//       year: '2024/2025',
//       progress: 75,
//     },
//   ];

//   const uniqueDepartments = useMemo(() => {
//     const depts = projects.map((p) => p.department);
//     return Array.from(new Set(depts));
//   }, [projects]);

//   const uniqueYears = useMemo(() => {
//     const yrs = projects.map((p) => p.year);
//     return Array.from(new Set(yrs));
//   }, [projects]);

//   const openProgressModal = (project) => setSelectedProject(project);

//   const closeModal = () => setSelectedProject(null);

//   const getProgressColor = (progress) => {
//     if (progress <= 25) return styles.red;
//     if (progress <= 50) return styles.gold;
//     if (progress <= 75) return styles.orange;
//     return styles.green;
//   };

//   const printModal = () => {
//     const printContents = document.getElementById('printable').innerHTML;
//     const newWindow = window.open('', '', 'width=800,height=600');
//     newWindow.document.write(
//       `<html><head><title>Print Project Progress</title><style>
//       body { font-family: Arial; padding: 20px; }
//       h3 { color: #28a745; }
//       .bar { height: 25px; color: white; text-align: center; line-height: 25px; border-radius: 8px; font-weight: bold; }
//       .red { background: red; }
//       .gold { background: goldenrod; }
//       .orange { background: orange; }
//       .green { background: #28a745; }
//       </style></head><body>${printContents}</body></html>`
//     );
//     newWindow.document.close();
//     newWindow.print();
//   };

//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesName = project.name.toLowerCase().includes(filters.name.toLowerCase());
//       const matchesStatus = filters.status ? project.status.toLowerCase() === filters.status.toLowerCase() : true;
//       const matchesDepartment = filters.department ? project.department === filters.department : true;
//       const matchesYear = filters.year ? project.year === filters.year : true;
//       return matchesName && matchesStatus && matchesDepartment && matchesYear;
//     });
//   }, [filters, projects]);

//   const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
//   const indexOfLast = currentPage * projectsPerPage;
//   const indexOfFirst = indexOfLast - projectsPerPage;
//   const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setCurrentPage(1);
//   };

//   const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className={styles.wrapper}>
//       <h2 className={styles.title}>Project Progress Tracker</h2>

//       <div className={styles.filters}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Search by Project Name"
//           value={filters.name}
//           onChange={handleFilterChange}
//           className={styles.filterInput}
//         />

//         <select
//           name="status"
//           value={filters.status}
//           onChange={handleFilterChange}
//           className={styles.filterInput}
//         >
//           <option value="">All Statuses</option>
//           <option value="Ongoing">Ongoing</option>
//           <option value="Completed">Completed</option>
//         </select>

//         <select
//           name="department"
//           value={filters.department}
//           onChange={handleFilterChange}
//           className={styles.filterInput}
//         >
//           <option value="">All Departments</option>
//           {uniqueDepartments.map((dept) => (
//             <option key={dept} value={dept}>
//               {dept}
//             </option>
//           ))}
//         </select>

//         <select
//           name="year"
//           value={filters.year}
//           onChange={handleFilterChange}
//           className={styles.filterInput}
//         >
//           <option value="">All Years</option>
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Serial No.</th>
//             <th>Project Name</th>
//             <th>Project Output</th>
//             <th>Status</th>
//             <th>Department</th>
//             <th>Section</th>
//             <th>Financial Year</th>
//             <th>Progress</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProjects.length === 0 ? (
//             <tr>
//               <td colSpan="8" style={{ textAlign: 'center' }}>
//                 No projects found.
//               </td>
//             </tr>
//           ) : (
//             currentProjects.map((project, index) => (
//               <tr key={index}>
//                 <td>{indexOfFirst + index + 1}</td>
//                 <td>{project.name}</td>
//                 <td>{project.output}</td>
//                 <td>{project.status}</td>
//                 <td>{project.department}</td>
//                 <td>{project.section}</td>
//                 <td>{project.year}</td>
//                 <td>
//                   <button
//                     onClick={() => openProgressModal(project)}
//                     className={styles.progressButton}
//                   >
//                     {project.progress}%
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div className={styles.pagination}>
//         <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.pageBtn}>
//           Previous
//         </button>
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.pageBtn}>
//           Next
//         </button>
//       </div>

//       {selectedProject && (
//         <div className={styles.modal} onClick={closeModal}>
//           <div className={styles.modalContent} id="printable" onClick={(e) => e.stopPropagation()}>
//             <h3 className={styles.modalTitle}>{selectedProject.name} Progress</h3>
//             <div className={styles.ratingSection}>
//   <label htmlFor="rating">Rate this project (1-10):</label>
//   <input
//     type="number"
//     id="rating"
//     name="rating"
//     min="1"
//     max="10"
//     value={selectedProject.rating || ''}
//     onChange={(e) => {
//       const updatedRating = parseInt(e.target.value);
//       if (updatedRating >= 1 && updatedRating <= 10) {
//         setSelectedProject({ ...selectedProject, rating: updatedRating });
//       }
//     }}
//     className={styles.ratingInput}
//   />
//   <button
//     onClick={async () => {
//       try {
//         const res = await fetch('/api/update-rating', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             projectName: selectedProject.name,
//             rating: selectedProject.rating,
//           }),
//         });
//         if (res.ok) {
//           alert('Rating updated successfully!');
//         } else {
//           alert('Failed to update rating.');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('Error updating rating.');
//       }
//     }}
//     className={styles.submitRatingButton}
//   >
//     Submit Rating
//   </button>
// </div>

//             <div className={styles.progressContainer}>
//               <div
//                 className={`${styles.bar} ${getProgressColor(selectedProject.progress)}`}
//                 style={{ width: selectedProject.progress + '%' }}
//               >
//                 {selectedProject.progress}%
//               </div>
//             </div>

//             <div className={styles.modalButtons}>
//               <button onClick={printModal} className={styles.printButton}>
//                 Print
//               </button>
//               <button onClick={closeModal} className={styles.closeButton}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectStatus;

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
    return Array.from(new Set(projects.map(p => p.department)));
  }, []);

  const uniqueYears = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.year)));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const nameMatch = project.name.toLowerCase().includes(filters.name.toLowerCase());
      const statusMatch = filters.status ? project.status === filters.status : true;
      const departmentMatch = filters.department ? project.department === filters.department : true;
      const yearMatch = filters.year ? project.year === filters.year : true;
      return nameMatch && statusMatch && departmentMatch && yearMatch;
    });
  }, [filters]);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const openProgressModal = (project) => {
    setSelectedProject({ ...project, rating: '', feedback: '' });
  };

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
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Project Progress</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h3 { color: #28a745; }
            .bar { height: 25px; color: white; text-align: center; line-height: 25px; border-radius: 8px; font-weight: bold; }
            .red { background: red; }
            .gold { background: goldenrod; }
            .orange { background: orange; }
            .green { background: #28a745; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const handleFeedbackSubmit = async () => {
    try {
      const res = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: selectedProject.name,
          rating: selectedProject.rating,
          feedback: selectedProject.feedback,
        }),
      });
      if (res.ok) {
        alert('Thank you for your feedback!');
        setSelectedProject(null);
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Project Progress Tracker</h2>

      <div className={styles.filters}>
        <input
          type="text"
          name="name"
          placeholder="Search by Project Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className={styles.filterInput}
        />
        <select
          name="status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className={styles.filterInput}
        >
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="department"
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          className={styles.filterInput}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>
        <select
          name="year"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className={styles.filterInput}
        >
          <option value="">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Project Name</th>
            <th>Output</th>
            <th>Status</th>
            <th>Department</th>
            <th>Section</th>
            <th>Year</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length === 0 ? (
            <tr><td colSpan="8" style={{ textAlign: 'center' }}>No projects found.</td></tr>
          ) : (
            currentProjects.map((project, i) => (
              <tr key={i}>
                <td>{indexOfFirst + i + 1}</td>
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
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>

      {selectedProject && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} id="printable" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProject.name} Progress</h3>
            <div className={styles.progressContainer}>
              <div
                className={`${styles.bar} ${getProgressColor(selectedProject.progress)}`}
                style={{ width: selectedProject.progress + '%' }}
              >
                {selectedProject.progress}%
              </div>
            </div>

            <label className={styles.ratingLabel}>Rate this project (1–10):</label>
<div className={styles.stars}>
  {Array.from({ length: 10 }, (_, i) => {
    const ratingValue = i + 1;
    const isFilled =
      selectedProject.hoverRating >= ratingValue ||
      selectedProject.rating >= ratingValue;

    return (
      <span
        key={ratingValue}
        className={styles.star}
        onClick={() =>
          setSelectedProject({ ...selectedProject, rating: ratingValue })
        }
        onMouseEnter={() =>
          setSelectedProject({ ...selectedProject, hoverRating: ratingValue })
        }
        onMouseLeave={() =>
          setSelectedProject({ ...selectedProject, hoverRating: undefined })
        }
        style={{
          color: isFilled ? '#ffc107' : '#ccc',
          transform:
            selectedProject.hoverRating >= ratingValue ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.2s ease, color 0.2s ease',
        }}
      >
        ★
      </span>
    );
  })}
</div>


<br/>
            <label htmlFor="feedback">Leave a comment:</label>
            <textarea
              rows="4"
              placeholder="Your thoughts..."
              value={selectedProject.feedback}
              onChange={(e) =>
                setSelectedProject({ ...selectedProject, feedback: e.target.value })
              }
              className={styles.feedbackTextarea}
            />

            <div className={styles.modalButtons}>
              <button onClick={handleFeedbackSubmit} className={styles.submitFeedbackButton}>
                Submit Feedback
              </button>
              <button onClick={printModal} className={styles.printButton}>Print</button>
              <button onClick={closeModal} className={styles.closeButton}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectStatus;
