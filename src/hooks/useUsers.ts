import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import { readUsers } from '../services/userService';

export const useUsers = () => {
  // This adds a 'company_name' property to the User interface
  type ExtendedUser = User & {company_name?: string};

  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(await readUsers());
        setCompanies(await readCompanies());
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
