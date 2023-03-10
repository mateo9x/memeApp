import {Component, OnInit} from '@angular/core';
import {Meme} from "../../../../model/meme";
import {MemeService} from "../../../../services/meme.service";

@Component({
  selector: 'meme-pending',
  templateUrl: '../meme-list.component.html',
  styleUrls: ['../meme-list.component.scss']
})
export class MemePendingListComponent implements OnInit {

  memeList: Meme[] = [];

  constructor(private memeService: MemeService) {
  }

  ngOnInit() {
    this.getMemes();
  }

  getMemes() {
    this.memeService.getPendingMemes().subscribe({
      next: (response) => {
        this.memeList = response;
      }
    });
  }

}
