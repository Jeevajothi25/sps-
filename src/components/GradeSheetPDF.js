import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  collegeLogo: {
    width: 60,
    height: 60,
  },
  collegeInfo: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  collegeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b91c1c',
    marginBottom: 5,
  },
  collegeAddress: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  gradeSheetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    padding: 5,
  },
  studentInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontSize: 10,
    color: '#4b5563',
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: '#111827',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  semCol: { width: '8%', fontSize: 9 },
  codeCol: { width: '15%', fontSize: 9 },
  titleCol: { width: '37%', fontSize: 9 },
  creditCol: { width: '10%', fontSize: 9 },
  gradeCol: { width: '15%', fontSize: 9 },
  pointCol: { width: '15%', fontSize: 9 },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
  summary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
  signature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  photoContainer: {
    position: 'absolute',
    top: 100,
    right: 40,
    width: 100,
    height: 120,
    border: '1pt solid #000',
  },
});

// PDF Document component
const GradeSheetDocument = ({ studentData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.collegeLogo}
          src="/college-logo.png"
        />
        <View style={styles.collegeInfo}>
          <Text style={styles.collegeTitle}>Velammal College of Engineering and Technology</Text>
          <Text style={styles.collegeAddress}>Madurai - 625 009</Text>
          <Text style={styles.collegeAddress}>(An Autonomous Institution Affiliated to Anna University, Chennai-600 025)</Text>
        </View>
        <Image
          style={styles.collegeLogo}
          src="/anna-university-logo.png"
        />
      </View>

      <Text style={styles.gradeSheetTitle}>B.E. DEGREE EXAMINATIONS GRADE SHEET</Text>

      <View style={styles.studentInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Register Number:</Text>
          <Text style={styles.value}>{studentData.registerNumber}</Text>
          <Text style={styles.label}>File No:</Text>
          <Text style={styles.value}>{studentData.fileNo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name of the Student:</Text>
          <Text style={styles.value}>{studentData.name}</Text>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{studentData.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{format(new Date(studentData.dob), 'dd-MMM-yyyy')}</Text>
          <Text style={styles.label}>Month and Year of Exam:</Text>
          <Text style={styles.value}>{studentData.examDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Programme and Branch:</Text>
          <Text style={styles.value}>{studentData.programme}</Text>
          <Text style={styles.label}>Regulations:</Text>
          <Text style={styles.value}>{studentData.regulations}</Text>
        </View>
      </View>

      <View style={styles.photoContainer}>
        <Image src={studentData.photo} />
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.semCol}>Sem</Text>
          <Text style={styles.codeCol}>Course Code</Text>
          <Text style={styles.titleCol}>Course Title</Text>
          <Text style={styles.creditCol}>Credit</Text>
          <Text style={styles.gradeCol}>Letter Grade</Text>
          <Text style={styles.pointCol}>Grade Point</Text>
        </View>
        {studentData.courses.map((course, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.semCol}>{course.semester}</Text>
            <Text style={styles.codeCol}>{course.code}</Text>
            <Text style={styles.titleCol}>{course.title}</Text>
            <Text style={styles.creditCol}>{course.credit}</Text>
            <Text style={styles.gradeCol}>{course.grade}</Text>
            <Text style={styles.pointCol}>{course.point}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total Credits Earned:</Text>
          <Text style={styles.value}>{studentData.totalCredits}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Grade Point Average:</Text>
          <Text style={styles.value}>{studentData.gpa}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Cumulative Grade Point Average:</Text>
          <Text style={styles.value}>{studentData.cgpa}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.value, { fontSize: 8 }]}>
          RA - Reappearance is Required, W - Withdrawal, SE - Special Entry, AB - Absent for End Semester Examination
        </Text>
        <View style={styles.signature}>
          <Text style={styles.value}>Date: {format(new Date(), 'dd-MMM-yy')}</Text>
          <Text style={styles.value}>Controller of Examinations</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Download button component
const DownloadGradeSheet = ({ studentData }) => (
  <PDFDownloadLink
    document={<GradeSheetDocument studentData={studentData} />}
    fileName={`grade-sheet-${studentData.registerNumber}.pdf`}
    style={{
      textDecoration: 'none',
      padding: '10px 20px',
      color: '#fff',
      backgroundColor: '#1a73e8',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    {({ blob, url, loading, error }) =>
      loading ? 'Generating PDF...' : 'Download Grade Sheet'
    }
  </PDFDownloadLink>
);

export default DownloadGradeSheet; 