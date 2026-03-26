import React, { useState, useRef, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// PDF Document Component
const ReportPDF = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: "50px",
      fontSize: 12,
      fontFamily: 'Times-Roman',
      wordBreak:"normal"
    },
    header: {
      textAlign: "center",
      marginTop: 15,
      marginBottom: 15,
    },
    title: {
      fontSize: 16,
      // fontWeight: "bold",
    },
    subtitle: {
      fontSize: 12,
      marginTop: 4,
    },
    italicText: {
      fontSize: 20,
      marginTop: 14,
      marginBottom: 10,
      fontStyle: "italic",
      textDecoration: "underline",
    },
    italic: {
      fontSize: 16,
      marginTop: "20px",
      marginBottom: 10,
      fontStyle: "italic",
    },
    italicSubTitle: {
      fontSize:10,
      fontStyle: "italic",
      padding: "3px 0",
      flexGrow: 1,
      textAlign: "center",
      flexBasis: 0,
      flexShrink: 1,
      wordBreak: "normal",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginTop: 12,
      marginBottom: 3,
      textTransform: "uppercase",
    },
    sectionTitle2: {
      fontSize: 14,
      fontWeight: "500",
      marginTop: 12,
      marginBottom: 3,
      textTransform: "uppercase",
    },
    headerCenter: {
      textAlign: "center",
      marginBottom: 25,
      fontSize: 18
    },
    headerFont:{
      fontSize: 14
    },

    headerTitle: {
      fontSize: 20,
    },

    headerSubTitle: {
      fontSize: 16,
    },
    headerDate: {
      fontSize: 12,
    },
    // 🔹 Paragraph text (body of each description)
    paragraph: {
      fontSize: 11,
      marginBottom: 6,
      textAlign: "justify",
    },
    table: {
      display: "table",
      width: "100%",
      // borderStyle: "solid",
      // borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    table2: {
      display: "table",
      width: "100%",
      // borderStyle: "solid",
      // borderWidth: 1,
      borderRightWidth: 0,
      borderBottom: "1px solid gray",
    },
    
    tableSection: {
      marginTop: 40,
      marginBottom: 40,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    cell: {
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderLeftWidth: 0,
      // borderTopWidth: 0,
      // padding: 5,
      padding: "3px 0",
      flexGrow: 1,
      textAlign: "center",
      flexBasis: 0,
      flexShrink: 1,
      wordBreak: "normal",
      // wordBreak: "break-word",
    },
    headerCell: {
      fontSize: 10,
      borderBottom: "1px solid gray",
      backgroundColor: "#ddd",
      fontWeight: "500",
      wordBreak: "normal",
      // fontWeight: "bold",
    },
    oddRow: {
      fontSize:8,
      backgroundColor: "#f5f5f5",
    },
    evenRow: {
      fontSize:8,
    },
  });

  let schoolCount = 0;
  let tableCountForSchool = 0;
  let lastSchoolName = null;

  let teacherschoolCount = 0;
  let teachertableCountForSchool = 0;
  let teacherlastSchoolName = null;

  const isPrincipal = JSON.parse(localStorage.getItem("pmsc")).role;


  return (
    <Document className="pdf-font">
      <Page size="A4"  style={styles.page}>

      {data?.map((item, index) => {
        const prevSchool = index > 0 ? data[index - 1].school_name : null;
        const nextSchool = data[index + 1]?.school_name;

        const showHeader = item.school_name !== prevSchool;
        const showFooter = item.school_name !== nextSchool;
        if (item.school_name !== lastSchoolName) {
            schoolCount++;
            tableCountForSchool = 1;
            lastSchoolName = item.school_name; // Update the tracker
          } else {
            tableCountForSchool++; // If it's the same school, just increment the table counter

          }
        
        return (
        <React.Fragment size="A4"  style={styles.page} key={index}>
          {/*  Top Page text */}
          {showHeader && 
            <React.Fragment style={styles.headerFont}>
              <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>
                      PMSC{" "}
                      {isPrincipal === "principal"
                        ? "Staff"
                        : isPrincipal === "district-admin"
                        ? "District"
                        : ""}{" "}
                      Report
                    </Text>
                {/* <Text style={styles.headerTitle}> PMSC {isPrincipal === "principal" ? "" : "District"} Report </Text> */}
                <Text style={styles.headerSubTitle}> {item?.school_name} </Text>
                {/* <Text style={styles.headerDate}> {new Date().toLocaleDateString("en-GB")} </Text> */}
                 <Text style={styles.headerDate}>
                   {" "}
                      {/* {new Date().toLocaleDateString("en-GB")}{" "} */}
                      {new Date().toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </Text>
              </View>

              <Text style={styles.sectionTitle}>VARIABLES & METRICS</Text>

              <Text style={styles.sectionTitle2}>BASELINE COMPLETE</Text>
              <Text>
                Total number of students, associated with a teacher, who took the
                Baseline Assessment at the school DIVIDED by the total number of
                students associated with that teacher.
              </Text>

              <Text style={styles.sectionTitle2}>SUMMATIVE COMPLETE</Text>
              <Text>
                Total number of students, associated with a teacher, who took the
                Summative Assessment at the school DIVIDED by total number of
                students associated with that teacher who completed the Baseline
                Assessment.
              </Text>

              <Text style={styles.sectionTitle2}>FORMATIVE COMPLETE</Text>
              <Text>
                Total number of students, associated with a teacher, who completed
                a Lesson at the school DIVIDED by the number of students who
                completed the Baseline Assessment. There is a FORMATIVE COMPLETE
                score for Lesson 1, Lesson 2, Lesson 3, Lesson 4, Lesson 5, Lesson
                6, and Lesson 7.
              </Text>

              <Text style={styles.italicText}> PMSC Development Domain Completion </Text>
            </React.Fragment>}

          <React.Fragment>
            <View style={styles.header}>
              <Text style={styles.title}> Table {`${schoolCount}.${index+1}`} </Text>
              <Text style={styles.title}> {item?.school_name} </Text>
              <Text style={styles.title}> {item?.level_name} {item?.subject_name} </Text>
            </View>

            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>Teacher Name</Text>
                <Text style={[styles.cell, styles.headerCell]}>Baseline Complete</Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Complete </Text>
                <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Complete </Text>
                {/* {item?.teachers?.[0]?.lesson_scores?.map((l, i) => (
                  <Text key={i} style={[styles.cell, styles.headerCell]}>{l.lesson_name} Complete </Text>
                ))} */}
                <Text style={[styles.cell, styles.headerCell]}>Summative Complete</Text>
              </View>

              {(!item?.teachers || item?.teachers.length == 0) ? (
                <View style={styles.row}> <Text style={styles.cell}>No Teacher found</Text></View>
              ) : (
              item?.teachers?.map((teacher, idx) => (
                <View key={idx} style={[styles.row, idx % 2 == 1 ? styles.oddRow : styles.evenRow]} >
                  <Text style={styles.cell}>{teacher.teacher_name}</Text>
                  <Text style={styles.cell}>{teacher.baseline}%</Text>
                  {teacher.lesson_scores.map((l, i) => (
                    <Text key={i} style={styles.cell}> {l.percentage}% </Text>
                  ))}
                  <Text style={styles.cell}>{teacher.summative}%</Text>
                </View>
              )))}
            </View>
          </React.Fragment>

          {/* Bottom Page text */}
          {showFooter && <>
            <Text style={styles.sectionTitle}>VARIABLES & METRICS</Text>

            <Text style={styles.sectionTitle2}>BASELINE COMPLETE</Text>
            <Text>
              Total number of students who took the Baseline Assessment DIVIDED by
              total number of students enrolled in PMSC at the school.
            </Text>

            <Text style={styles.sectionTitle2}>SUMMATIVE COMPLETE</Text>
            <Text>
              Total number of students who took the Summative Assessment DIVIDED by
              total number of students who completed the Baseline Assessment at the
              school.
            </Text>

            <Text style={styles.sectionTitle2}>FORMATIVE COMPLETE-A</Text>
            <Text>
              Total number of students who completed Lessons 1 through 7 DIVIDED by
              the number of students who completed the Baseline Assessment at the
              school.
            </Text>

            <Text style={styles.sectionTitle2}>BASELINE LITERACY</Text>
            <Text>
              Sum of points achieved on the Baseline Assessment DIVIDED by total
              amount of points possible for those who completed Baseline Assessment at
              the school.
            </Text>

            <Text style={styles.sectionTitle2}>SUMMATIVE LITERACY</Text>
            <Text>
              Sum of points achieved on the Summative Assessment DIVIDED by total
              amount of points possible for those who completed Summative Assessment
              at the school.
            </Text>

            <Text style={styles.sectionTitle2}>LITERACY GROWTH</Text>
            <Text>
              SUMMATIVE LITERACY score SUBTRACTED BY BASELINE LITERACY score. This
              value is calculated when at least 50% of the Baseline Assessments have
              been completed at the school and at least 60% of the possible Summative
              Assessments have been completed.
            </Text>

            <Text style={styles.sectionTitle2}>FORMATIVE COMPLETE-B</Text>
            <Text>
              Total number of students who completed a Lesson DIVIDED by the number of
              students who completed the Baseline Assessment at the school. There is a
              FORMATIVE COMPLETE-B score for Lesson 1, Lesson 2, Lesson 3, Lesson 4,
              Lesson 5, Lesson 6, and Lesson 7.
            </Text>

            <Text style={styles.sectionTitle2}>FORMATIVE ACHIEVEMENT</Text>
            <Text>
              Sum of points achieved on a lesson by students who completed a lesson
              DIVIDED by total amount of points possible for students who completed a
              lesson. There is a FORMATIVE ACHIEVEMENT score for Lesson 1, Lesson 2,
              Lesson 3, Lesson 4, Lesson 5, Lesson 6, and Lesson 7.
            </Text>
          </>}
        </ React.Fragment>
      )})}
      
      {/* For Teacher Matrix */}
      {data?.map((item, index) => {
        if (item.subject_name !== teacherlastSchoolName) {
          teacherschoolCount++;
          teachertableCountForSchool = 1; // Reset to 1 for the new school
          teacherlastSchoolName = item.subject_name; // Update the tracker
        }
        return(
          <React.Fragment  style={styles.page} key={index}>
            <Text style={styles.italicText}>PMSC Development Domain Metrics</Text>
            <Text style={styles.italic}>{item?.subject_name} Development Domain</Text>

            <React.Fragment>
                <View style={styles.header}>
                  <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
                  <Text style={styles.title}> PMSC Development Domain Metrics by School Site </Text>
                </View>

                <View style={styles.table2}>
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.headerCell]}> School </Text>
                    <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
                    <Text style={[styles.cell, styles.headerCell]}> Baseline Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Summative Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Baseline Literacy </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Summative Literacy </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Formative Complete-A </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Literacy Growth </Text>
                  </View>

                  <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
                      <Text style={[styles.cell]}> {item?.school_name} </Text>
                      <Text style={[styles.cell]}> {item?.level_name} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.baseline_complete== 0 ? "*" : item?.teachermatrix?.baseline_complete} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.summative_complete== 0 ? "*" : item?.teachermatrix?.summative_complete} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.baseline_literacy== 0 ? "*" : item?.teachermatrix?.baseline_literacy} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.summative_literacy== 0 ? "*" : item?.teachermatrix?.summative_literacy} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.formative_complete_a== 0 ? "*" : item?.teachermatrix?.formative_complete_a} </Text>
                      <Text style={[styles.cell]}> {item?.teachermatrix?.literacy_growth== 0 ? "*" : item?.teachermatrix?.literacy_growth} </Text>
                    </View>
                </View>
                {Object.values(item.teachermatrix || {}).includes(0) &&<Text style={[styles.italicSubTitle]}> * There is insufficient data to calculate. </Text>}
                
              </React.Fragment>
            
            <React.Fragment>
                <View style={styles.header}>
                  <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
                  <Text style={styles.title}> PMSC Formative Complete-B Metrics by School Site </Text>
                </View>

                <View style={styles.table2}>
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.headerCell]}> School </Text>
                    <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Complete </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Complete </Text>
                  </View>

                  <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
                      <Text style={[styles.cell]}> {item?.school_name} </Text>
                      <Text style={[styles.cell]}> {item?.level_name} </Text>
                      {item.teachermatrix?.lessons.map((l, i) => (
                        <Text key={i} style={styles.cell}> {l.lesson_complete_b}% </Text>
                      ))}
                    </View>
                </View>
              </React.Fragment>
            
            <React.Fragment>
                <View style={styles.header}>
                  <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
                  <Text style={styles.title}> PMSC Formative Achievement Metrics by School Site </Text>
                </View>

                <View style={styles.table2}>
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.headerCell]}> School </Text>
                    <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Achieve </Text>
                    <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Achieve </Text>
                  </View>

                  <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
                      <Text style={[styles.cell]}> {item?.school_name} </Text>
                      <Text style={[styles.cell]}> {item?.level_name} </Text>
                      {item.teachermatrix?.lessons.map((l, i) => (
                        <Text key={i} style={styles.cell}> {l.lesson_achievement}% </Text>
                      ))}
                    </View>
                </View>
              </React.Fragment>
          </React.Fragment>)})
        }
      </ Page>
    </Document>
  );
};

