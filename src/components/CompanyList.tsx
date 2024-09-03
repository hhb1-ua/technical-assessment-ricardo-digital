import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Company } from '../types/Company';

export interface CompanyListProps {
  companies: Company[];
  removeCompany(company: Company): void;
}

export const CompanyList = ({ companies, removeCompany }: CompanyListProps) => {
  const CompanyOptions = (company: Company) => {
    return <Button icon="pi pi-trash" onClick={() => removeCompany(company)} />;
  };

  const CompanyMembers = (company: Company) => {
    return (
      <ul>
        {company.associated_usernames?.map((username) => <li>{username}</li>)}
      </ul>
    );
  };

  return (
    <DataTable value={companies}>
      <Column field="id" header="ID" />
      <Column field="cif" header="CIF" />
      <Column field="name" header="Name" />
      <Column field="sector" header="Sector" />
      <Column field="address" header="Address" />
      <Column body={CompanyMembers} header="Members" />
      <Column body={CompanyOptions} />
    </DataTable>
  );
};
