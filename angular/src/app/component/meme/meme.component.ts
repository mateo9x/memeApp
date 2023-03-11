import {Component, Input} from '@angular/core';
import {Meme} from "../../model/meme";
import {MemeService} from "../../service/meme.service";
import {User} from "../../model/user";

@Component({
  selector: 'meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent {

  @Input()
  meme: Meme;
  @Input()
  user: User;

  defaultUserUrl = '/assets/profile-not-found.png';

  constructor(private memeService: MemeService) {
  }

  updateMemeUpVote() {
    this.meme.upVotes = this.meme.upVotes + 1;
    this.memeService.updateMeme(this.meme).subscribe({});
  }

  updateMemeDownVote() {
    this.meme.downVotes = this.meme.downVotes + 1;
    this.memeService.updateMeme(this.meme).subscribe({});
  }

  calcTimeSinceMemCreated() {
    const diff = new Date().getTime() - new Date(this.meme.dateCreated).getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    if (days === 0) {
      return 'dziś';
    } else if (days === 1) {
      return days + ' dzień temu';
    }
    return days + ' dni temu';
  }

  getMemeTags() {
    if (this.meme.tags) {
      return this.meme.tags.split(',');
    }
    return [];
  }

  getUserAvatar() {
    if (this.meme && this.meme.userPhotoUrl) {
      return this.meme.userPhotoUrl;
    }
    return this.defaultUserUrl;
  }

}
