import axios from 'axios';
import { z } from 'zod';
import { Company } from '../types/Company';

const ENDPOINT = import.meta.env.VITE_ENDPOINT + '/company';

export const companySchema = z.object({
  id: z.number().positive({ message: 'Must have a positive ID' }).optional(),
  cif: z.string().regex(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/, {
    message: 'Must be a valid CIF',
  }),
  name: z.string(),
  sector: z.string(),
  address: z.string(),
});

export const createCompany = async (
  company: Omit<Company, 'id'>
): Promise<Company> => {
  companySchema.parse(company);

  /* 
    This should NOT be neccessary in an actual deployment with a proper API,
    as the IDs should be assigned by the server. Still, since I'm using json-server,
    I need to run this code to get the next ID and assign it to the Company object.
  */
  const lastCompany: Company | undefined = (await readCompanies()).pop();
  const nextId: number = lastCompany ? lastCompany.id + 1 : 1;

  return (await axios.post<Company>(ENDPOINT, { id: nextId, ...company })).data;
};

export const readCompanies = async (): Promise<Company[]> => {
  return (await axios.get<Company[]>(ENDPOINT)).data;
};

export const readCompany = async (company: Company): Promise<Company> => {
  return (await axios.get<Company>(`${ENDPOINT}/${company.id}`)).data;
};

export const updateCompany = async (company: Company): Promise<Company> => {
  companySchema.parse(company);

  return (await axios.put<Company>(`${ENDPOINT}/${company.id}`, company)).data;
};

export const deleteCompany = async (company: Company): Promise<void> => {
  await axios.delete<Company>(`${ENDPOINT}/${company.id}`);
};
