import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import { readUsers } from '../services/userService';
import { readCompanies } from '../services/companyService';

export const useUsers = () => {
  // This adds a 'company_name' property to the User interface
  type ExtendedUser = User & {associated_company?: Company};

  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const listedUsers: ExtendedUser[] = await readUsers();
        const listedCompanies: Company[] = await readCompanies();

        const mappedData: ExtendedUser[] = listedUsers.map(user => {
          // Find the company whose id matches the user's company_id
          user.associated_company = listedCompanies.find(company =>
            company.id == user.company_id
          );
          
          return user;
        });

        setUsers(mappedData);
      } catch (error) {
        setError(`Failed to fetch data, ${error}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);

  return {users, loading, error};
}
