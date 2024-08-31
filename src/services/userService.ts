import axios from 'axios';
import { z } from 'zod';
import { User } from '../types/User';

// CAMBIAR ESTO EN EL FUTURO
const HOST = 'http://localhost:3000';

const userSchema = z.object({
  dni: z.string().regex(/^(\d{8})([A-Z])$/),
  name: z.string(),
  email: z.string().email(),
  birthday: z.string().date(),
  company_id: z.number()
});

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  userSchema.parse(user);

  /* 
    This should NOT be neccessary in an actual deployment with a proper API,
    as the IDs should be assigned by the server. Still, since I'm using json-server,
    I need to run this code to get the next ID and assign it to the User object.
  */
  const nextId: number = (await readUsers()).length + 1;

  return (await axios.post<User>(`${HOST}/user`, {id: nextId, ...user})).data;
}

export const readUsers = async (): Promise<User[]> => {
  return (await axios.get<User[]>(`${HOST}/user`)).data;
}

export const updateUser = async (user: User): Promise<User> => {
  userSchema.parse(user);

  return (await axios.put<User>(`${HOST}/user/${user.id}`, user)).data;
}

export const deleteUser = async (user: User): Promise<void> => {
  await axios.delete<User>(`${HOST}/user/${user.id}`);
}