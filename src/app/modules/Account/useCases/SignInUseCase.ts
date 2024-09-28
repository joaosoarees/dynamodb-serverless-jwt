export class SignInUseCase {
  async execute({ email, password }: { email: string; password: string }) {
    return { email, password };
  }
}
