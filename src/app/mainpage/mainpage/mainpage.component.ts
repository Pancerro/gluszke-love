import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from 'src/app/dialog/add-category/add-category.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { EditCategoryComponent } from 'src/app/dialog/edit-category/edit-category.component';
import { ImageListComponent } from 'src/app/mainpage/list/image-list/image-list.component';
import { VideoListComponent } from 'src/app/mainpage/list/video-list/video-list.component';
import { Category } from 'src/app/model/category';
import { DatabaseService } from 'src/app/service/database.service';
import {GifListComponent} from '../list/gif-list/gif-list.component';
import {RatingComponent} from '../rating/rating.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, OnDestroy {
  @ViewChild(VideoListComponent, { static: false }) private childVideo: VideoListComponent;
  @ViewChild(ImageListComponent, { static: false }) private childImage: ImageListComponent;
  @ViewChild(GifListComponent, { static: false }) private childGif: GifListComponent;
  @ViewChild(RatingComponent, { static: false }) private childRating: RatingComponent;
  @ViewChild('sidenavright', { static: true }) private sidenavright;
  public viewFavoriteBooleanImage = false;
  public viewFavoriteBooleanVideo = false;
  public viewFavoriteBooleanGif = false;
  public sortRatingByMarta = false;
  public sortRatingByAdriana = false;
  public seeCard = [true, false, false, false];
  public categoryTable = [];
  public categoryView: boolean[] = [false];
  private lengthTable: number;
  private audioNewMessage = new Audio();
  private subscription: Subscription[] = [];

  constructor(@Inject(DatabaseService) private fileService: DatabaseService,
              public dialog: MatDialog,
              private router: Router) { }
  ngOnInit() {
    this.getCategoryTable();
    this.viewAllCategory();
    this.playAudio('assets/walentynki.mp3');
  }

  public playAudio(audio: string): void {
    this.audioNewMessage.src = audio;
    this.audioNewMessage.load();
    this.audioNewMessage.play();
  }

  private getCategoryTable(): void {
    this.subscription.push(this.fileService.getCategory().subscribe((categoryTable) => {
      this.categoryTable = categoryTable;
      this.lengthTable = categoryTable.length;
    }));
  }
  private viewAllCategory(): void {
    for (let i = 0; i < this.lengthTable; i++) { this.categoryView[i] = false; }
    setTimeout(() => { for (let i = 0; i < this.lengthTable; i++) { this.categoryView[i] = true; } }, 3000);
  }
  public saveImage(): void {
    this.childImage.save();
    this.playAudio('assets/image/newImageCard.mp3');
  }
  public saveVideo(): void {
    this.childVideo.save();
    this.playAudio('assets/video/newVideoCard.mp3');
  }
  public saveGif(): void {
    this.childGif.save();
    this.playAudio('assets/gif/newGifCard.mp3');
  }
  public saveRating(): void {
    this.childRating.save();
    this.playAudio('assets/rating/newRatingCard.mp3');
  }
  public viewFavoriteImage(): void {
    this.viewFavoriteBooleanImage = true;
    this.childImage.viewFavorite();
    this.playAudio('assets/image/viewFavoriteImage.mp3');
    this.sidenavright.toggle();
  }
  public viewAllImage(): void {
    this.viewFavoriteBooleanImage = false;
    this.childImage.viewAll();
    this.playAudio('assets/image/viewAllImage.mp3');
    this.sidenavright.toggle();
  }

  public viewFavoriteVideo(): void {
    this.viewFavoriteBooleanVideo = true;
    this.childVideo.viewFavorite();
    this.playAudio('assets/video/viewFavoriteVideo.mp3');
    this.sidenavright.toggle();
  }
  public viewAllVideo(): void {
    this.viewFavoriteBooleanVideo = false;
    this.childVideo.viewAll();
    this.playAudio('assets/video/viewAllVideo.mp3');
    this.sidenavright.toggle();
  }
  public viewFavoriteGif(): void {
    this.viewFavoriteBooleanGif = true;
    this.childGif.viewFavorite();
    this.playAudio('assets/gif/viewFavoriteGif.mp3');
    this.sidenavright.toggle();
  }
  public viewAllGif(): void {
    this.viewFavoriteBooleanGif = false;
    this.childGif.viewAll();
    this.playAudio('assets/gif/viewAllGif.mp3');
    this.sidenavright.toggle();
  }
  public sortByRatingASCMarta(): void {
    this.sortRatingByMarta = true;
    this.childRating.sortByRatingASCMarta();
    this.playAudio('assets/rating/sortByRatingASCMarta.mp3');
    this.sidenavright.toggle();
  }
  public sortByRatingDESCMarta(): void {
    this.sortRatingByMarta = false;
    this.childRating.sortByRatingDESCMarta();
    this.playAudio('assets/rating/sortByRatingDESCMarta.mp3');
    this.sidenavright.toggle();
  }
  public sortByRatingASCAdriana(): void {
    this.sortRatingByAdriana = true;
    this.childRating.sortByRatingASCAdrian();
    this.playAudio('assets/rating/sortByRatingASCAdrian.mp3');
    this.sidenavright.toggle();
  }
  public sortByRatingDESCAdriana(): void {
    this.sortRatingByAdriana = false;
    this.childRating.sortByRatingDESCAdrian();
    this.playAudio('assets/rating/sortByRatingDESCAdrian.mp3');
    this.sidenavright.toggle();
  }
  public clearSort(): void {
    this.childRating.clearSort();
    this.playAudio('assets/rating/clearSort.mp3');
    this.sidenavright.toggle();
  }
  private addNewCategory(): void {
    this.categoryView[this.categoryView.length] = false;
    setTimeout(() => this.categoryView[this.categoryView.length - 1] = true, 3000);
  }
  public addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      height: '450px',
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.invalid) {
          window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
        } else {
          result.value.category.idCategory = (Math.random().toString()).replace('0.', result.value.category.nameCategory);
          this.fileService.insertCategory(result.value.category);
          this.addNewCategory();
          this.playAudio('assets/category/newCategory.mp3');
        }
      }
    });
  }

  public editCategory(category: Category, index: number): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '350px',
      height: '450px',
      data: category,
      panelClass: 'background-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.invalid) {
          window.alert('Coś Ci nie wyszło Martusiu, coś Ci nie wyszło... :< ');
        } else {
          this.categoryView[index] = false;
          result.value.category.idCategory = category.idCategory;
          this.fileService.updateCategory(result.value.category);
          this.playAudio('assets/category/editCategory.mp3');
        }
        setTimeout(() => this.categoryView[index] = true, 3000);
      }
    }
    );
  }

  public deleteCategory(idCategory: string): void {
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
            this.fileService.deleteCategory(idCategory);
            this.viewAllCategory();
            this.playAudio('assets/category/deleteCategory.mp3');
          }
        }
      }
    }
    );
  }
  public viewCard(): void {
    this.seeCard = [true, false, false, false];
    this.playAudio('assets/video/viewImageCardVideo.mp3');
    this.sidenavright.toggle();
  }

  public viewVideo(): void {
    this.seeCard = [false, true, false, false];
    this.playAudio('assets/image/loveSongImage.mp3');
    this.sidenavright.toggle();
  }
  public viewGif(): void {
    this.seeCard = [false, false, true, false];
    this.playAudio('assets/gif/viewCardGif.mp3');
    this.sidenavright.toggle();
  }
  public viewRating(): void {
    this.seeCard = [false, false, false, true];
    this.playAudio('assets/rating/viewCardRating.mp3');
    this.sidenavright.toggle();
  }
  public goToGallery(): void {
    this.router.navigate(['/gallery-page']).then(() => this.playAudio('assets/gallery/sounds/gallery.mp3'));
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}


