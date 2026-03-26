import React, { useState, useRef, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// PDF Document Component
const ReportPDF = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
    },
    header: {
      textAlign: "center",
      marginBottom: 15,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 12,
      marginTop: 4,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    cell: {
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      flexGrow: 1,
      flexBasis: 0,
      flexShrink: 1,
      textAlign: "center",
      wordBreak: "break-word",
    },
    headerCell: {
      backgroundColor: "#ddd",
      fontWeight: "bold",
    },
    oddRow: {
      backgroundColor: "#f5f5f5",
    },
  });

  return (
    <Document>
      {data?.map((item, index) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={index}>
          <View style={styles.header}>
            <Text style={styles.title}>{item?.school_name}</Text>
            <Text style={styles.subtitle}>
              {item?.level_name} {item?.subject_name}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.headerCell]}>Student Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Baseline Complete</Text>
              {item?.students?.[0]?.lesson_scores?.map((l, i) => (
                <Text key={i} style={[styles.cell, styles.headerCell]}>
                  {l.lesson_name} Complete
                </Text>
              ))}
              <Text style={[styles.cell, styles.headerCell]}>Summative Complete</Text>
            </View>

            {item?.students.length === 0 ? (
              <View style={styles.row}>
                <Text style={styles.cell}>No student found</Text>
              </View>
            ) : (
            item?.students.map((student, idx) => (
              <View key={idx} style={[styles.row, idx % 2 === 1 ? styles.oddRow : null]} >
                <Text style={styles.cell}>{student.student_name}</Text>
                <Text style={styles.cell}>{student.baseline}%</Text>
                {student.lesson_scores.map((l, i) => (
                  <Text key={i} style={styles.cell}>
                    {l.percentage}%
                  </Text>
                ))}
                <Text style={styles.cell}>{student.summative}%</Text>
              </View>
            )))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

// Function to convert data to CSV format
const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";

  let csvContent = [];

  data.forEach(({ school_name, subject_name, level_name, students }) => {
    const hasStudents = students && students.length > 0;
    const lesson_scores = hasStudents ? students[0].lesson_scores : [];
    const totalCols = 2 + lesson_scores.length + 1; // Student + Baseline + Lessons + Summative

    // ---- Center School Name ----
    const schoolRow = new Array(totalCols).fill("");
    schoolRow[Math.floor(totalCols / 2)] = school_name;
    csvContent.push(schoolRow);

    // ---- Center Subject Name ----
    const subjectRow = new Array(totalCols).fill("");
    subjectRow[Math.floor(totalCols / 2)] = `${level_name} ${subject_name}`;
    csvContent.push(subjectRow);

    csvContent.push([]); // Blank row

    // ---- Headers ----
    const headers = [
      "Student Name",
      "Baseline Complete",
      ...lesson_scores.map((l) => `${l.lesson_name} Complete`),
      "Summative Complete",
    ];
    csvContent.push(headers);

    // ---- Student Rows or "No student found" ----
    if (hasStudents) {
      students.forEach((student) => {
        const row = [
          student.student_name,
          `${student.baseline}%`,
          ...student.lesson_scores.map((l) => `${l.percentage}%`),
          `${student.summative}%`,
        ];
        csvContent.push(row);
      });
    } else {
      const emptyRow = new Array(totalCols).fill("");
      emptyRow[0] = "No student found";
      csvContent.push(emptyRow);
    }

    csvContent.push([]); // Blank row between subjects
  });

  // Convert array → CSV string
  return csvContent
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
};

// const convertToCSV = (data) => {
//   if (!data || data.length === 0) return "";

//   // Helper function to center text (in terms of CSV format)
//   const centerCell = (text, totalCols) => {
//     const emptyCols = Math.floor((totalCols - 1) / 2);
//     return [
//       ...Array(emptyCols).fill(""),
//       text,
//       ...Array(totalCols - emptyCols - 1).fill("")
//     ];
//   };

//   let csvContent = [];

//   // Iterate through all subjects and create CSV content for each subject
//   data.forEach(({ school_name, subject_name, level_name, students }) => {
//     const lesson_scores = students[0].lesson_scores;
//     const numLessonCols = lesson_scores.length;
//     const totalCols = 2 + numLessonCols + 1; // Student Name + Baseline + Lessons + Summative

//     // Add metadata (school name, subject name, and level)
//     csvContent.push(centerCell(school_name, totalCols));
//     csvContent.push(centerCell(`${level_name} ${subject_name}`, totalCols));
//     csvContent.push([]); // Empty row

//     // Headers for columns
//     const headers = [
//       "Student Name",
//       "Baseline Complete",
//       ...lesson_scores.map(l => `${l.lesson_name} Complete`),
//       "Summative Complete"
//     ];

//     // Add headers row
//     csvContent.push(headers);

//     // Add student data rows
//     students.forEach(student => {
//       const row = [
//         student.student_name,
//         `${student.baseline}%`,
//         ...student.lesson_scores.map(l => `${l.percentage}%`),
//         `${student.summative}%`
//       ];
//       csvContent.push(row); // Ensure this is an array
//     });

//     // Add a blank line between subjects
//     csvContent.push([]);
//   });

//   // Return the CSV string
//   return csvContent
//     .map(row => {
//       if (row?.length) {
//         return row
//           .map(field => `"${String(field).replace(/"/g, '""')}"`)
//           .join(",");
//       }
//       return ""; // Handle empty row gracefully
//     })
//     .join("\n");
// };

// -----------------------
// const convertToCSV = (data) => {
//   if (!data || data.length === 0) return "";
  
//   // const { lesson_scores } = data[0];

//   const { subject_name, level_name, lesson_scores } = data[0];

//   const numLessonCols = lesson_scores.length;
//   const totalCols = 2 + numLessonCols + 1; // Student Name + Baseline + Lessons + Summative

//   const centerCell = (text) => {
//     const emptyCols = Math.floor((totalCols - 1) / 2);
//     return [
//       ...Array(emptyCols).fill(""),
//       text,
//       ...Array(totalCols - emptyCols - 1).fill("")
//     ];
//   };

//   // Metadata / header rows (simulated centering)
//   const metaRows = [
//     centerCell("Envision Academy of Arts and Technology"),
//     centerCell(`${level_name} ${subject_name}`),
//     [], // Empty row
//   ];

//   const headers = [
//     "Student Name",
//     "Baseline Complete",
//     ...lesson_scores.map(l => `${l.lesson_name} Complete`),
//     "Summative Complete"
//   ];
  
//   const rows = data.map(student => [
//     student.student_name,
//     `${student.baseline}%`,
//     ...student.lesson_scores.map(l => `${l.percentage}%`),
//     `${student.summative}%`
//   ]);
  
//   return [...metaRows, headers, ...rows].map(row => 
//     row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
//   ).join('\n');
// };

// Download Component with Dropdown
export const ReportDownload = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate PDF blob when data changes
  useEffect(() => {
    const generatePdfBlob = async () => {
      if (!data || data.length === 0) return;
      
      try {
        setIsGenerating(true);
        const blob = await pdf(<ReportPDF data={data} />).toBlob();
        setPdfBlob(blob);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    
    generatePdfBlob();
  }, [data]);

  // Only render if data is valid
  // if (!data || data.length === 0) {
  if (!data || data.length === 0 || data.every(item => item.students.length === 0)) {
    return <button className="download-btn" disabled>No Data Found</button>;
  }

  const handleCSVDownload = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDropdown(false);
  };

  const handlePDFDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowDropdown(false);
    }
  };

  return (
    <div className="download-container" ref={dropdownRef}>
      <button 
        className="download-btn download-cta active" 
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating Report..." : "Download Report"}
      </button>
      
      {showDropdown && (
        <div className="download-dropdown">
          <div 
            className={`dropdown-item ${!pdfBlob ? 'disabled' : ''} `}
            onClick={pdfBlob ? handlePDFDownload : undefined}
          >
            Download PDF
          </div>
          
          <div 
            className="dropdown-item"
            onClick={handleCSVDownload}
          >
            Download CSV
          </div>
        </div>
      )}
    </div>
  );
};

