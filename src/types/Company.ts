export interface Company {
  id: number;
  cif: string;
  name: string;
  sector: string;
  address: string;
  associated_users?: number[];
}
