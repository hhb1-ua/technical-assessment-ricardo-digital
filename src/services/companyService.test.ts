import { expect, test } from 'vitest';
import { Company } from '../types/Company';
import { createCompany, readCompanies, updateCompany, deleteCompany } from './companyService';

test('Read all companies', async () => {
  let response: Company[] | null;

  try {
    response = await readCompanies();
  } catch {
    response = null;
  }

  expect(response).not.toBeNull();
});

test('Create a company with correct data and delete it', async () => { 
  const company: Omit<Company, 'id'> = {
    cif: 'A0000000A',
    name: 'Correct Company',
    sector: 'Testing',
    address: '1 Fake Street'
  }

  let response: Company | null;

  try {
    response = await createCompany(company);
  } catch {
    response = null;
  }

  expect(response).not.toBeNull();

  expect(async () => await deleteCompany(response!)).not.toThrowError();
});

test('Update a company using incorrect data', async () => {
  const company: Company = {
    id: 1,
    cif: 'WRONG!',
    name: 'Incorrect Company',
    sector: 'Testing',
    address: '1 Fake Street'
  }

  let response: Company | null;

  try {
    response = await updateCompany(company);
  } catch {
    response = null;
  }

  expect(response).toBeNull();
});