// import React, { useState, useRef, useEffect } from "react";
// import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// // PDF Document Component
// const ReportPDF = ({ data }) => {
//   const { subject_name, level_name, lesson_scores } = data[0];

//   const styles = StyleSheet.create({
//     page: {
//       padding: 20,
//       fontSize: 10,
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: 15,
//     },
//     title: {
//       fontSize: 14,
//       fontWeight: "bold",
//     },
//     subtitle: {
//       fontSize: 12,
//       marginTop: 4,
//     },
//     table: {
//       display: "table",
//       width: "100%",
//       borderStyle: "solid",
//       borderWidth: 1,
//       borderRightWidth: 0,
//       borderBottomWidth: 0,
//     },
//     row: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//     },
//     cell: {
//       borderStyle: "solid",
//       borderWidth: 1,
//       borderLeftWidth: 0,
//       borderTopWidth: 0,
//       padding: 5,
//       flexGrow: 1,
//       flexBasis: 0,
//       flexShrink: 1,
//       textAlign: "center",
//       wordBreak: "break-word",
//     },
//     headerCell: {
//       backgroundColor: "#ddd",
//       fontWeight: "bold",
//     },
//     oddRow: {
//       backgroundColor: "#f5f5f5",
//     },
//   });

//   return (
//     <Document>
//       <Page size="A4" orientation="landscape" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Envision Academy of Arts and Technology</Text>
//           <Text style={styles.subtitle}>
//             {level_name} {subject_name}
//           </Text>
//         </View>

