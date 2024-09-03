import { expect, test } from 'vitest';
import { Company } from '../types/Company';
import {
  createCompany,
  readCompanies,
  updateCompany,
  deleteCompany,
} from './companyService';

test('Read all companies', async () => {
  expect(async () => await readCompanies).not.toThrowError();
});

test('Create a company with correct data and delete it', async () => {
  const company: Omit<Company, 'id'> = {
    cif: 'A0000000A',
    name: 'Correct Company',
    sector: 'Testing',
    address: '1 Fake Street',
  };

  expect(async () => {
    const response = await createCompany(company);
    await deleteCompany(response);
  }).not.toThrowError();
});

test('Update a company using incorrect data', async () => {
  const company: Company = {
    id: 1,
    cif: 'WRONG!',
    name: 'Incorrect Company',
    sector: 'Testing',
    address: '1 Fake Street',
  };

  await expect(async () => await updateCompany(company)).rejects.not.toBeNull();
});
