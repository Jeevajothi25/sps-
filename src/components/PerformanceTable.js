import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #1a237e;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const PerformanceTable = ({ data }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Subject Names</Th>
          <Th>Model 01</Th>
          <Th>Model 02</Th>
          <Th>Model 03</Th>
        </Tr>
      </thead>
      <tbody>
        {data.map((subject, index) => (
          <Tr key={index}>
            <Td>{subject.name}</Td>
            <Td>{subject.model01}</Td>
            <Td>{subject.model02}</Td>
            <Td>{subject.model03}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PerformanceTable; 