//         <View style={styles.table}>
//           <View style={styles.row}>
//             <Text style={[styles.cell, styles.headerCell]}>Student Name</Text>
//             <Text style={[styles.cell, styles.headerCell]}>Baseline Complete</Text>
//             {lesson_scores.map((l, i) => (
//               <Text key={i} style={[styles.cell, styles.headerCell]}>
//                 {l.lesson_name} Complete
//               </Text>
//             ))}
//             <Text style={[styles.cell, styles.headerCell]}>Summative Complete</Text>
//           </View>

//           {data.map((student, idx) => (
//             <View
//               key={idx}
//               style={[styles.row, idx % 2 === 1 ? styles.oddRow : null]}
//             >
//               <Text style={styles.cell}>{student.student_name}</Text>
//               <Text style={styles.cell}>{student.baseline}%</Text>
//               {student.lesson_scores.map((l, i) => (
//                 <Text key={i} style={styles.cell}>
//                   {l.percentage}%
//                 </Text>
//               ))}
//               <Text style={styles.cell}>{student.summative}%</Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// // Function to convert data to CSV format
// const convertToCSV = (data) => {
//   if (!data || data.length === 0) return "";
  
//   // const { lesson_scores } = data[0];

//   const { subject_name, level_name, lesson_scores } = data[0];

//   const numLessonCols = lesson_scores.length;
//   const totalCols = 2 + numLessonCols + 1; // Student Name + Baseline + Lessons + Summative

//   const centerCell = (text) => {
//     const emptyCols = Math.floor((totalCols - 1) / 2);
//     return [
//       ...Array(emptyCols).fill(""),
//       text,
//       ...Array(totalCols - emptyCols - 1).fill("")
//     ];
//   };

//   // Metadata / header rows (simulated centering)
//   const metaRows = [
//     centerCell("Envision Academy of Arts and Technology"),
//     centerCell(`${level_name} ${subject_name}`),
//     [], // Empty row
//   ];

//   const headers = [
//     "Student Name",
//     "Baseline Complete",
//     ...lesson_scores.map(l => `${l.lesson_name} Complete`),
//     "Summative Complete"
//   ];
  
//   const rows = data.map(student => [
//     student.student_name,
//     `${student.baseline}%`,
//     ...student.lesson_scores.map(l => `${l.percentage}%`),
//     `${student.summative}%`
//   ]);
  
//   return [...metaRows, headers, ...rows].map(row => 
//     row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
//   ).join('\n');
// };

// // Download Component with Dropdown
// export const ReportDownload = ({ data }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const dropdownRef = useRef(null);
  
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Generate PDF blob when data changes
//   useEffect(() => {
//     const generatePdfBlob = async () => {
//       if (!data || data.length === 0) return;
      
//       try {
//         setIsGenerating(true);
//         const blob = await pdf(<ReportPDF data={data} />).toBlob();
//         setPdfBlob(blob);
//       } catch (error) {
//         console.error("Error generating PDF:", error);
//       } finally {
//         setIsGenerating(false);
//       }
//     };
    
//     generatePdfBlob();
//   }, [data]);

//   // Only render if data is valid
//   if (!data || data.length === 0) {
//     return <button className="download-btn" disabled>No Data Found</button>;
//   }

//   const handleCSVDownload = () => {
//     const csvContent = convertToCSV(data);
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'report.csv');
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowDropdown(false);
//   };

//   const handlePDFDownload = () => {
//     if (pdfBlob) {
//       const url = URL.createObjectURL(pdfBlob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'report.pdf';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       setShowDropdown(false);
//     }
//   };

//   return (
//     <div className="download-container" ref={dropdownRef}>
//       <button 
//         className="download-btn download-cta active" 
//         onClick={() => setShowDropdown(!showDropdown)}
//         disabled={isGenerating}
//       >
//         {isGenerating ? "Generating Report..." : "Download Report"}
//       </button>
      
//       {showDropdown && (
//         <div className="download-dropdown">
//           <div 
//             className={`dropdown-item ${!pdfBlob ? 'disabled' : ''} `}
//             onClick={pdfBlob ? handlePDFDownload : undefined}
//           >
//             Download PDF
//           </div>
          
//           <div 
//             className="dropdown-item"
//             onClick={handleCSVDownload}
//           >
//             Download CSV
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };