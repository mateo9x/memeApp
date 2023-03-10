export class Meme {
  id: number;
  title: string;
  photoUrl: string;
  dateCreated: Date;
  dateApproved?: Date;
  userId: number;
  userName: string;
  upVotes: number;
  approved?: boolean;
  tags?: string[];
}
