import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Role, User } from '../../types/UserTypes';
import { sampleUserRecords } from '../../mocks/mocks';

const UserRecords: React.FC = () => {
  // TODO remove sample data and replace with actual fetch
  const [users, setUsers] = useState<User[]>(sampleUserRecords);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'balance', headerName: 'Balance', width: 150 },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 150,
      valueGetter: (params) => {
        const roles: Role[] = params.row.roles;
        return roles.map((role) => role.name).join(', ');
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    // TODO implement actual fetch and remove sample data
    setUsers(sampleUserRecords);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
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
  );
};

export default UserRecords;
