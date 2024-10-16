import { ZodError } from 'zod';
import { InMemoryAccountsRepository } from '../repositories/in-memory/accounts.repository';
import { SignInUseCase } from '../useCases/sign-in.usecase';
import { SignUpUseCase } from '../useCases/sign-up.usecase';
import { SignInController } from './sign-in.controller';

let accountsRepositoryStub: InMemoryAccountsRepository;
let signUpUseCaseStub: SignUpUseCase;
let signInUseCaseStub: SignInUseCase;
let signInControllerStub: SignInController;
const SALT = 10;

describe('SignInController', () => {
  beforeEach(() => {
    accountsRepositoryStub = new InMemoryAccountsRepository();
    signInUseCaseStub = new SignInUseCase(accountsRepositoryStub);
    signUpUseCaseStub = new SignUpUseCase(SALT, accountsRepositoryStub);
    signInControllerStub = new SignInController(signInUseCaseStub);
  });

  it('should throw if invalid email is provided', async () => {
    const httpBody = {
      email: 'invalid-email',
      password: 'valid-password',
    };

    const httpResponse = signInControllerStub.handle({
      body: {
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if invalid password is provided', async () => {
    const httpBody = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: '1234567',
    };

    const httpResponse = signInControllerStub.handle({
      body: {
        name: httpBody.name,
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should return 200 and accessToken if valid data is provided', async () => {
    const httpBody = {
      email: 'valid@email.com',
      password: 'valid-password',
    };

    await signUpUseCaseStub.execute({
      email: httpBody.email,
      password: httpBody.password,
      name: 'Stub',
    });

    const httpResponse = await signInControllerStub.handle({
      body: {
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.data).toHaveProperty('accessToken');
  });
});
