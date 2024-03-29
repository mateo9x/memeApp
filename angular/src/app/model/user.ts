export class User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  password2?: string;
  photoUrl: string;
  resetToken: string;
  language: string;
  iconFile: any;
}
