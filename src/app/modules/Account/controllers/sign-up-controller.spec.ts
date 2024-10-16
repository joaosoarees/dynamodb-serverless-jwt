import { ZodError } from 'zod';
import { InMemoryAccountsRepository } from '../repositories/in-memory/accounts.repository';
import { SignUpUseCase } from '../useCases/sign-up.usecase';
import { SignUpController } from './sign-up.controller';

let accountsRepositoryStub: InMemoryAccountsRepository;
let signUpUseCaseStub: SignUpUseCase;
let signUpControllerStub: SignUpController;
const SALT = 10;

describe('SignUpController', () => {
  beforeEach(() => {
    accountsRepositoryStub = new InMemoryAccountsRepository();
    signUpUseCaseStub = new SignUpUseCase(SALT, accountsRepositoryStub);
    signUpControllerStub = new SignUpController(signUpUseCaseStub);
  });

  it('should throw if invalid name is provided', async () => {
    const httpBody = {
      email: 'valid@email.com',
      name: '',
      password: '12345678',
    };

    const httpResponse = signUpControllerStub.handle({
      body: {
        name: httpBody.name,
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if invalid email is provided', async () => {
    const httpBody = {
      email: 'invalid-email',
      name: 'valid-name',
      password: 'valid-password',
    };

    const httpResponse = signUpControllerStub.handle({
      body: {
        name: httpBody.name,
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

    const httpResponse = signUpControllerStub.handle({
      body: {
        name: httpBody.name,
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should return 201 if valid data is provided', async () => {
    const httpBody = {
      email: 'valid@email.com',
      name: 'valid-name',
      password: 'valid-password',
    };

    const httpResponse = await signUpControllerStub.handle({
      body: {
        name: httpBody.name,
        email: httpBody.email,
        password: httpBody.password,
      },
    });

    expect(httpResponse.statusCode).toBe(201);
  });
});
