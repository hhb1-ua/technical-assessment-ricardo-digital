import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const users = [
  {"id": 1, "name": "Hugo", "color": "blue"},
  {"id": 2, "name": "Cloe", "color": "red"},
  {"id": 3, "name": "Carlos", "color": "orange"},
  {"id": 4, "name": "Javier", "color": "yellow"},
  {"id": 5, "name": "Sara", "color": "purple"}
];

function App() {
  return (
    <div className="flex">
      <DataTable value={users} className="align-middle">
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
        <Column field="color" header="Favorite color" />
      </DataTable>
    </div>
  );
}

export default App;