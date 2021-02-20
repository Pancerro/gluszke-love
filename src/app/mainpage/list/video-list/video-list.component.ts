import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddCardComponent } from 'src/app/dialog/add-card/add-card.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { EditCardComponent } from 'src/app/dialog/edit-card/edit-card.component';
import { ProgressBarComponent } from 'src/app/dialog/progress-bar/progress-bar.component';
import { SnackBarUploadedComponent } from 'src/app/dialog/snack-bar-uploaded/snack-bar-uploaded.component';
import { Card } from 'src/app/model/card';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {
  public searchText: string;
  public cardTable = [];
  public cardView: boolean[] = [false];
  private subscription: Subscription[] = [];
  private type: string;
  private selectedImage: any = null;
  private cardDetails: Card;
  private lengthTable: number;
  private uploadProgress$: Observable<number>
  private audioNewMessage = new Audio();

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
    @Inject(DatabaseService) private fileService: DatabaseService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCardTable();
    this.viewAllCard()
    this.setCardDetails();
  }

  private playAudio(audio: string): void {
    this.audioNewMessage.src = audio;
    this.audioNewMessage.load();
    this.audioNewMessage.play();
  }

  private setCardDetails(): void {
    this.cardDetails = {
      id: '',
      url: '',
      title: '',
      description: '',
      longDescription: '',
      category: null,
      favorite: null
    };
  }
  private getCardTable(): void {
    this.subscription.push(this.fileService.getFilm().subscribe((cardTable) => {
      this.lengthTable = cardTable.length;
      this.cardTable = cardTable;
    }));
  }

  public addToFavorite(card: Card): void {
    card.favorite = !card.favorite;
    this.fileService.addToFavoriteFilmCard(card.id, card.favorite);
    if (card.favorite) this.playAudio("assets/video/addFavoriteVideo.mp3");
    else this.playAudio("assets/video/unsetFavoriteVideo.mp3");
  }

  public viewFavorite(): void {
    this.cardTable = this.cardTable.filter((item: Card) => item.favorite == true);
    this.viewAllCard();
  }

  public viewAll(): void {
    this.getCardTable();
    this.viewAllCard();
  }

  private viewAllCard(): void {
    for (let i = 0; i < this.lengthTable; i++) this.cardView[i] = false;
    setTimeout(() => { for (let i = 0; i < this.lengthTable; i++) this.cardView[i] = true }, 3000);
  }
  private addNewCard(): void {
    this.cardView[this.cardView.length] = false;
    setTimeout(() => this.cardView[this.cardView.length - 1] = true, 3000);
  }
  public save(): void {
    this.setCardDetails();
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '350px',
      height: '600px',
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ");
        } else {
          let random = Math.random().toString();
          random = random.replace('0.', name + '|');
          this.cardDetails.id = random;
          this.cardDetails.title = result.value.card.title;
          this.cardDetails.description = result.value.card.description;
          this.cardDetails.longDescription = result.value.card.longDescription;
          this.cardDetails.category = result.value.card.category;
          this.cardDetails.favorite = false;
          this.selectedImage = this.fileService.selectedImage;
          if (this.selectedImage) {
            this.type = this.selectedImage.type;
            if (this.type.split('/')[0] === "video") {
              this.addNewCard();
              let name = this.selectedImage.name;
              const fileRef = this.storage.ref(name);
              const imageUpload = this.storage.upload(name, this.selectedImage);
              this.uploadProgress$ = imageUpload.percentageChanges();
              const dialogRef = this.dialog.open(ProgressBarComponent, {
                width: '350px',
                height: '200px',
                data: this.uploadProgress$,
                panelClass: 'background-dialog'
              });
              imageUpload.snapshotChanges().pipe(
                finalize(() => {
                  this.subscription.push(fileRef.getDownloadURL().subscribe((url) => {
                    this.cardDetails.url = url;
                    this.fileService.insertFilm(this.cardDetails);
                    this.fileService.selectedImage = null;
                    this._snackBar.openFromComponent(SnackBarUploadedComponent, {
                      duration: 5000,
                      panelClass: ['pink-snackbar']
                    });
                  }));
                })
              ).subscribe();
            } else window.alert("Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< To ma byc video!");
          } else this.fileService.insertFilm(this.cardDetails);
        }
      }
    }
    );
  }

  public edit(card: Card, index: number): void {
    this.setCardDetails();
    const dialogRef = this.dialog.open(EditCardComponent, {
      width: '350px',
      height: '600px',
      panelClass: 'background-dialog',
      data: { card: card, video: true },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ");
        }
        else {
          this.cardView[index] = false;
          this.cardDetails.id = card.id;
          this.cardDetails.title = result.value.card.title;
          this.cardDetails.description = result.value.card.description;
          this.cardDetails.longDescription = result.value.card.longDescription;
          this.cardDetails.url = card.url;
          this.cardDetails.favorite = card.favorite;
          this.cardDetails.category = result.value.card.category;
          this.selectedImage = this.fileService.selectedImage;
          this.playAudio("assets/video/editCardVideo.mp3");
          if (this.selectedImage) {
            this.type = this.selectedImage.type;
            if (this.type.split('/')[0] === "video") {
              var name = this.selectedImage.name;
              const fileRef = this.storage.ref(name);
              const imageUpload = this.storage.upload(name, this.selectedImage);
              this.uploadProgress$ = imageUpload.percentageChanges();
              imageUpload.snapshotChanges().pipe(
                finalize(() => {
                  this.subscription.push(fileRef.getDownloadURL().subscribe((url) => {
                    this.cardDetails.url = url;
                    this.fileService.updateFilmList(this.cardDetails);
                    this.fileService.selectedImage = null;
                    this._snackBar.openFromComponent(SnackBarUploadedComponent, {
                      duration: 5000,
                      panelClass: ['pink-snackbar']
                    });
                  }));
                })
              ).subscribe();
            } else window.alert("Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< To ma byc video!");
          } else this.fileService.updateFilmList(this.cardDetails);
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
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ");
        }
        else {
          if (result) {
            this.viewAllCard();
            this.fileService.deleteFilm(cardID);
            this.playAudio("assets/video/deleteButtonVideo.mp3");
          }
        }
      }
    }
    );
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
