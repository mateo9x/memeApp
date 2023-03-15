import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MemeComment} from "../../model/meme-comment";
import {MemeCommentService} from "../../service/meme-comment.service";
import {ToastService} from "../../service/toast/toast.services";
import {LanguageService} from "../../service/language.service";
import {FileService} from "../../service/file.service";
import * as moment from 'moment';
import 'moment-timezone';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'meme-comment',
  templateUrl: './meme-comment.component.html',
  styleUrls: ['./meme-comment.component.scss']
})
export class MemeCommentComponent implements OnChanges {

  @Input()
  memeId: number;
  user: User;

  memeComments: MemeComment[] = [];
  comment = '';

  constructor(private memeCommentService: MemeCommentService, private toastService: ToastService,
              private languageService: LanguageService, private fileService: FileService,
              private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['memeId'].currentValue) {
      this.getUser();
      this.loadMemeComments();
    }
  }

  loadMemeComments() {
    this.memeCommentService.getMemeCommentsByMemeId(this.memeId).subscribe({
      next: (response) => {
        this.memeComments = response;
      }
    });
  }

  getUser() {
    this.userService.getUserLogged().subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }

  addComment() {
    const request = this.prepareNewCommentRequest();
    this.memeCommentService.createMemeComment(request).subscribe({
      next: (response) => {
        this.comment = '';
        this.toastService.createSuccessToast(this.languageService.getMessage('meme-comment.commentCreated'));
      },
      error: () => {
        this.toastService.createErrorToast(this.languageService.getMessage('meme-comment.commentNotCreated'));
      }
    });
  }

  getMemeCommentUserAvatar(memeComment: MemeComment) {
    return this.fileService.getPhoto(memeComment.userPhotoFile);
  }

  getDateTransformed(date: Date) {
    return moment.utc(date).locale('pl').tz('Europe/Warsaw').format('yyyy-MM-DD HH:mm');
  }

  prepareNewCommentRequest(): MemeComment {
    return {
      comment: this.comment,
      userId: this.user.id,
      memeId: this.memeId,
      dateCreated: new Date()
    }
  }

}
