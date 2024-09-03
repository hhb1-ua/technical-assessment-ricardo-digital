import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import { readUsers } from '../services/userService';
import { readCompanies } from '../services/companyService';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const listedCompanies: Company[] = await readCompanies();
        const listedUsers: User[] = await readUsers();

        const mappedData: Company[] = listedCompanies.map((company) => {
          // Find the user id's of those whose who are associated
          company.associated_users = listedUsers
            .filter((user) => company.id == user.company_id)
            .map((user) => user.id);

          return company;
        });

        setCompanies(mappedData);
      } catch {
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};
