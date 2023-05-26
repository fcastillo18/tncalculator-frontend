import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ContainerLayout from '../../components/Layouts/ContainerLayout';
import { Typography } from '@mui/material';

type Record = {
  id: number;
  operation: string;
  user: string;
  amount: number;
  operationResponse: string;
  date: Date;
  isDeleted: boolean;
};

const sampleRecords: Record[] = [
  {
    id: 1,
    operation: 'ADDITION',
    user: 'Franklin',
    amount: 50,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 2,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 3,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 4,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 5,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 6,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
];

async function fetchRecords(): Promise<Record[]> {
  // TODO Call  API and return the records.
  return sampleRecords;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'operation', headerName: 'Operation', width: 150 },
  { field: 'user', headerName: 'User', width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 110 },
  { field: 'operationResponse', headerName: 'Operation Response', width: 200 },
  { field: 'date', headerName: 'Date', type: 'dateTime', width: 200 },
  { field: 'isDeleted', headerName: 'Is Deleted', type: 'boolean', width: 130 },
];

const OperationsRecords: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetchRecords().then((data) => setRecords(data));
  }, []);

  return (
    <ContainerLayout>
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 6 }}>
        List of operation records
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={records}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </div>
    </ContainerLayout>
  );
};

export default OperationsRecords;