// Function to convert data to CSV format
const convertToCSV = (data) => {
  if (!data || data.length == 0) return "";

  let csvContent = [];

  data.forEach(({ school_name, subject_name, level_name, teachers }) => {
    const hasTeachers = teachers && teachers?.length > 0;
    const lesson_scores = hasTeachers ? teachers[0].lesson_scores : [];
    // const totalCols = 2 + lesson_scores.length + 1; // Teacher + Baseline + Lessons + Summative
    const totalCols = 11; // Teacher + Baseline + Lessons + Summative

    // ---- Center School Name ----
    const schoolRow = new Array(totalCols).fill("");
    schoolRow[Math.floor(totalCols / 2)] = school_name;
    csvContent.push(schoolRow);

    // ---- Center Subject Name ----
    const subjectRow = new Array(totalCols).fill("");
    subjectRow[Math.floor(totalCols / 2)] = `${level_name || ""} ${subject_name || ""}`;
    csvContent.push(subjectRow);

    csvContent.push([]); // Blank row

    // ---- Headers ----
    const headers = [
      "Teacher Name",
      "Baseline Complete",
      "Lesson 1 Complete",
      "Lesson 2 Complete",
      "Lesson 3 Complete",
      "Lesson 4 Complete",
      "Lesson 5 Complete",
      "Lesson 6 Complete",
      "Lesson 7 Complete",
      // ...lesson_scores.map((l) => `${l.lesson_name} Complete`),
      "Summative Complete",
    ];
    csvContent.push(headers);

    // ---- Student Rows or "No student found" ----
    if (hasTeachers) {
      teachers?.forEach((teacher) => {
        const row = [
          teacher.teacher_name,
          `${teacher.baseline}%`,
          ...teacher.lesson_scores.map((l) => `${l.percentage}%`),
          `${teacher.summative}%`,
        ];
        csvContent.push(row);
      });
    } else {
      const emptyRow = new Array(totalCols).fill("");
      // emptyRow[Math.floor(totalCols / 2)] = "No teacher found";
      emptyRow[1] = "No teacher found";
      csvContent.push(emptyRow);
    }

    csvContent.push([]); // Blank row between subjects
  });

  // Convert array → CSV string
  return csvContent.map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
    ).join("\n");
};

