import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#1a237e',
    padding: 25,
    borderRadius: 15,
    position: 'relative',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 140, // Make space for overlapping photo
  },
  headerRight: {
    position: 'absolute',
    right: -15,
    top: -15,
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#E8EAF6',
    marginTop: 8,
  },
  photoContainer: {
    width: 150,
    height: 150,
    position: 'relative',
  },
  photoFrame: {
    width: 140,
    height: 140,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 70,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  photoBackground: {
    width: 150,
    height: 150,
    backgroundColor: '#4CAF50',
    borderRadius: 75,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  studentImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  studentInfoContainer: {
    backgroundColor: '#F5F5F7',
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#1a237e',
  },
  studentDetails: {
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 10,
  },
  rollNo: {
    fontSize: 16,
    color: '#455a64',
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 6,
    width: 'auto',
    alignSelf: 'flex-start',
  },
  metricsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metric: {
    width: '23%',
    padding: 15,
    backgroundColor: '#F5F5F7',
    margin: 5,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1a237e',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a237e',
  },
  metricLabel: {
    fontSize: 12,
    color: '#455a64',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  subjectsSection: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  subjectName: {
    flex: 1,
    fontSize: 14,
    color: '#37474f',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: 150,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginRight: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  subjectScore: {
    width: 50,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  performanceSection: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#E8EAF6',
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  statusText: {
    fontSize: 15,
    marginBottom: 8,
    color: '#455a64',
  },
  signatureSection: {
    marginTop: 30,
    marginBottom: 50,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signatureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  signatureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  signatureBox: {
    width: '45%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a237e',
    marginBottom: 8,
    paddingBottom: 30,
  },
  signatureLabel: {
    fontSize: 12,
    color: '#455a64',
    textAlign: 'center',
    marginTop: 5,
  },
  signatureDate: {
    fontSize: 10,
    color: '#78909c',
    textAlign: 'right',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#78909c',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
});

const getProgressBarColor = (score) => {
  if (score >= 90) return '#4CAF50';
  if (score >= 75) return '#2196F3';
  if (score >= 60) return '#FFC107';
  return '#f44336';
};

const StudentReportPDF = ({ report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Photo */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Student Progress Report</Text>
          <Text style={styles.subtitle}>Academic Year 2023-2024</Text>
          <Text style={[styles.subtitle, { marginTop: 4 }]}>Department of Computer Science</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.photoContainer}>
            <View style={styles.photoBackground} />
            <View style={styles.photoFrame}>
              <Image style={styles.studentImage} src={report.image} />
            </View>
          </View>
        </View>
      </View>

      {/* Student Information */}
      <View style={styles.studentInfoContainer}>
        <View style={styles.studentDetails}>
          <Text style={styles.name}>{report.name}</Text>
          <Text style={styles.rollNo}>Roll No: {report.rollNo}</Text>
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricsHeader}>
          <Text style={styles.sectionTitle}>Academic Performance Metrics</Text>
        </View>
        <View style={styles.metricsGrid}>
          <View style={[styles.metric, { borderLeftColor: '#2E7D32' }]}>
            <Text style={[styles.metricValue, { color: '#2E7D32' }]}>{report.cgpa}</Text>
            <Text style={styles.metricLabel}>CGPA</Text>
          </View>
          <View style={[styles.metric, { borderLeftColor: '#1565C0' }]}>
            <Text style={[styles.metricValue, { color: '#1565C0' }]}>{report.attendance}%</Text>
            <Text style={styles.metricLabel}>Attendance</Text>
          </View>
          <View style={[styles.metric, { borderLeftColor: '#E65100' }]}>
            <Text style={[styles.metricValue, { color: '#E65100' }]}>{report.assignments}%</Text>
            <Text style={styles.metricLabel}>Assignments</Text>
          </View>
          <View style={[styles.metric, { borderLeftColor: '#7B1FA2' }]}>
            <Text style={[styles.metricValue, { color: '#7B1FA2' }]}>{report.internals}%</Text>
            <Text style={styles.metricLabel}>Internals</Text>
          </View>
        </View>
      </View>

      {/* Subject Performance */}
      <View style={styles.subjectsSection}>
        <Text style={styles.sectionTitle}>Subject Performance Analysis</Text>
        {Object.entries(report.subjects).map(([subject, score]) => (
          <View style={styles.subjectRow} key={subject}>
            <Text style={styles.subjectName}>{subject}</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${score}%`,
                    backgroundColor: getProgressBarColor(score)
                  }
                ]} 
              />
            </View>
            <Text style={styles.subjectScore}>{score}%</Text>
          </View>
        ))}
      </View>

      {/* Performance Overview */}
      <View style={styles.performanceSection}>
        <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>Performance Overview</Text>
        <Text style={styles.statusText}>Overall Status: {report.status}</Text>
        <Text style={[
          styles.statusText,
          { color: report.improvement.startsWith('+') ? '#4CAF50' : '#f44336', fontWeight: 'bold' }
        ]}>
          Performance Trend: {report.improvement}
        </Text>
      </View>

      {/* Signature Section */}
      <View style={styles.signatureSection}>
        <Text style={styles.signatureTitle}>Verification & Approval</Text>
        <View style={styles.signatureGrid}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Class Incharge</Text>
            <Text style={styles.signatureDate}>Date: _____________</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Head of Department</Text>
            <Text style={styles.signatureDate}>Date: _____________</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Parent/Guardian</Text>
            <Text style={styles.signatureDate}>Date: _____________</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Mentor</Text>
            <Text style={styles.signatureDate}>Date: _____________</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} | Department of Computer Science | This report is computer generated and requires physical signatures
      </Text>
    </Page>
  </Document>
);

export default StudentReportPDF; 