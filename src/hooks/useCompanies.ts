import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import { readUsers } from '../services/userService';
import { readCompanies } from '../services/companyService';

export const useCompanies = () => {
  // This adds a list of associated users to the Company interface
  type ExtendedCompany = Company & {associated_users?: User[]};

  const [companies, setCompanies] = useState<ExtendedCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const listedCompanies: ExtendedCompany[] = await readCompanies();
        const listedUsers: User[] = await readUsers();

        const mappedData: ExtendedCompany[] = listedCompanies.map(company => {
          // Find the user names of those whose who are associated
          company.associated_users = listedUsers.filter(user =>
            company.id == user.company_id
          );

          return company;
        });

        setCompanies(mappedData);
      } catch (error) {
        setError(`Failed to fetch data, ${error}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCompanies();
  }, []);

  return {companies, loading, error};
}
