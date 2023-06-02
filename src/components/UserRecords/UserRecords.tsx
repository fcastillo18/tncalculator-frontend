import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Role, User } from '../../types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUserRecords } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const UserRecords: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUserRecords,
  });

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
    if (!isLoading && data) {
      const usersContent: User[] = data.content;
      setUsers(usersContent);
    }
  }, [isLoading, data]);

  if (!isLoading && error) {
    const errorContent = error as Error;
    if (errorContent.message.includes('401')) {
      navigate('/login', {
        state: {
          from: '/user',
          error: {
            code: 401,
            message: 'Unauthorized, you need to signin',
          },
        },
      });
    }
  }

  return isLoading ? ( // TODO refactor this and create components for loading and error
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{`An error occurred: ${error}`}</h2>
  ) : (
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
