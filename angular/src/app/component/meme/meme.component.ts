import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Meme} from "../../model/meme";

@Component({
  selector: 'meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent {

  @Input()
  meme: Meme;

  constructor(private router: Router) {
  }

  displayUserMemes(userId: number) {
    this.router.navigate([`user/${userId}`]).finally();
  }

}
