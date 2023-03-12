export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  password2?: string;
  photoUrl: string;
  resetToken: string;
}
