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

  pageSelected = 1;
  totalMemes: number;
  memsPerPage = 5;
  maxPages = 1;
  memeList: Meme[] = [];
  userLogged: User;
  memeListType = 'approved';
  userId: number;
  tag: string;

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
              this.userId = JSON.parse(urlSegments[urlSegments.length - 1].path);
              this.getMemesForUser();
            } else {
              this.tag = urlSegments[urlSegments.length - 1].path;
              this.getMemesByTag();
            }
          }
        }
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

  getApprovedMemes(page?: number) {
    this.memeService.getApprovedMemes(page).subscribe({
      next: (response) => {
        this.memeList = response.memeDTOList;
        this.pageSelected = response.pageSelected;
        this.totalMemes = response.totalMemes;
        this.calculateMaxPages();
        this.memeListType = 'approved';
      }
    });
  }

  getPendingMemes(page?: number) {
    this.memeService.getPendingMemes(page).subscribe({
      next: (response) => {
        this.memeList = response.memeDTOList;
        this.pageSelected = response.pageSelected;
        this.totalMemes = response.totalMemes;
        this.calculateMaxPages();
        this.memeListType = 'pending';
      }
    });
  }

  getMemesForUser(page?: number) {
    this.memeService.getMemesForUser(this.userId, page).subscribe({
      next: (response) => {
        this.memeList = response.memeDTOList;
        this.pageSelected = response.pageSelected;
        this.totalMemes = response.totalMemes;
        this.calculateMaxPages();
        this.memeListType = 'user';
      }
    });
  }

  getMemesByTag(page?: number) {
    this.memeService.getMemesByTag(this.tag, page).subscribe({
      next: (response) => {
        this.memeList = response.memeDTOList;
        this.pageSelected = response.pageSelected;
        this.totalMemes = response.totalMemes;
        this.calculateMaxPages();
        this.memeListType = 'tag';
      }
    });
  }

  calculateMaxPages() {
    const modulo = this.totalMemes / (this.memsPerPage * this.pageSelected);
    if (modulo >= 1) {
      this.maxPages = this.maxPages + 1;
    } else {
      this.maxPages = this.maxPages - 1;
    }
  }

  getPageAmounts() {
    return Array(this.maxPages).fill(1).map((x, i) => i + 1);
  }

  getMemesFromPage(pageNumber: number) {
    if (this.memeListType === 'approved') {
      this.getApprovedMemes(pageNumber);
    } else if (this.memeListType === 'pending') {
      this.getPendingMemes(pageNumber);
    } else if (this.memeListType === 'user') {
      this.getMemesForUser(pageNumber);
    } else {
      this.getMemesByTag(pageNumber);
    }
    this.calculateMaxPages();
  }

}
