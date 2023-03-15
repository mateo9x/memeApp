import {Component, OnInit} from '@angular/core';
import {Meme} from "../../../model/meme";
import {MemeService} from "../../../service/meme.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";

@Component({
  selector: '',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.scss']
})
export class MemeListComponent implements OnInit {

  memeList: Meme[] = [];
  userLogged: User;

  constructor(private memeService: MemeService, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe({
      next: (urlSegments) => {
        this.getUserLogged();
        if (urlSegments.length === 0) {
          this.getApprovedMemes();
        } else {
          const pendingMemes = urlSegments.find(urlSegment => urlSegment.path === 'pending');
          if (pendingMemes) {
            this.getPendingMemes();
          } else {
            const userMemes = urlSegments.find(urlSegment => urlSegment.path === 'user');
            if (userMemes) {
              const userId = JSON.parse(urlSegments[urlSegments.length - 1].path);
              this.getMemesForUser(userId);
            } else {
              const tag = urlSegments[urlSegments.length - 1].path;
              this.getMemesByTag(tag);
            }
          }
        }
      }
    });
  }

  getUserLogged() {
    this.userService.getUserLogged().subscribe({
      next: (response) => {
        this.userLogged = response;
      }
    });
  }

  getApprovedMemes() {
    this.memeService.getApprovedMemes().subscribe({
      next: (response) => {
        this.memeList = response;
      }
    });
  }

  getPendingMemes() {
    this.memeService.getPendingMemes().subscribe({
      next: (response) => {
        this.memeList = response;
      }
    });
  }

  getMemesForUser(userId: number) {
    this.memeService.getMemesForUser(userId).subscribe({
      next: (response) => {
        this.memeList = response;
      }
    });
  }

  getMemesByTag(tag: string) {
    this.memeService.getMemesByTag(tag).subscribe({
      next: (response) => {
        this.memeList = response;
      }
    });
  }
}
