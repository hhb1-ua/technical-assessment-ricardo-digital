import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { User } from '../types/User';

export interface UserListProps {
  users: User[];
  removeUser(user: User): void;
}

export const UserList = ({ users, removeUser }: UserListProps) => {
  const UserOptions = (user: User) => {
    return <Button icon="pi pi-trash" onClick={() => removeUser(user)} />;
  };

  return (
    <DataTable value={users}>
      <Column field="id" header="ID" />
      <Column field="dni" header="DNI" />
      <Column field="name" header="Full name" />
      <Column field="email" header="Email" />
      <Column field="birthday" header="Birthday" />
      <Column field="company_name" header="Company" />
      <Column body={UserOptions} />
    </DataTable>
  );
};
