import { AccountAlreadyExistsError } from '@/shared/errors/account-already-exists.error';
import { InMemoryAccountsRepository } from '../repositories/in-memory/accounts.repository';
import { SignUpUseCase } from './sign-up.usecase';

let accountsRepositoryStub: InMemoryAccountsRepository;
let signUpUseCaseStub: SignUpUseCase;
const SALT = 10;

describe('SignUpUseCase', () => {
  beforeEach(() => {
    accountsRepositoryStub = new InMemoryAccountsRepository();
    signUpUseCaseStub = new SignUpUseCase(SALT, accountsRepositoryStub);
  });

  it('should be able to create an account if value params is provided', async () => {
    const account = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
    };

    const promise = signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    await expect(promise).resolves.not.toThrow();
  });

  it('should throw if account already exists', async () => {
    const account = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
    };

    await signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    const promise = signUpUseCaseStub.execute({
      name: account.name,
      email: account.email,
      password: account.password,
    });

    await expect(promise).rejects.toBeInstanceOf(AccountAlreadyExistsError);
  });
});
