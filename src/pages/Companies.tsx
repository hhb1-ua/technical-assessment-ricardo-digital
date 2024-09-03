import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useCompanies } from "../hooks/useCompanies";
import { useUsers } from "../hooks/useUsers"
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { CompanyList } from "../components/CompanyList";
import { CompanyInput } from "../components/CompanyInput";

export const Companies = () => {
  const { companies, loading, error, denied, addCompany, modifyCompany, removeCompany, setDenied } = useCompanies();
  const { users } = useUsers();

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
        <CompanyInput users={users} addCompany={addCompany} modifyCompany={modifyCompany} onSubmit={onSubmit} />
        <div className="table-wrapper">
          <CompanyList companies={companies} removeCompany={removeCompany} />
        </div>
      </div>
    </>
  );
}