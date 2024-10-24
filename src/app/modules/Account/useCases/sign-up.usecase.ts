import { hash } from 'bcryptjs';

import { ERole } from '@/shared/enums/role.enum';
import { AccountAlreadyExistsError } from '@/shared/errors/account-already-exists.error';

import { IAccountsRepository } from '../protocols/accounts-repository.protocol';

interface ISignUpUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  constructor(
    private readonly salt: number,
    private readonly accountsRepository: IAccountsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ISignUpUseCaseParams): Promise<void> {
    const accountAlreadyExists =
      await this.accountsRepository.findByEmail(email);

    if (accountAlreadyExists) throw new AccountAlreadyExistsError();

    const hashedPassword = await hash(password, this.salt);

    await this.accountsRepository.create({
      name,
      email,
      password: hashedPassword,
      role: ERole.USER,
      type: 'Account',
    });
  }
}
