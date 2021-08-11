import {UserId} from "../../shared/user-id";

export interface Users{
  findUserById(userId: UserId): Promise<{fullName: string} | undefined>
}
