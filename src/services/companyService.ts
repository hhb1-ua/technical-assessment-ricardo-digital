import axios from 'axios';
import { z } from 'zod';
import { Company } from '../types/Company';

// CAMBIAR ESTO EN EL FUTURO
const HOST = 'http://localhost:3000';

const companySchema = z.object({
  cif: z.string().regex(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/),
  name: z.string(),
  sector: z.string(),
  address: z.string()
});

export const createCompany = async (company: Omit<Company, 'id'>): Promise<Company> => {
  companySchema.parse(company);

  /* 
    This should NOT be neccessary in an actual deployment with a proper API,
    as the IDs should be assigned by the server. Still, since I'm using json-server,
    I need to run this code to get the next ID and assign it to the Company object.
  */
  const nextId: number = (await readCompanies()).length + 1;

  return (await axios.post<Company>(`${HOST}/company`, {id: nextId, ...company})).data;
}

export const readCompanies = async (): Promise<Company[]> => {
  return (await axios.get<Company[]>(`${HOST}/company`)).data;
}

export const updateCompany = async (company: Company): Promise<Company> => {
  companySchema.parse(company);

  return (await axios.put<Company>(`${HOST}/company/${company.id}`, company)).data;
}

export const deleteCompany = async (company: Company): Promise<void> => {
  await axios.delete<Company>(`${HOST}/company/${company.id}`);
}