import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import { readUsers } from '../services/userService';
import { createCompany, deleteCompany, readCompanies, updateCompany } from '../services/companyService';
import { ZodError } from 'zod';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      const listedCompanies: Company[] = await readCompanies();
      const listedUsers: User[] = await readUsers();

      const mappedData: Company[] = listedCompanies.map((company) => {
        // Find the user id's of those whose who are associated
        company.associated_users = listedUsers
          .filter((user) => company.id == user.company_id)
          .map((user) => user.id);
        
        company.associated_usernames = listedUsers
          .filter((user) => company.id == user.company_id)
          .map((user) => user.name);

        return company;
      });

      setCompanies(mappedData);
    } catch {
      setError('Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (newCompany: Omit<Company, 'id'>) => {
    try {
      await createCompany(newCompany);
    } catch (e) {
      if (e instanceof ZodError) {
        setDenied(e.issues[0].message); 
      } else {
        setError('Failed to connect to server');
      }
    } finally {
      await fetchCompanies();
    }
  }

  const modifyCompany = async (modifiedCompany: Company) => {
    try {
      await updateCompany(modifiedCompany);
    } catch (e) {
      if (e instanceof ZodError) {
        setDenied(e.issues[0].message);
      } else {
        setError('Failed to connect to server');
      }
    } finally {
      await fetchCompanies();
    }
  }

  const removeCompany = async (deletedCompany: Company) => {
    try {
      await deleteCompany(deletedCompany);
    } catch {
      setError('Failed to connect to server');
    } finally {
      await fetchCompanies();
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { 
    companies, 
    loading, 
    error,
    denied,
    addCompany, 
    fetchCompanies,
    modifyCompany,
    removeCompany,
    setDenied
  };
};
