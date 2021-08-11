import {UserId} from "../../shared/user-id";

export interface UsersFullNames {
  findUserById(userId: UserId): Promise<{fullName: string} | undefined>
}
