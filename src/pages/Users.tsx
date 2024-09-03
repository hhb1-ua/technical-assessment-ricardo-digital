import { ProgressSpinner } from "primereact/progressspinner";
import { UserInput } from "../components/UserInput";
import { UserList } from "../components/UserList";
import { useCompanies } from "../hooks/useCompanies";
import { useUsers } from "../hooks/useUsers"
import { Message } from "primereact/message";

export const Users = () => {
  const { users, loading, error, denied, addUser, modifyUser, removeUser } = useUsers();
  const { companies } = useCompanies();

  if (loading) return <ProgressSpinner />;

  if (error) return <Message severity="error" text={error} />;

  return (
    <div className="table-container">
      <UserInput companies={companies} addUser={addUser} modifyUser={modifyUser} />
      <div className="table-wrapper">
        <UserList users={users} removeUser={removeUser} />
      </div>
    </div>
  )
}