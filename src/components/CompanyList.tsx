import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCompanies } from '../hooks/useCompanies';

export const CompanyList = () => {
  const { companies, loading, error } = useCompanies();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DataTable value={companies}>
      <Column field="id" header="ID" />
      <Column field="cif" header="CIF" />
      <Column field="name" header="Name" />
      <Column field="sector" header="Sector" />
      <Column field="address" header="Address" />
    </DataTable>
  );
};
