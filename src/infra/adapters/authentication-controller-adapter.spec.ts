import { env } from '@/config/env';
import { ERole } from '@/shared/enums/role.enum';
import { UnauthorizedError } from '@/shared/errors/unauthorized.error';
import { verify } from 'jsonwebtoken';
import { AuthenticationControllerAdapter } from './authentication-controller.adapter';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

const mockController = jest.fn();

const makeSut = () => {
  const adapter = new AuthenticationControllerAdapter();
  return adapter.adapt(mockController);
};

describe('AuthenticationControllerAdapter', () => {
  let handler: ReturnType<AuthenticationControllerAdapter['adapt']>;

  beforeEach(() => {
    handler = makeSut();
  });

  it('should throw UnauthorizedError if the Authorization header is not present', async () => {
    await expect(handler({ headers: {} } as any)).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it('should throw UnauthorizedError if the authorization token is invalid', async () => {
    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const request = {
      headers: { authorization: 'Bearer invalidtoken' },
    };

    await expect(handler(request as any)).rejects.toThrow(UnauthorizedError);
  });

  it('should call the controller with correct parameters when the token is valid', async () => {
    const mockPayload = {
      sub: '123',
      role: ERole.USER,
    };
    (verify as jest.Mock).mockReturnValue(mockPayload);

    const request = {
      headers: { authorization: 'Bearer validtoken' },
      pathParameters: { id: '1' },
      body: { key: 'value' },
    };

    mockController.mockResolvedValue({
      statusCode: 200,
      data: { success: true },
    });

    const result = await handler(request as any);

    expect(verify).toHaveBeenCalledWith('validtoken', env.JWT_SECRET);
    expect(mockController).toHaveBeenCalledWith({
      ...request,
      metadata: {
        account: {
          id: '123',
          role: ERole.USER,
        },
      },
    });
    expect(result).toEqual({
      statusCode: 200,
      data: { success: true },
    });
  });
});
