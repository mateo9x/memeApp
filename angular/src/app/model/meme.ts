export class Meme {
  id: number;
  title: string;
  photoUrl: string;
  dateCreated: Date;
  dateApproved?: Date;
  userId: number;
  userName: string;
  userPhotoUrl: string;
  upVotes: number;
  downVotes: number;
  approved?: boolean;
  tags?: string;
}
