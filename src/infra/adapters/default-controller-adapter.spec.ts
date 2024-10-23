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

  it('should return statusCode 200 and success property if controller resolves', async () => {
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

  it('should return statusCode 409 when AccountAlreadyExistsError throws', async () => {
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

  it('should return statusCode 401 when InvalidCredentialsError throws', async () => {
    mockController.mockRejectedValue(
      new InvalidCredentialsError('Invalid credentials'),
    );

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(401, new InvalidCredentialsError('Invalid credentials')),
    );
  });

  it('should return statusCode 401 when UnauthorizedError throws', async () => {
    mockController.mockRejectedValue(new UnauthorizedError('Unauthorized'));

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(401, new UnauthorizedError('Unauthorized')),
    );
  });

  it('should return statusCode 403 when AccessDeniedError throws', async () => {
    mockController.mockRejectedValue(new AccessDeniedError('Access denied'));

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(403, new AccessDeniedError('Access denied')),
    );
  });

  it('should return statusCode 400 when ZodError throws', async () => {
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

  it('should return statusCode 500 when unknow error throws', async () => {
    mockController.mockRejectedValue(new Error('Unexpected error'));

    const result = await handler({} as any);

    expect(result).toEqual(
      httpResponse(500, { message: 'Internal Server Error' }),
    );
  });
});
