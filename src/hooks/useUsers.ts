import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Company } from '../types/Company';
import {
  createUser,
  deleteUser,
  readUsers,
  updateUser,
} from '../services/userService';
import { readCompanies } from '../services/companyService';
import { ZodError } from 'zod';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const listedUsers: User[] = await readUsers();
      const listedCompanies: Company[] = await readCompanies();

      const mappedData: User[] = listedUsers.map((user) => {
        // Find the company whose id matches the user's company_id
        user.company_name =
          listedCompanies.find((company) => company.id == user.company_id)
            ?.name ?? 'Unknown';

        return user;
      });

      setUsers(mappedData);
    } catch {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: Omit<User, 'id'>) => {
    try {
      await createUser(newUser);
    } catch (e) {
      if (e instanceof ZodError) {
        setDenied(e.issues[0].message); 
      } else {
        setError('Failed to connect to server');
      }
    } finally {
      await fetchUsers();
    }
  };

  const modifyUser = async (modifiedUser: User) => {
    try {
      await updateUser(modifiedUser);
    } catch (e) {
      if (e instanceof ZodError) {
        setDenied(e.issues[0].message);
      } else {
        setError('Failed to connect to server');
      }
    } finally {
      await fetchUsers();
    }
  };

  const removeUser = async (deletedUser: User) => {
    try {
      await deleteUser(deletedUser);
    } catch {
      setError('Failed to connect to server');
    } finally {
      await fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    denied,
    addUser,
    fetchUsers,
    modifyUser,
    removeUser,
    setDenied
  };
};
