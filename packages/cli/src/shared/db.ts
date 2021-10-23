import { createClient } from '@supabase/supabase-js';

import { env } from './env';
import { createLogger } from './logger';
import { CreateUserDTO, Role, User } from './models';

const logger = createLogger('DB Utils');

const USERS_TABLE_NAME = 'users';

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export const getUsersByRole = async (role: Role) => {
  logger.debug(`Fetching users with the ${role} role`);

  const { data, error } = await supabase.from<User>(USERS_TABLE_NAME).select().eq('role', role);

  if (!data || error) {
    throw new Error(error ? error.message : `Unknown error ocurred when getting users from the database`);
  }

  logger.debug(`Users with the ${role} role fetched successfully`, data);

  return data;
};

export const insertUsers = async (users: CreateUserDTO[]) => {
  logger.debug(`Inserting provided users to the ${USERS_TABLE_NAME} table`, users);

  const { error } = await supabase.from<User>(USERS_TABLE_NAME).insert(users);

  if (error) {
    throw new Error(error.message);
  }

  logger.debug(`Users inserted to the ${USERS_TABLE_NAME} table`);
};

export const updateUserById = async (id: User['id'], data: Partial<Omit<User, 'id' | 'password'>>) => {
  logger.debug(`Updating user with id ${id} using the provided data`, data);

  const { error } = await supabase.from<User>(USERS_TABLE_NAME).update(data).match({ id });

  if (error) {
    throw new Error(error.message);
  }

  logger.debug(`User with id ${id} updated successfully`);
};
