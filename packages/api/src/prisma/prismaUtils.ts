import { ResourceNotFoundException } from '@/common/exceptions';

export const rejectOnNotFound = (err: Error) => new ResourceNotFoundException(err.message);
