import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ContainerLayout from '../../components/Layouts/ContainerLayout';
import { Typography } from '@mui/material';
import { Operation, Record } from '../../types/RecordTypes';
import { useQuery } from '@tanstack/react-query';
import { fetchAllOperationRecords } from '../../api/api';
import { User } from '../../types/UserTypes';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'operation',
    headerName: 'Operation',
    width: 150,
    valueGetter: (params) => {
      const operation: Operation = params.row.operation;
      return operation.type;
    },
  },
  {
    field: 'user',
    headerName: 'User',
    width: 150,
    valueGetter: (params) => {
      const user: User = params.row.user;
      return user.username;
    },
  },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 110 },
  { field: 'date', headerName: 'Date', type: 'string', width: 200 },
  { field: 'operationResponse', headerName: 'Operation Response', width: 200 },
  { field: 'deleted', headerName: 'Is Deleted', type: 'string', width: 130 },
];

const OperationsRecords: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['operations'], // TODO refactor this and create constant
    queryFn: fetchAllOperationRecords,
  });

  useEffect(() => {
    if (!isLoading && data) {
      const recordsContent: Record[] = data.content;
      console.log('recordsContent:', recordsContent);
      setRecords(recordsContent);
    }
  }, [isLoading, data]);

  console.log('records:', records);
  return isLoading ? ( // TODO refactor this and create components for loading and error
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{`An error occurred: ${error}`}</h2>
  ) : (
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
