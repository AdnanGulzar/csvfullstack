import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Data {
  id: number;
  name: string;
  contact: string;
}

function DataDisplay() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:3000/api/getall')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => alert("error"));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Data Table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row?.id}>
              <TableCell>{row?.id}</TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataDisplay;
