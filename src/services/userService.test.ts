import { expect, test } from 'vitest';
import { User } from '../types/User';
import { createUser, readUsers, updateUser, deleteUser } from './userService';

test('Read all users', async () => {
  expect(async () => await readUsers()).not.toThrowError()
});

test('Create a user with correct data and delete it', async () => { 
  const user: Omit<User, 'id'> = {
    dni: '00000000A',
    name: 'Correct User',
    email: 'correct@email.com',
    birthday: '2000-01-01',
    company_id: 1
  }

  expect(async () => { 
    const response = await createUser(user);
    await deleteUser(response);
  }).not.toThrowError();
});

test('Update a user using incorrect data', async () => {
  const user: User = {
    id: 1,
    dni: '00000000A',
    name: 'Correct User',
    email: 'INCORRECT EMAIL',
    birthday: '2000-01-01',
    company_id: 1
  };

  await expect(
    async () => await updateUser(user)
  ).rejects.not.toBeNull()
});