import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Card} from '../../../model/card';
import {AngularFireStorage} from 'angularfire2/storage';
import {DatabaseService} from '../../../service/database.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddCardComponent} from '../../../dialog/add-card/add-card.component';
import {ProgressBarComponent} from '../../../dialog/progress-bar/progress-bar.component';
import {finalize} from 'rxjs/operators';
import {SnackBarUploadedComponent} from '../../../dialog/snack-bar-uploaded/snack-bar-uploaded.component';
import {EditCardComponent} from '../../../dialog/edit-card/edit-card.component';
import {DeleteDialogComponent} from '../../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.component.html',
  styleUrls: ['./gif-list.component.css']
})
export class GifListComponent implements OnInit, OnDestroy {
  public searchText: string;
  public cardTable = [];
  public cardView: boolean[] = [false];
  private subscription: Subscription[] = [];
  private type: string;
  private selectedImage: any = null;
  private cardDetails: Card;
  private lengthTable: number;
  private uploadProgress$: Observable<number>;
  private audioNewMessage = new Audio();

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(DatabaseService) private fileService: DatabaseService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getCardTable();
    this.viewAllCard();
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
    this.subscription.push(this.fileService.getGif().subscribe((cardTable) => {
      this.lengthTable = cardTable.length;
      this.cardTable = cardTable;
    }));
  }

  public addToFavorite(card: Card): void {
    card.favorite = !card.favorite;
    this.fileService.addToFavoriteGifCard(card.id, card.favorite);
    if (card.favorite) {
      this.playAudio('assets/gif/addFavoriteGif.mp3');
    } else {
      this.playAudio('assets/gif/unsetFavoriteGif.mp3'); }
  }

  public viewFavorite(): void {
    this.cardTable = this.cardTable.filter((item: Card) => item.favorite === true);
    this.viewAllCard();
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
    this.setCardDetails();
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '350px',
      height: '600px',
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.invalid) {
            window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
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
              if (this.type.split('/')[0] === 'image') {
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
                      this.fileService.insertGif(this.cardDetails);
                      this.fileService.selectedImage = null;
                      this._snackBar.openFromComponent(SnackBarUploadedComponent, {
                        duration: 5000,
                        panelClass: ['pink-snackbar']
                      });
                    }));
                  })
                ).subscribe();
              } else { window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< To ma byc obrazek!!'); }

            } else { this.fileService.insertGif(this.cardDetails); }
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
      data: { card, video: false },
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          if (result.invalid) {
            window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
          } else {
            this.cardView[index] = false;
            this.cardDetails.id = card.id;
            this.cardDetails.title = result.value.card.title;
            this.cardDetails.description = result.value.card.description;
            this.cardDetails.longDescription = result.value.card.longDescription;
            this.cardDetails.url = card.url;
            this.cardDetails.favorite = card.favorite;
            this.cardDetails.category = result.value.card.category;
            this.selectedImage = this.fileService.selectedImage;
            this.playAudio('assets/image/editCardImage.mp3');
            if (this.selectedImage) {
              this.type = this.selectedImage.type;
              if (this.type.split('/')[1] === 'gif') {
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
                      this.fileService.updateGifList(this.cardDetails);
                      this.fileService.selectedImage = null;
                      this._snackBar.openFromComponent(SnackBarUploadedComponent, {
                        duration: 5000,
                        panelClass: ['pink-snackbar']
                      });
                    }));
                  })
                ).subscribe();
              } else { window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< To ma byc obrazek!!'); }
            } else { this.fileService.updateGifList(this.cardDetails); }
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
              this.fileService.deleteGif(cardID);
              this.playAudio('assets/gif/deleteButtonImage.mp3');
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
