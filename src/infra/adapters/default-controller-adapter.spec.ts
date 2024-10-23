import { httpResponse } from '@/shared/utils/http-response';
import { ZodError } from 'zod';

import { AccessDeniedError } from '@/shared/errors/access-denied.error';
import { AccountAlreadyExistsError } from '@/shared/errors/account-already-exists.error';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credential.error';
import { UnauthorizedError } from '@/shared/errors/unauthorized.error';
import { DefaultControllerAdapter } from './default-controller.adapter';

const mockController = jest.fn();

const makeSut = () => {
  const adapter = new DefaultControllerAdapter();
  return adapter.adapt(mockController);
};

describe('DefaultControllerAdapter', () => {
  let handler: ReturnType<DefaultControllerAdapter['adapt']>;

  beforeEach(() => {
    handler = makeSut();
  });

  it('should return status code 200 with success property if the controller resolves successfully', async () => {
    mockController.mockResolvedValue({
      statusCode: 200,
      data: { success: true },
    });

    const result = await handler({
      pathParameters: { id: '1' },
      body: JSON.stringify({ key: 'value' }),
      queryStringParameters: { filter: 'name' },
      headers: {},
    } as any);

    expect(result).toEqual(httpResponse(200, { success: true }));
  });

  it('should return status code 409 when AccountAlreadyExistsError is thrown', async () => {
    mockController.mockRejectedValue(
      new AccountAlreadyExistsError('Account already exists'),
    );

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(
        409,
        new AccountAlreadyExistsError('Account already exists'),
      ),
    );
  });

  it('should return status code 401 when InvalidCredentialsError is thrown', async () => {
    mockController.mockRejectedValue(new InvalidCredentialsError());

    const result = await handler({} as any);

    expect(result).toEqual(httpResponse(401, new InvalidCredentialsError()));
  });

  it('should return status code 401 when UnauthorizedError is thrown', async () => {
    mockController.mockRejectedValue(new UnauthorizedError());

    const result = await handler({} as any);

    expect(result).toEqual(httpResponse(401, new UnauthorizedError()));
  });

  it('should return status code 403 when AccessDeniedError is thrown', async () => {
    mockController.mockRejectedValue(new AccessDeniedError());

    const result = await handler({} as any);

    expect(result).toEqual(httpResponse(403, new AccessDeniedError()));
  });

  it('should return status code 400 when ZodError is thrown', async () => {
    const zodError = new ZodError([]);
    mockController.mockRejectedValue(zodError);

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(400, {
        name: 'ValidationError',
        issues: zodError.issues,
      }),
    );
  });

  it('should return status code 500 when an unknown error is thrown', async () => {
    mockController.mockRejectedValue(new Error('Unexpected error'));

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(500, { message: 'Internal Server Error' }),
    );
  });
});