// Download Component with Dropdown
export const DistrictReportDownload = ({ data }) => {
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
      if (!data || data.length == 0) return;
      
      try {
        setIsGenerating(true);
        const blob = await pdf(<ReportPDF data={data} />)?.toBlob();
        setPdfBlob(blob);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    
    generatePdfBlob();
  }, [data]);

  if (!data || data?.length == 0 || data?.every(item => item?.teachers?.length == 0)) {
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
      <button className="download-btn download-cta active" onClick={() => setShowDropdown(!showDropdown)}
        disabled={isGenerating} > {isGenerating ? "Generating Report..." : "Download Report"} </button>
      
      {showDropdown && (
        <div className="download-dropdown">
          <div className={`dropdown-item ${!pdfBlob ? 'disabled' : ''} `} onClick={pdfBlob ? handlePDFDownload : undefined} > Download PDF </div>
          
          <div className="dropdown-item" onClick={handleCSVDownload} > Download CSV </div>
        </div>
      )}
    </div>
  );
};

// For Preview button
export const PDFPreviewButton = ({ data }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = async () => {
    try {
      setIsLoading(true);
      const blob = await pdf(<ReportPDF data={data} />).toBlob();
      setPdfBlob(blob);
    } catch (err) {
      console.error("Error generating PDF preview:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button 
        className="download-cta active"
        onClick={handlePreview}
        disabled={isLoading}
      >
        {isLoading ? "Generating Preview..." : "Preview PDF"}
      </button>

      {/* 👇 Show the PDF when generated */}
      {pdfBlob && (
        <iframe
          src={URL.createObjectURL(pdfBlob)}
          width="100%"
          height="800"
          title="PDF Preview"
          style={{ marginTop: 20, border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
};

// import React, { useState, useRef, useEffect } from "react";
// import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// // PDF Document Component
// const ReportPDF = ({ data }) => {
//   const styles = StyleSheet.create({
//     page: {
//       padding: "48px 30px",
//       fontSize: 12,
//       fontFamily: 'Times-Roman',
//     },
//     header: {
//       textAlign: "center",
//       marginTop: 15,
//       marginBottom: 15,
//     },
//     title: {
//       fontSize: 12,
//       // fontWeight: "bold",
//     },
//     subtitle: {
//       fontSize: 12,
//       marginTop: 4,
//     },
//     italicText: {
//       fontSize: 20,
//       marginTop: 14,
//       marginBottom: 10,
//       fontStyle: "italic",
//       textDecoration: "underline",
//     },
//     italic: {
//       fontSize: 16,
//       marginTop: 14,
//       marginBottom: 10,
//       fontStyle: "italic",
//     },
//     sectionTitle: {
//       fontSize: 16,
//       fontWeight: "500",
//       marginTop: 12,
//       marginBottom: 3,
//       textTransform: "uppercase",
//     },
//     headerCenter: {
//       textAlign: "center",
//       marginBottom: 25,
//       fontSize: 18
//     },
//     headerFont:{
//       fontSize: 14
//     },

//     headerTitle: {
//       fontSize: 18,
//     },

//     headerSubTitle: {
//       fontSize: 17,
//     },
//     headerDate: {
//       fontSize: 12,
//     },
//     // 🔹 Paragraph text (body of each description)
//     paragraph: {
//       fontSize: 11,
//       marginBottom: 6,
//       textAlign: "justify",
//     },
//     table: {
//       display: "table",
//       width: "100%",
//       borderStyle: "solid",
//       borderWidth: 1,
//       borderRightWidth: 0,
//       borderBottomWidth: 0,
//     },
    
//     tableSection: {
//       marginTop: 40,
//       marginBottom: 40,
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
//       textAlign: "center",
//       flexBasis: 0,
//       flexShrink: 1,
//       wordBreak: "break-word",
//     },
//     headerCell: {
//       fontSize: 7,
//       backgroundColor: "#ddd",
//       fontWeight: "bold",
//     },
//     oddRow: {
//       fontSize:7,
//       backgroundColor: "#f5f5f5",
//     },
//     evenRow: {
//       fontSize:7,
//     },
//   });

//   let schoolCount = 0;
//   let tableCountForSchool = 0;
//   let lastSchoolName = null;

//   let teacherschoolCount = 0;
//   let teachertableCountForSchool = 0;
//   let teacherlastSchoolName = null;

//   return (
//     <Document className="pdf-font">
//       <Page size="A4"  style={styles.page}>

//       {data?.map((item, index) => {
//         const prevSchool = index > 0 ? data[index - 1].school_name : null;
//         const nextSchool = data[index + 1]?.school_name;

//         const showHeader = item.school_name !== prevSchool;
//         const showFooter = item.school_name !== nextSchool;
//         if (item.school_name !== lastSchoolName) {
//             schoolCount++;
//             tableCountForSchool = 1;
//             lastSchoolName = item.school_name; // Update the tracker
//           } else {
//             tableCountForSchool++; // If it's the same school, just increment the table counter

//           }
        
//         return (
//         <React.Fragment size="A4"  style={styles.page} key={index}>
//           {/*  Top Page text */}
//           {showHeader && 
//             <React.Fragment style={styles.headerFont}>
//               <View style={styles.headerCenter}>
//                 <Text style={styles.headerTitle}> PMSC District Report </Text>
//                 <Text style={styles.headerSubTitle}> {item?.school_name} </Text>
//                 <Text style={styles.headerDate}> {new Date().toLocaleDateString("en-GB")} </Text>
//               </View>

//               <Text style={styles.sectionTitle}>VARIABLES & METRICS</Text>

//               <Text style={styles.sectionTitle}>BASELINE COMPLETE</Text>
//               <Text>
//                 Total number of students, associated with a teacher, who took the
//                 Baseline Assessment at the school DIVIDED by the total number of
//                 students associated with that teacher.
//               </Text>

//               <Text style={styles.sectionTitle}>SUMMATIVE COMPLETE</Text>
//               <Text>
//                 Total number of students, associated with a teacher, who took the
//                 Summative Assessment at the school DIVIDED by total number of
//                 students associated with that teacher who completed the Baseline
//                 Assessment.
//               </Text>

//               <Text style={styles.sectionTitle}>FORMATIVE COMPLETE</Text>
//               <Text>
//                 Total number of students, associated with a teacher, who completed
//                 a Lesson at the school DIVIDED by the number of students who
//                 completed the Baseline Assessment. There is a FORMATIVE COMPLETE
//                 score for Lesson 1, Lesson 2, Lesson 3, Lesson 4, Lesson 5, Lesson
//                 6, and Lesson 7.
//               </Text>

//               <Text style={styles.italicText}> PMSC Development Domain Completion </Text>
//             </React.Fragment>}

//           <React.Fragment>
//             <View style={styles.header}>
//               <Text style={styles.title}> Table {`${schoolCount}.${index+1}`} </Text>
//               <Text style={styles.title}> {item?.school_name} </Text>
//               <Text style={styles.subtitle}> {item?.level_name} {item?.subject_name} </Text>
//             </View>

//             <View style={styles.table}>
//               <View style={styles.row}>
//                 <Text style={[styles.cell, styles.headerCell]}>Teacher Name</Text>
//                 <Text style={[styles.cell, styles.headerCell]}>Baseline Complete</Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Complete </Text>
//                 <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Complete </Text>
//                 {/* {item?.teachers?.[0]?.lesson_scores?.map((l, i) => (
//                   <Text key={i} style={[styles.cell, styles.headerCell]}>{l.lesson_name} Complete </Text>
//                 ))} */}
//                 <Text style={[styles.cell, styles.headerCell]}>Summative Complete</Text>
//               </View>

//               {(!item?.teachers || item?.teachers.length == 0) ? (
//                 <View style={styles.row}> <Text style={styles.cell}>No Teacher found</Text></View>
//               ) : (
//               item?.teachers?.map((teacher, idx) => (
//                 <View key={idx} style={[styles.row, idx % 2 == 1 ? styles.oddRow : styles.evenRow]} >
//                   <Text style={styles.cell}>{teacher.teacher_name}</Text>
//                   <Text style={styles.cell}>{teacher.baseline}%</Text>
//                   {teacher.lesson_scores.map((l, i) => (
//                     <Text key={i} style={styles.cell}> {l.percentage}% </Text>
//                   ))}
//                   <Text style={styles.cell}>{teacher.summative}%</Text>
//                 </View>
//               )))}
//             </View>
//           </React.Fragment>

//           {/* Bottom Page text */}
//           {showFooter && <>
//             <Text style={styles.sectionTitle}>VARIABLES & METRICS</Text>

//             <Text style={styles.sectionTitle}>BASELINE COMPLETE</Text>
//             <Text>
//               Total number of students who took the Baseline Assessment DIVIDED by
//               total number of students enrolled in PMSC at the school.
//             </Text>

//             <Text style={styles.sectionTitle}>SUMMATIVE COMPLETE</Text>
//             <Text>
//               Total number of students who took the Summative Assessment DIVIDED by
//               total number of students who completed the Baseline Assessment at the
//               school.
//             </Text>

//             <Text style={styles.sectionTitle}>FORMATIVE COMPLETE-A</Text>
//             <Text>
//               Total number of students who completed Lessons 1 through 7 DIVIDED by
//               the number of students who completed the Baseline Assessment at the
//               school.
//             </Text>

//             <Text style={styles.sectionTitle}>BASELINE LITERACY</Text>
//             <Text>
//               Sum of points achieved on the Baseline Assessment DIVIDED by total
//               amount of points possible for those who completed Baseline Assessment at
//               the school.
//             </Text>

//             <Text style={styles.sectionTitle}>SUMMATIVE LITERACY</Text>
//             <Text>
//               Sum of points achieved on the Summative Assessment DIVIDED by total
//               amount of points possible for those who completed Summative Assessment
//               at the school.
//             </Text>

//             <Text style={styles.sectionTitle}>LITERACY GROWTH</Text>
//             <Text>
//               SUMMATIVE LITERACY score SUBTRACTED BY BASELINE LITERACY score. This
//               value is calculated when at least 50% of the Baseline Assessments have
//               been completed at the school and at least 60% of the possible Summative
//               Assessments have been completed.
//             </Text>

//             <Text style={styles.sectionTitle}>FORMATIVE COMPLETE-B</Text>
//             <Text>
//               Total number of students who completed a Lesson DIVIDED by the number of
//               students who completed the Baseline Assessment at the school. There is a
//               FORMATIVE COMPLETE-B score for Lesson 1, Lesson 2, Lesson 3, Lesson 4,
//               Lesson 5, Lesson 6, and Lesson 7.
//             </Text>

//             <Text style={styles.sectionTitle}>FORMATIVE ACHIEVEMENT</Text>
//             <Text>
//               Sum of points achieved on a lesson by students who completed a lesson
//               DIVIDED by total amount of points possible for students who completed a
//               lesson. There is a FORMATIVE ACHIEVEMENT score for Lesson 1, Lesson 2,
//               Lesson 3, Lesson 4, Lesson 5, Lesson 6, and Lesson 7.
//             </Text>
//           </>}
//         </ React.Fragment>
//       )})}
      
//       {/* For Teacher Matrix */}
//       {data?.map((item, index) => {
//         if (item.subject_name !== teacherlastSchoolName) {
//           teacherschoolCount++;
//           teachertableCountForSchool = 1; // Reset to 1 for the new school
//           teacherlastSchoolName = item.subject_name; // Update the tracker
//         }
//         return(
//           <React.Fragment  style={styles.page} key={index}>
//             <Text style={styles.italicText}>PMSC Development Domain Metrics</Text>
//             <Text style={styles.italic}>{item?.subject_name} Development Domain</Text>

//             <React.Fragment>
//                 <View style={styles.header}>
//                   <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
//                   <Text style={styles.subtitle}> PMSC Development Domain Metrics by School Site </Text>
//                 </View>

//                 <View style={styles.table}>
//                   <View style={styles.row}>
//                     <Text style={[styles.cell, styles.headerCell]}> School </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Baseline Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Summative Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Baseline Literacy </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Summative Literacy </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Formative Complete-A </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Literacy Growth </Text>
//                   </View>

//                   <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
//                       <Text style={[styles.cell]}> {item?.school_name} </Text>
//                       <Text style={[styles.cell]}> {item?.level_name} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.baseline_complete} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.summative_complete} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.baseline_literacy} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.summative_literacy} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.formative_complete_a} </Text>
//                       <Text style={[styles.cell]}> {item?.teachermatrix?.literacy_growth} </Text>
//                     </View>
//                 </View>
//               </React.Fragment>
            
//             <React.Fragment>
//                 <View style={styles.header}>
//                   <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
//                   <Text style={styles.subtitle}> PMSC Formative Complete-B Metrics by School Site </Text>
//                 </View>

//                 <View style={styles.table}>
//                   <View style={styles.row}>
//                     <Text style={[styles.cell, styles.headerCell]}> School </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Complete </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Complete </Text>
//                   </View>

//                   <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
//                       <Text style={[styles.cell]}> {item?.school_name} </Text>
//                       <Text style={[styles.cell]}> {item?.level_name} </Text>
//                       {item.teachermatrix?.lessons.map((l, i) => (
//                         <Text key={i} style={styles.cell}> {l.lesson_complete_b}% </Text>
//                       ))}
//                     </View>
//                 </View>
//               </React.Fragment>
            
//             <React.Fragment>
//                 <View style={styles.header}>
//                   <Text style={styles.title}> Table {`${teacherschoolCount}.${teachertableCountForSchool++}`} </Text>
//                   <Text style={styles.subtitle}> PMSC Formative Achievement Metrics by School Site </Text>
//                 </View>

//                 <View style={styles.table}>
//                   <View style={styles.row}>
//                     <Text style={[styles.cell, styles.headerCell]}> School </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> PMSC Level</Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 1 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 2 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 3 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 4 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 5 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 6 Achieve </Text>
//                     <Text style={[styles.cell, styles.headerCell]}> Lesson 7 Achieve </Text>
//                   </View>

//                   <View style={[styles.row, 2 % 2 == 1 ? styles.oddRow : styles.evenRow]} >
//                       <Text style={[styles.cell]}> {item?.school_name} </Text>
//                       <Text style={[styles.cell]}> {item?.level_name} </Text>
//                       {item.teachermatrix?.lessons.map((l, i) => (
//                         <Text key={i} style={styles.cell}> {l.lesson_achievement}% </Text>
//                       ))}
//                     </View>
//                 </View>
//               </React.Fragment>
//           </React.Fragment>)})
//         }
//       </ Page>
//     </Document>
//   );
// };

// // Function to convert data to CSV format
// const convertToCSV = (data) => {
//   if (!data || data.length == 0) return "";

//   let csvContent = [];

//   data.forEach(({ school_name, subject_name, level_name, teachers }) => {
//     const hasTeachers = teachers && teachers?.length > 0;
//     const lesson_scores = hasTeachers ? teachers[0].lesson_scores : [];
//     // const totalCols = 2 + lesson_scores.length + 1; // Teacher + Baseline + Lessons + Summative
//     const totalCols = 11; // Teacher + Baseline + Lessons + Summative

//     // ---- Center School Name ----
//     const schoolRow = new Array(totalCols).fill("");
//     schoolRow[Math.floor(totalCols / 2)] = school_name;
//     csvContent.push(schoolRow);

//     // ---- Center Subject Name ----
//     const subjectRow = new Array(totalCols).fill("");
//     subjectRow[Math.floor(totalCols / 2)] = `${level_name || ""} ${subject_name || ""}`;
//     csvContent.push(subjectRow);

//     csvContent.push([]); // Blank row

//     // ---- Headers ----
//     const headers = [
//       "Teacher Name",
//       "Baseline Complete",
//       "Lesson 1 Complete",
//       "Lesson 2 Complete",
//       "Lesson 3 Complete",
//       "Lesson 4 Complete",
//       "Lesson 5 Complete",
//       "Lesson 6 Complete",
//       "Lesson 7 Complete",
//       // ...lesson_scores.map((l) => `${l.lesson_name} Complete`),
//       "Summative Complete",
//     ];
//     csvContent.push(headers);

//     // ---- Student Rows or "No student found" ----
//     if (hasTeachers) {
//       teachers?.forEach((teacher) => {
//         const row = [
//           teacher.teacher_name,
//           `${teacher.baseline}%`,
//           ...teacher.lesson_scores.map((l) => `${l.percentage}%`),
//           `${teacher.summative}%`,
//         ];
//         csvContent.push(row);
//       });
//     } else {
//       const emptyRow = new Array(totalCols).fill("");
//       // emptyRow[Math.floor(totalCols / 2)] = "No teacher found";
//       emptyRow[1] = "No teacher found";
//       csvContent.push(emptyRow);
//     }

//     csvContent.push([]); // Blank row between subjects
//   });

//   // Convert array → CSV string
//   return csvContent.map((row) =>
//       row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
//     ).join("\n");
// };

// // Download Component with Dropdown
// export const DistrictReportDownload = ({ data }) => {
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
//       if (!data || data.length == 0) return;
      
//       try {
//         setIsGenerating(true);
//         const blob = await pdf(<ReportPDF data={data} />)?.toBlob();
//         setPdfBlob(blob);
//       } catch (error) {
//         console.error("Error generating PDF:", error);
//       } finally {
//         setIsGenerating(false);
//       }
//     };
    
//     generatePdfBlob();
//   }, [data]);

//   if (!data || data?.length == 0 || data?.every(item => item?.teachers?.length == 0)) {
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
//       <button className="download-btn download-cta active" onClick={() => setShowDropdown(!showDropdown)}
//         disabled={isGenerating} > {isGenerating ? "Generating Report..." : "Download Report"} </button>
      
//       {showDropdown && (
//         <div className="download-dropdown">
//           <div className={`dropdown-item ${!pdfBlob ? 'disabled' : ''} `} onClick={pdfBlob ? handlePDFDownload : undefined} > Download PDF </div>
          
//           <div className="dropdown-item" onClick={handleCSVDownload} > Download CSV </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // For Preview button
// export const PDFPreviewButton = ({ data }) => {
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handlePreview = async () => {
//     try {
//       setIsLoading(true);
//       const blob = await pdf(<ReportPDF data={data} />).toBlob();
//       setPdfBlob(blob);
//     } catch (err) {
//       console.error("Error generating PDF preview:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: 20 }}>
//       <button 
//         className="download-cta active"
//         onClick={handlePreview}
//         disabled={isLoading}
//       >
//         {isLoading ? "Generating Preview..." : "Preview PDF"}
//       </button>

//       {/* 👇 Show the PDF when generated */}
//       {pdfBlob && (
//         <iframe
//           src={URL.createObjectURL(pdfBlob)}
//           width="100%"
//           height="800"
//           title="PDF Preview"
//           style={{ marginTop: 20, border: "1px solid #ccc" }}
//         />
//       )}
//     </div>
//   );
// };
