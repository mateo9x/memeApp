import {Component, OnInit} from '@angular/core';
import {MemeService} from "../../../service/meme.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {Meme} from "../../../model/meme";
import {FileService, MEME_ASSETS_PATH_PREFIX} from "../../../service/file.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";

@Component({
  selector: 'new-meme',
  templateUrl: './new-meme.component.html',
  styleUrls: ['./new-meme.component.scss']
})
export class NewMemeComponent implements OnInit {

  userLogged: User;
  meme: Meme = new Meme();
  file: File;

  constructor(private memeService: MemeService, private userService: UserService,
              private fileService: FileService, private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.userLogged.subscribe({
      next: (response) => {
        this.userLogged = response;
      }
    });
  }

  uploadImage(event: any) {
    this.file = event.currentFiles[0];
  }

  tryCreateMeme() {
    this.fileService.doesFileAlreadyExists(this.userLogged.id, this.file.name).subscribe({
      next: () => {
        this.toastService.createErrorToast('Plik z taką nazwą już istnieje, zmień nazwę i wrzuć plik ponownie');
      },
      error: () => {
        this.createMeme();
      }
    });
  }

  createMeme() {
    this.fileService.saveFile(this.userLogged.id, this.file.name, this.file).subscribe({
      next: () => {
        this.prepareMemeData();
        this.memeService.createMeme(this.meme).subscribe({
          next: (response) => {
            this.router.navigate([`/meme/${response.id}`]).then(() => {
              this.toastService.createSuccessToast('Mem został utworzony');
            });
          },
          error: () => {
            this.toastService.createErrorToast('Mem nie został utworzony');
          }
        });
      },
      error: () => {
        this.toastService.createErrorToast('Mem nie został utworzony');
      }
    });
  }

  prepareMemeData() {
    this.meme.title = this.file.name;
    this.meme.userPhotoUrl = MEME_ASSETS_PATH_PREFIX + this.userLogged.id;
    this.meme.userId = this.userLogged.id;
    this.meme.dateCreated = new Date();
    this.meme.upVotes = 0;
    this.meme.downVotes = 0;
  }

}
