import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { StarterpageComponent } from './starterpage/starterpage/starterpage.component';
import { MainpageComponent } from './mainpage/mainpage/mainpage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddCardComponent } from './dialog/add-card/add-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EditCardComponent } from './dialog/edit-card/edit-card.component';
import { MatIconModule } from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { EditCategoryComponent } from './dialog/edit-category/edit-category.component';
import { ImageListComponent } from './mainpage/list/image-list/image-list.component';
import { VideoListComponent } from './mainpage/list/video-list/video-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { AddCategoryComponent } from './dialog/add-category/add-category.component';
import { ProgressBarComponent } from './dialog/progress-bar/progress-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarUploadedComponent } from './dialog/snack-bar-uploaded/snack-bar-uploaded.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './starterpage/login/login.component';
import { GifListComponent } from './mainpage/list/gif-list/gif-list.component';
import { RatingComponent } from './mainpage/rating/rating.component';
import { RatingModule } from 'ng-starrating';
import { AddRatingComponent } from './dialog/add-rating/add-rating.component';
import { ShowImageComponent } from './dialog/show-image/show-image.component';
import { EditRatingComponent } from './dialog/edit-rating/edit-rating.component';
import { GalleryComponent } from './mainpage/gallery/gallery.component';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  entryComponents: [
    AddCardComponent,
    EditCardComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    ProgressBarComponent,
    SnackBarUploadedComponent,
    DeleteDialogComponent,
    AddRatingComponent,
    ShowImageComponent,
    EditRatingComponent
  ],
  declarations: [
    AppComponent,
    StarterpageComponent,
    MainpageComponent,
    AddCardComponent,
    EditCardComponent,
    EditCategoryComponent,
    ImageListComponent,
    VideoListComponent,
    DeleteDialogComponent,
    AddCategoryComponent,
    ProgressBarComponent,
    SnackBarUploadedComponent,
    LoginComponent,
    GifListComponent,
    RatingComponent,
    AddRatingComponent,
    ShowImageComponent,
    EditRatingComponent,
    GalleryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    AngularFireAuthModule,
    RatingModule,
    ReactiveFormsModule,
    NgImageSliderModule


  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
