// "use client";

// import { useEffect, useState } from "react";

// export default function GeographicalDetails() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://www.bungoma.go.ke/wp-json/wp/v2/posts?_embed"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
        
//         if (Array.isArray(result)) {
//           setData(result);
//         } else {
//           throw new Error("Invalid data format received");
//         }
//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading data...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Geographical Details</h2>
//       {data.length > 0 ? (
//         <ul className="space-y-4">
//           {data.map((item) => (
//             <li key={item.id} className="border p-4 rounded shadow">
//               <h3 className="text-xl font-semibold">{item.title?.rendered || "Untitled"}</h3>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: item.content?.rendered || "No content available.",
//                 }}
//                 className="mt-2"
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No data available.</p>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";

// export default function GeographicalDetails() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://www.bungoma.go.ke/wp-json/wp/v2/posts/16414?_embed"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         // Ensure the response has the correct structure
//         if (result.id === 16414) {
//           setData(result);
//         } else {
//           throw new Error("Post not found");
//         }
//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading data...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!data) return <p>No data available.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Geographical Details</h2>
//       <div className="border p-4 rounded shadow">
//         <h3 className="text-xl font-semibold">{data.title?.rendered || "Untitled"}</h3>
//         <div
//           dangerouslySetInnerHTML={{
//             __html: data.content?.rendered || "No content available.",
//           }}
//           className="mt-2"
//         />
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import styles from "./GeographicalDetails.module.css"; // Import the CSS file

// export default function GeographicalDetails() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({
//     searchTerm: "",
//   });

//   const [filteredData, setFilteredData] = useState([]);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Number of items per page

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://www.bungoma.go.ke/wp-json/wp/v2/posts/16414?_embed"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.id === 16414) {
//           setData(result);
//         } else {
//           throw new Error("Post not found");
//         }
//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data) {
//       const projectData = extractProjectData(data.content?.rendered || "");
//       setFilteredData(projectData);
//     }
//   }, [data]);

//   const extractProjectData = (htmlContent) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, "text/html");
//     const tableRows = doc.querySelectorAll("table tbody tr");

//     const projects = [];

//     tableRows.forEach((row) => {
//       const cells = row.querySelectorAll("td");
//       if (cells.length >= 4) {
//         projects.push({
//           projectName: cells[1]?.innerText || "N/A",
//           subCounty: cells[2]?.innerText || "N/A",
//           ward: cells[3]?.innerText || "N/A",
//           location: cells[4]?.innerText || "N/A",
//         });
//       }
//     });

//     return projects;
//   };

//   const handleFilterChange = (e) => {
//     const { value } = e.target;

//     setFilters({
//       searchTerm: value,
//     });

//     const filtered = applyFilters(value);
//     setFilteredData(filtered);
//   };

//   const applyFilters = (searchTerm) => {
//     if (!searchTerm) {
//       return extractProjectData(data.content?.rendered || "");
//     }

//     return extractProjectData(data.content?.rendered || "").filter((project) => {
//       return (
//         project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.subCounty.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.location.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });
//   };

//   // Calculate the current page data
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Pagination controls
//   const previousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Export to CSV
//   const exportToCSV = (rows = filteredData) => {
//     const csvContent = [
//       ["Project Name", "Sub-County", "Ward", "Location"], // Header row
//       ...rows.map((row) => [
//         row.projectName,
//         row.subCounty,
//         row.ward,
//         row.location,
//       ]),
//     ]
//       .map((e) => e.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "projects.csv";
//     link.click();
//   };

//   // Print table
//   const printTable = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write("<html><head><title>Print Table</title></head><body>");
//     printWindow.document.write(document.querySelector(`.${styles.table}`).outerHTML);
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   if (loading) return <p>Loading data...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!data) return <p>No data available.</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Project Details</h2>
//       <div className={styles.card}>
//         <h3 className="text-xl font-semibold">{data.title?.rendered || "Untitled"}</h3>

//         {/* Filter Section */}
//         <div className={styles.filterContainer}>
//           <input
//             type="text"
//             name="searchTerm"
//             placeholder="Search by Project Name, Sub-County, Ward, or Location"
//             value={filters.searchTerm}
//             onChange={handleFilterChange}
//             className={styles.filterInput}
//           />
//         </div>

//         {/* Export and Print Buttons */}
//         <div className={styles.exportButtons}>
//           <button onClick={() => exportToCSV()} className={styles.exportButton}>
//             Export All Data
//           </button>
//           <button
//             onClick={() => exportToCSV(currentItems)}
//             className={styles.exportButton}
//           >
//             Export Current Page
//           </button>
//           <button onClick={printTable} className={styles.exportButton}>
//             Print Table
//           </button>
//         </div>

//         {filteredData.length > 0 ? (
//           <>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Project Name</th>
//                   <th>Sub-County</th>
//                   <th>Ward</th>
//                   <th>Location</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((project, index) => (
//                   <tr key={index}>
//                     <td>{project.projectName}</td>
//                     <td>{project.subCounty}</td>
//                     <td>{project.ward}</td>
//                     <td>{project.location}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className={styles.pagination}>
//               <button onClick={previousPage} className={styles.pageButton} disabled={currentPage === 1}>
//                 Previous
//               </button>

//               <span className={styles.pageInfo}>
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button onClick={nextPage} className={styles.pageButton} disabled={currentPage === totalPages}>
//                 Next
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className={styles.noData}>No project data available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import styles from "./GeographicalDetails.module.css";
import MapComponent from "./MapComponent";

export default function GeographicalDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ searchTerm: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://www.bungoma.go.ke/wp-json/wp/v2/posts/16414?_embed"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.id === 16414) {
          setData(result);
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const projectData = extractProjectData(data.content?.rendered || "");
      setFilteredData(projectData);
    }
  }, [data]);

  const extractProjectData = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const tableRows = doc.querySelectorAll("table tbody tr");
    const projects = [];

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 5) {
        projects.push({
          projectName: cells[1]?.innerText || "N/A",
          subCounty: cells[2]?.innerText || "N/A",
          ward: cells[3]?.innerText || "N/A",
          location: cells[4]?.innerText || "N/A",
          latitude: parseFloat(cells[5]?.innerText) || 0,
          longitude: parseFloat(cells[6]?.innerText) || 0,
        });
      }
    });
    return projects;
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters({ searchTerm: value });
    setFilteredData(applyFilters(value));
  };

  const applyFilters = (searchTerm) => {
    if (!searchTerm) {
      return extractProjectData(data.content?.rendered || "");
    }
    return extractProjectData(data.content?.rendered || "").filter((project) =>
      [project.projectName, project.subCounty, project.ward, project.location]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const previousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{data.title?.rendered || "Untitled"}</h3>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
        {filteredData.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Sub-County</th>
                  <th>Ward</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((project, index) => (
                  <tr key={index}>
                    <td>{project.projectName}</td>
                    <td>{project.subCounty}</td>
                    <td>{project.ward}</td>
                    <td>{project.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <MapComponent {...currentItems[0]} />
            <div className={styles.pagination}>
  <button 
    onClick={previousPage} 
    className={styles.pageButton} 
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span className={styles.pageInfo}>
    Page {currentPage} of {totalPages}
  </span>

  <button 
    onClick={nextPage} 
    className={styles.pageButton} 
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
          </>
        ) : (
          <p>No project data available.</p>
        )}
      </div>
    </div>
  );
}
