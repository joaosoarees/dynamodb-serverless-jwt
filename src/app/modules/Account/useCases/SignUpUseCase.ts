import { AccountAlreadyExists } from '@/shared/errors/AccountAlreadyExists';
import { hash } from 'bcryptjs';
import { AccountsRepository } from '../repositories/AccountsRepository';

interface ISignUpUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  constructor(
    private readonly salt: number,
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ISignUpUseCaseParams): Promise<void> {
    const accountAlreadyExists =
      await this.accountsRepository.findByEmail(email);

    if (accountAlreadyExists) throw new AccountAlreadyExists();

    const hashedPassword = await hash(password, this.salt);

    await this.accountsRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
