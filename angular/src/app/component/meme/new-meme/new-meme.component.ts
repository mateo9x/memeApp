import {Component, OnInit} from '@angular/core';
import {MemeService} from "../../../service/meme.service";
import {User} from "../../../model/user";
import {Meme} from "../../../model/meme";
import {FileService} from "../../../service/file.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {LanguageService} from "../../../service/language.service";

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
              private router: Router, private userService: UserService, private languageService: LanguageService) {
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
        this.fileService.saveFile(memeResponse.url, this.file).subscribe({
          next: () => {
            this.router.navigate([`meme/${memeResponse.id}`]).then(() => {
              this.toastService.createSuccessToast(this.languageService.getMessage('new-meme.save.success'));
            });
          },
          error: () => {
            this.toastService.createErrorToast(this.languageService.getMessage('new-meme.save.error'));
          }
        });
      },
      error: () => {
        this.toastService.createErrorToast(this.languageService.getMessage('new-meme.save.error'));
      }
    });
  }

  prepareMemeData() {
    const photoUrl = `memes/${this.userLogged.id}/$REPLACE_MEM_ID_${this.file.name}`;
    this.meme.title = this.file.name;
    this.meme.url = photoUrl;
    this.meme.userId = this.userLogged.id;
    this.meme.dateCreated = new Date();
    this.meme.upVotes = 0;
    this.meme.downVotes = 0;
    if (this.tags.length > 0) {
      this.meme.tags = this.tags.join(',');
    }
    this.meme.isVideo = this.file.type.includes('video');
  }

}
