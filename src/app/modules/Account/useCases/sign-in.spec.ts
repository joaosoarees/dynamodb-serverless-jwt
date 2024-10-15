import { ERole } from '@/shared/enums/role.enum';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credential.error';

import { InMemoryAccountsRepository } from '../repositories/in-memory/accounts.repository';
import { SignInUseCase } from './sign-in.usecase';
import { SignUpUseCase } from './sign-up.usecase';

let accountsRepositoryStub: InMemoryAccountsRepository;
let signInUseCaseStub: SignInUseCase;
let signUpUseCaseStub: SignUpUseCase;
const SALT = 10;

describe('SignInUseCase', () => {
  beforeEach(() => {
    accountsRepositoryStub = new InMemoryAccountsRepository();
    signInUseCaseStub = new SignInUseCase(accountsRepositoryStub);
    signUpUseCaseStub = new SignUpUseCase(SALT, accountsRepositoryStub);
  });

  it('should be able to login if valid params is provided', async () => {
    const account = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
      role: ERole.USER,
      type: 'Account',
    };

    await signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    const promise = signInUseCaseStub.execute({
      email: account.email,
      password: account.password,
    });

    await expect(promise).resolves.toHaveProperty('accessToken');
  });

  it('should throw if an invalid email is provided', async () => {
    const account = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
      role: ERole.USER,
      type: 'Account',
    };

    await signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    const promise = signInUseCaseStub.execute({
      email: 'invalid@email.com',
      password: account.password,
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should throw if an invalid password is provided', async () => {
    const account = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
      role: ERole.USER,
      type: 'Account',
    };

    await signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    const promise = signInUseCaseStub.execute({
      email: account.email,
      password: 'invalid-password',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
