import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MemeService} from "../../../service/meme.service";
import {Meme} from "../../../model/meme";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'meme-detail',
  templateUrl: './meme-detail.component.html',
  styleUrls: ['./meme-detail.component.scss']
})
export class MemeDetailComponent implements OnInit {

  meme: Meme;
  userLogged: User;

  constructor(private activatedRoute: ActivatedRoute, private memeService: MemeService, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe({
      next: (urlSegment) => {
        if (urlSegment.length === 1) {
          this.getRandomMeme();
        } else {
          const memeId = urlSegment[urlSegment.length - 1].path;
          this.getMeme(memeId);
        }
        this.getUserLogged();
      }
    });
  }

  getRandomMeme() {
    this.memeService.getRandomMeme().subscribe({
      next: (response) => {
        this.meme = response;
      }
    });
  }

  getMeme(memeId: any) {
    this.memeService.getMemeById(memeId).subscribe({
      next: (response) => {
        this.meme = response;
      }
    });
  }

  getUserLogged() {
    this.userService.userLogged.subscribe({
      next: (response) => {
        this.userLogged = response;
      }
    });
  }

}
