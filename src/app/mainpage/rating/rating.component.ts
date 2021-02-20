import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DatabaseService} from '../../service/database.service';
import {RatingCard} from '../../model/rating-card';
import {FormBuilder} from '@angular/forms';
import {Comment} from '../../model/comment';
import {Card} from '../../model/card';
import {AuthService} from '../../service/auth.service';
import {Category} from '../../model/category';
import {MatDialog} from '@angular/material';
import {AddRatingComponent} from '../../dialog/add-rating/add-rating.component';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {ShowImageComponent} from '../../dialog/show-image/show-image.component';
import {EditRatingComponent} from '../../dialog/edit-rating/edit-rating.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy {
  private comment: Comment;
  public email: string;
  public seeComment = [false];
  public searchText: string;
  public cardTable: RatingCard[];
  public categoryTable: Category[];
  public cardView: boolean[] = [false];
  public allCard: Card[] = [];
  private subscription: Subscription[] = [];
  private lengthTable: number;
  private audioNewMessage = new Audio();
  // tslint:disable-next-line:max-line-length
  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              @Inject(DatabaseService) private databaseService: DatabaseService,
              public dialog: MatDialog) {
    this.comment = {
      email: '',
      comment: ''
    };
    this.email = auth.user.email.toString();
  }
  ngOnInit() {
    this.getCardTable();
    this.getAllCard();
    this.viewAllCard();
    this.subscription.push(this.databaseService.getCategory().subscribe(categoryTable =>
      this.categoryTable = categoryTable));
  }
  private playAudio(audio: string): void {
    this.audioNewMessage.src = audio;
    this.audioNewMessage.load();
    this.audioNewMessage.play();
  }
  private getCardTable(): void {
    this.subscription.push(this.databaseService.getRating().subscribe((cardTable: RatingCard[]) => {
      this.lengthTable = cardTable.length;
      this.cardTable = cardTable;
    }));
  }
  private getAllCard(): void {
    this.databaseService.getImage().subscribe((image: Card[]) =>
      this.allCard = this.allCard.concat(image));
    this.databaseService.getFilm().subscribe((video: Card[]) =>
      this.allCard = this.allCard.concat(video));
    this.databaseService.getGif().subscribe((gif: Card[]) =>
      this.allCard = this.allCard.concat(gif));
  }
  public viewAll(): void {
    this.getCardTable();
    this.viewAllCard();
  }
  private viewAllCard(): void {
    for (let i = 0; i < this.lengthTable; i++) { this.cardView[i] = false; }
    setTimeout(() => { for (let i = 0; i < this.lengthTable; i++) { this.cardView[i] = true; } }, 3000);
  }
  private addNewCard(): void {
    this.cardView[this.cardView.length] = false;
    setTimeout(() => this.cardView[this.cardView.length - 1] = true, 3000);
  }
  public save(): void {
    const dialogRef = this.dialog.open(AddRatingComponent, {
      width: '350px',
      height: '400px',
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.invalid) {
            window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
          } else {
            let random = Math.random().toString();
            random = random.replace('0.', 'rating.');
            const comment: Comment = {
              email: '',
              comment: ''
            };
            const rating: RatingCard = {
              id: random,
              title: result.value.rating.title,
              ratingAdrian: 0,
              ratingMarta: 0,
              type: result.value.rating.type,
              category: result.value.rating.category,
              comment: [comment],
              imageUrl: ['1']
            };
            this.databaseService.insertRating(rating);
            this.addNewCard();
            }
          }
        });
  }
  public editCard(card: RatingCard, index: number): void {
    const dialogRef = this.dialog.open(EditRatingComponent, {
      width: '350px',
      height: '400px',
      panelClass: 'background-dialog',
      data: card,
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.invalid) {
            window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
          } else {
            this.cardView[index] = false;
            const rating: RatingCard = {
              id: card.id,
              title: result.value.rating.title,
              ratingAdrian: card.ratingAdrian,
              ratingMarta: card.ratingMarta,
              type: result.value.rating.type,
              category: result.value.rating.category,
              comment: card.comment,
              imageUrl: card.imageUrl
            };
            this.playAudio('assets/rating/editCardRating.mp3');
            this.databaseService.updateRatingList(rating);
            setTimeout(() => this.cardView[index] = true, 3000);
          }
        }
      }
    );
  }

  public delete(cardID: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '250px',
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.invalid) {
            window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
          } else {
            if (result) {
              this.viewAllCard();
              this.databaseService.deleteRating(cardID);
              this.playAudio('assets/rating/deleteButtonRating.mp3');
            }
          }
        }
      }
    );
  }
  public previewCard(url: string): void {
    this.playAudio('assets/rating/openPreviewCard.mp3');
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '350px',
      height: '450px',
      data: url,
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.playAudio('assets/rating/closePreviewCard.mp3');
    });
  }
  public onRateMarta(event, index: string): void {
    this.databaseService.updateRatingCardMarta(index, event.newValue);
    this.playAudio('assets/rating/martaChangeRating.mp3');
  }
  public onRateAdrian(event, index: string): void {
    this.databaseService.updateRatingCardAdrian(index, event.newValue);
    this.playAudio('assets/rating/adrianChangeRating.mp3');
  }
  addImageToRating(index: number, addImage) {
    this.cardTable[index].imageUrl.push(addImage.value.url);
    this.databaseService.updateRatingList(this.cardTable[index]);
    this.playAudio('assets/rating/addImageToRating.mp3');
  }
  public sendComment(index: number, addComment) {
    if (this.auth.user.email.toString() === 'martag-1997@wp.pl') {
      this.comment.email = 'Martusia';
    } else { this.comment.email = 'Adris'; }
    this.comment.comment = addComment.value.comment.comment;
    this.cardTable[index].comment.push(this.comment);
    this.playAudio('assets/rating/sendComment.mp3');
    this.databaseService.updateRatingList(this.cardTable[index]);
  }
  public sortByRatingASCMarta(): void {
    this.cardTable = this.cardTable.sort((a, b) => b.ratingMarta - a.ratingMarta);
  }
  public sortByRatingDESCMarta(): void {
    this.cardTable = this.cardTable.sort((a, b) => a.ratingMarta - b.ratingMarta);
  }
  public sortByRatingASCAdrian(): void {
    this.cardTable = this.cardTable.sort((a, b) => b.ratingAdrian - a.ratingAdrian);
  }
  public sortByRatingDESCAdrian(): void {
    this.cardTable = this.cardTable.sort((a, b) => a.ratingAdrian - b.ratingAdrian);
  }
  public clearSort(): void {
   this.getCardTable();
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}



