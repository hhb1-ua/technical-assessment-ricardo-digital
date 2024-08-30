import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUsers } from '../hooks/useUsers';

export const UserList = () => {
  const {users, loading, error} = useUsers();

  if (loading) {
    return (
      <></>
    );
  }

  if (error) {
    return (
      <></>
    );
  }
  
  return (
    <DataTable value={users}>
      <Column field="id" header="" />
      <Column field="dni" header="" />
      <Column field="name" header="" />
      <Column field="email" header="" />
      <Column field="birthday" header="" />
      <Column field="company_name" header="" />
    </DataTable>
  );
}