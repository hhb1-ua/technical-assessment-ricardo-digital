import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUsers } from '../hooks/useUsers';

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
      <Column field="company_name" header="Company" />
    </DataTable>
  );
}