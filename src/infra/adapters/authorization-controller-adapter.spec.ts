import { ERole } from '@/shared/enums/role.enum';
import { AccessDeniedError } from '@/shared/errors/access-denied.error';
import { AuthorizationControllerAdapter } from './authorization-controller.adapter';

const mockController = jest.fn();

const makeSut = (allowedRoles: ERole[]) => {
  const adapter = new AuthorizationControllerAdapter(allowedRoles);
  return adapter.adapt(mockController);
};

describe('AuthorizationControllerAdapter', () => {
  let handler: ReturnType<AuthorizationControllerAdapter['adapt']>;

  beforeEach(() => {
    mockController.mockClear();
  });

  it('should throw AccessDeniedError if account metadata is missing', async () => {
    handler = makeSut([ERole.ADMIN]);

    const request = {
      metadata: {},
    };

    await expect(handler(request as any)).rejects.toThrow(AccessDeniedError);
  });

  it('should throw AccessDeniedError if account role is not allowed', async () => {
    handler = makeSut([ERole.ADMIN]);

    const request = {
      metadata: {
        account: {
          id: '123',
          role: ERole.USER,
        },
      },
    };

    await expect(handler(request as any)).rejects.toThrow(AccessDeniedError);
  });

  it('should call controller with the correct parameters when role is allowed', async () => {
    handler = makeSut([ERole.ADMIN]);

    const request = {
      metadata: {
        account: {
          id: '123',
          role: ERole.ADMIN,
        },
      },
      pathParameters: { id: '1' },
      body: { key: 'value' },
    };

    mockController.mockResolvedValue({
      statusCode: 200,
      data: { success: true },
    });

    const result = await handler(request as any);

    expect(mockController).toHaveBeenCalledWith({
      account: { id: '123', role: ERole.ADMIN },
      pathParameters: { id: '1' },
      body: request.body,
    });

    expect(result).toEqual({
      statusCode: 200,
      data: { success: true },
    });
  });
});
