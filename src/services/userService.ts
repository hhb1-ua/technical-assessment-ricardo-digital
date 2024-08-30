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

  return (await axios.post<User>(`${HOST}/users`, user)).data;
}

export const readUsers = async (): Promise<User[]> => {
  return (await axios.get<User[]>(`${HOST}/users`)).data;
}

export const updateUser = async (user: User): Promise<User> => {
  userSchema.parse(user);

  return (await axios.put<User>(`${HOST}/user/${user.id}`, user)).data;
}

export const deleteUser = async (user: User): Promise<User> => {
  return (await axios.delete<User>(`${HOST}/user/${user.id}`)).data;
}