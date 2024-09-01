import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUsers } from '../hooks/useUsers';
import { Button } from 'primereact/button';
import { User } from '../types/User';
import { deleteUser, updateUser } from '../services/userService';

export const UserOptions = (user: User) => {
  return (    
    <>
      <Button
        icon='pi pi-pencil'
        onClick={() => updateUser(user)}
      />
      <Button
        icon='pi pi-trash'
        onClick={() => deleteUser(user)}
      />
    </>
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
      <Column body={UserOptions} />
    </DataTable>
  );
}