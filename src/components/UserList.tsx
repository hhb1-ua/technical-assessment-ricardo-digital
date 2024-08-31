import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUsers } from '../hooks/useUsers';
import { Button } from 'primereact/button';
import { User } from '../types/User';
import { deleteUser } from '../services/userService';

export const DeleteUserButton = (user: User) => {
  return (
    <Button
      label='Delete'
      icon='pi pi-trash'
      className='p-button-danger'
      onClick={() => deleteUser(user)}
    />
  );
}

export const UserList = () => {
  const {users, loading, error} = useUsers();

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>{error}</p>
    );
  }

  return (
    <DataTable value={users}>
      <Column field="id" header="ID" />
      <Column field="dni" header="DNI" />
      <Column field="name" header="Full name" />
      <Column field="email" header="Email" />
      <Column field="birthday" header="Birthday" />
      <Column field="associated_company.name" header="Company" />
      <Column body={DeleteUserButton} header="Actions" />
    </DataTable>
  );
}