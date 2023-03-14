import {Component, Input} from '@angular/core';
import {Meme} from "../../model/meme";
import {MemeService} from "../../service/meme.service";
import {User} from "../../model/user";
import {FileService} from "../../service/file.service";
import {LanguageService} from "../../service/language.service";

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

  constructor(private memeService: MemeService, private fileService: FileService, private languageService: LanguageService) {
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
      return this.languageService.getMessage('meme.today');
    } else if (days === 1) {
      return days + ' ' + this.languageService.getMessage('meme.dayAgo');
    }
    return days + ' ' + this.languageService.getMessage('meme.daysAgo');
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

  getMemePhoto() {
    return this.fileService.getFile(this.meme.file);
  }

}
