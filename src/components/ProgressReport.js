import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DownloadGradeSheet from './GradeSheetPDF';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const GradeSheet = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const StudentInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const Label = styled.span`
  color: #666;
  min-width: 150px;
`;

const Value = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  color: #495057;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
`;

const SummaryItem = styled.div`
  text-align: center;

  h3 {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ProgressReport = () => {
  const [studentData, setStudentData] = useState({
    registerNumber: '911121104035',
    fileNo: '263004',
    name: 'JEEVAJOTHI M',
    gender: 'FEMALE',
    dob: '2005-12-05',
    examDate: 'NOV / DEC 2024',
    programme: 'B.E. COMPUTER SCIENCE AND ENGINEERING',
    regulations: '2021',
    photo: '/student-photo.jpg',
    courses: [
      {
        semester: '03',
        code: '21EC201',
        title: 'Digital Principles and System Design',
        credit: '3',
        grade: 'A+',
        point: '9'
      },
      {
        semester: '03',
        code: '21MA203',
        title: 'Discrete Mathematics',
        credit: '4',
        grade: 'A+',
        point: '8'
      },
      {
        semester: '03',
        code: '21CS201',
        title: 'Computer Organization and Architecture',
        credit: '3',
        grade: 'A',
        point: '8'
      },
      {
        semester: '03',
        code: '21CS202',
        title: 'Data Structures',
        credit: '3',
        grade: 'A',
        point: '8'
      },
      {
        semester: '03',
        code: '21CS203',
        title: 'Object Oriented Programming',
        credit: '3',
        grade: 'A+',
        point: '9'
      },
      {
        semester: '03',
        code: '21EC212',
        title: 'Digital Systems Laboratory',
        credit: '2',
        grade: 'O',
        point: '10'
      },
      {
        semester: '03',
        code: '21CS204',
        title: 'Data Structures Laboratory',
        credit: '2',
        grade: 'O',
        point: '10'
      },
      {
        semester: '03',
        code: '21CS205',
        title: 'Object Oriented Programming Laboratory',
        credit: '2',
        grade: 'O',
        point: '10'
      }
    ],
    totalCredits: '70',
    gpa: '9.00',
    cgpa: '8.64'
  });

  return (
    <Container>
      <Header>
        <Title>Progress Report</Title>
        <DownloadGradeSheet studentData={studentData} />
      </Header>

      <GradeSheet>
        <StudentInfo>
          <InfoItem>
            <Label>Register Number:</Label>
            <Value>{studentData.registerNumber}</Value>
          </InfoItem>
          <InfoItem>
            <Label>File No:</Label>
            <Value>{studentData.fileNo}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Name:</Label>
            <Value>{studentData.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Gender:</Label>
            <Value>{studentData.gender}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Date of Birth:</Label>
            <Value>{new Date(studentData.dob).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Exam Date:</Label>
            <Value>{studentData.examDate}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Programme:</Label>
            <Value>{studentData.programme}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Regulations:</Label>
            <Value>{studentData.regulations}</Value>
          </InfoItem>
        </StudentInfo>

        <Table>
          <thead>
            <tr>
              <Th>Sem</Th>
              <Th>Course Code</Th>
              <Th>Course Title</Th>
              <Th>Credit</Th>
              <Th>Letter Grade</Th>
              <Th>Grade Point</Th>
            </tr>
          </thead>
          <tbody>
            {studentData.courses.map((course, index) => (
              <tr key={index}>
                <Td>{course.semester}</Td>
                <Td>{course.code}</Td>
                <Td>{course.title}</Td>
                <Td>{course.credit}</Td>
                <Td>{course.grade}</Td>
                <Td>{course.point}</Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Summary>
          <SummaryItem>
            <h3>Total Credits Earned</h3>
            <p>{studentData.totalCredits}</p>
          </SummaryItem>
          <SummaryItem>
            <h3>Grade Point Average</h3>
            <p>{studentData.gpa}</p>
          </SummaryItem>
          <SummaryItem>
            <h3>Cumulative Grade Point Average</h3>
            <p>{studentData.cgpa}</p>
          </SummaryItem>
        </Summary>
      </GradeSheet>
    </Container>
  );
};

export default ProgressReport; 