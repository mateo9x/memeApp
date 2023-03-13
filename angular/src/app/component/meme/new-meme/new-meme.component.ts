import {Component, OnInit} from '@angular/core';
import {MemeService} from "../../../service/meme.service";
import {User} from "../../../model/user";
import {Meme} from "../../../model/meme";
import {FileService} from "../../../service/file.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'new-meme',
  templateUrl: './new-meme.component.html',
  styleUrls: ['./new-meme.component.scss']
})
export class NewMemeComponent implements OnInit {

  userLogged: User;
  meme: Meme = new Meme();
  file: File;
  tags: any[] = [];

  constructor(private memeService: MemeService, private fileService: FileService, private toastService: ToastService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserLogged().subscribe({
      next: (response) => {
        this.userLogged = response;
      }
    });
  }

  uploadImage(event: any) {
    this.file = event.currentFiles[0];
  }

  createMeme() {
    this.prepareMemeData();
    this.memeService.createMeme(this.meme).subscribe({
      next: (memeResponse) => {
        this.fileService.saveFile(memeResponse.photoUrl, this.file).subscribe({
          next: () => {
            this.router.navigate([`meme/${memeResponse.id}`]).then(() => {
              this.toastService.createSuccessToast('Mem został zapisany pomyślnie');
            });
          },
          error: () => {
            this.toastService.createErrorToast('Zapis mema nie powiódł się');
          }
        });
      },
      error: () => {
        this.toastService.createErrorToast('Zapis mema nie powiódł się');
      }
    });
  }

  prepareMemeData() {
    const photoUrl = `memes/${this.userLogged.id}/$REPLACE_MEM_ID_${this.file.name}`;
    this.meme.title = this.file.name;
    this.meme.photoUrl = photoUrl;
    this.meme.userId = this.userLogged.id;
    this.meme.dateCreated = new Date();
    this.meme.upVotes = 0;
    this.meme.downVotes = 0;
    if (this.tags.length > 0) {
      this.meme.tags = this.tags.join(',');
    }
  }

}
