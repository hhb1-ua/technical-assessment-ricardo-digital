import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useCompanies } from "../hooks/useCompanies";
import { useUsers } from "../hooks/useUsers"
import { UserInput } from "../components/UserInput";
import { UserList } from "../components/UserList";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const Users = () => {
  const { users, loading, error, denied, addUser, modifyUser, removeUser, setDenied } = useUsers();
  const { companies } = useCompanies();
  
  const toast = useRef(null);

  if (loading) return <ProgressSpinner />;

  if (error) return <Message severity="error" text={error} />;  

  const onSubmit = () => {
    if (denied) {
      toast.current.show({
        summary: 'Validation error',
        detail: denied,
        life: 3000
      });
      setDenied(null);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="table-container">
        <UserInput companies={companies} addUser={addUser} modifyUser={modifyUser} onSubmit={onSubmit} />
        <div className="table-wrapper">
          <UserList users={users} removeUser={removeUser} />
        </div>
      </div>
    </>
  );
}