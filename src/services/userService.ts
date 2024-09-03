import axios from 'axios';
import { z } from 'zod';
import { User } from '../types/User';

const ENDPOINT = import.meta.env.VITE_ENDPOINT + '/user';

export const userSchema = z.object({
  id: z.number().positive({ message: 'Must have a positive ID' }).optional(),
  dni: z.string().regex(/^(\d{8})([A-Z])$/, { message: 'Must be a valid DNI' }),
  name: z.string(),
  email: z.string().email({ message: 'Must have a valid email address' }),
  birthday: z.string().date(),
  company_id: z.number(),
});

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  userSchema.parse(user);

  /* 
    This should NOT be neccessary in an actual deployment with a proper API,
    as the IDs should be assigned by the server. Still, since I'm using json-server,
    I need to run this code to get the next ID and assign it to the User object.
  */
  const lastUser: User | undefined = (await readUsers()).pop();
  const nextId: number = lastUser ? lastUser.id + 1 : 1;

  return (await axios.post<User>(ENDPOINT, { id: nextId, ...user })).data;
};

export const readUsers = async (): Promise<User[]> => {
  return (await axios.get<User[]>(ENDPOINT)).data;
};

export const readUser = async (user: User): Promise<User> => {
  return (await axios.get<User>(`${ENDPOINT}/${user.id}`)).data;
};

export const updateUser = async (user: User): Promise<User> => {
  userSchema.parse(user);

  return (await axios.put<User>(`${ENDPOINT}/${user.id}`, user)).data;
};

export const deleteUser = async (user: User): Promise<void> => {
  await axios.delete<User>(`${ENDPOINT}/${user.id}`);
};
