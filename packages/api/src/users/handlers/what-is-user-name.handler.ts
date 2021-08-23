import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { WhatIsUserNameQuery } from '../../learning-materials/queries/what-is-user-name.query';
import { rejectOnNotFound } from '../../prisma/prismaUtils';
import { UsersRepository } from '../users.repository';

@QueryHandler(WhatIsUserNameQuery)
export class WhatIsUserNameHandler implements IInferredQueryHandler<WhatIsUserNameQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ payload }: WhatIsUserNameQuery) {
    const { fullName } = await this.usersRepository.findUnique({
      where: { id: payload.id },
      select: { fullName: true },
      rejectOnNotFound,
    });

    return fullName;
  }
}
