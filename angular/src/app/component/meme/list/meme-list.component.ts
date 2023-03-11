import {Component, OnInit} from '@angular/core';
import {Meme} from "../../../model/meme";
import {MemeService} from "../../../service/meme.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: '',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.scss']
})
export class MemeListComponent implements OnInit {

  memeList: Meme[] = [];

  constructor(private memeService: MemeService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe({
      next: (urlSegments) => {
        if (urlSegments.length === 0) {
          this.getApprovedMemes();
        } else {
          const pendingMemes = urlSegments.find(urlSegment => urlSegment.path === 'pending');
          if (pendingMemes) {
            this.getPendingMemes();
          } else {
            const userId = JSON.parse(urlSegments[urlSegments.length-1].path);
            this.getMemesForUser(userId);
          }
        }
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
}
