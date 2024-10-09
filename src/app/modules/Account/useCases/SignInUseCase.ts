import { env } from '@/config/env';
import { InvalidCredentialsError } from '@/shared/errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AccountsRepository } from '../repositories/AccountsRepository';

interface ISignInUseCaseParams {
  email: string;
  password: string;
}

interface ISignInUseCaseOutput {
  accessToken: string;
}

export class SignInUseCase {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute({
    email,
    password,
  }: ISignInUseCaseParams): Promise<ISignInUseCaseOutput> {
    const account = await this.accountsRepository.findByEmail(email);

    if (!account) throw new InvalidCredentialsError();

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const accessToken = sign({ sub: account.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
