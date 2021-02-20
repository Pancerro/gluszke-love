import { Inject, Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Card } from '../model/card';
import { Category } from '../model/category';
import {RatingCard} from '../model/rating-card';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public selectedImage: any = null;
  private imageList: AngularFireList<Card>;
  private categoryList: AngularFireList<Category>;
  private filmList: AngularFireList<Card>;
  private gifList: AngularFireList<Card>;
  private ratingList: AngularFireList<RatingCard>;
  private messageList: AngularFireList<Message>;
  private imageUpdateList: any[];
  private categoryUpdateList: any[];
  private filmUpdateList: any[];
  private gifUpdateList: any[];
  private ratingListUpdate: any[];
  private messageListUpdate: any[];

  constructor(@Inject(AngularFireDatabase)
  private firebase: AngularFireDatabase) { this.initDatabase();
  }

  public initDatabase(): void {
    this.imageList = this.firebase.list('imageDetails');
    this.categoryList = this.firebase.list('category');
    this.filmList = this.firebase.list('film');
    this.gifList = this.firebase.list('gif');
    this.ratingList = this.firebase.list('rating');
    this.messageList = this.firebase.list('message');
    this.imageList.snapshotChanges().subscribe(list => {
      this.imageUpdateList = list;
    });
    this.categoryList.snapshotChanges().subscribe(list => {
      this.categoryUpdateList = list;
    });
    this.filmList.snapshotChanges().subscribe(list => {
      this.filmUpdateList = list;
    });
    this.gifList.snapshotChanges().subscribe(list => {
      this.gifUpdateList = list;
    });
    this.ratingList.snapshotChanges().subscribe(list => {
      this.ratingListUpdate = list;
    });
    this.messageList.snapshotChanges().subscribe(list => {
      this.messageListUpdate = list;
    });
  }
  public getImage(): Observable<Card[]> {
    return this.imageList.valueChanges();
  }
  public getCategory(): Observable<Category[]> {
    return this.categoryList.valueChanges();
  }
  public getFilm(): Observable<Card[]> {
    return this.filmList.valueChanges();
  }
  public getGif(): Observable<Card[]> {
    return this.gifList.valueChanges();
  }
  public getRating(): Observable<RatingCard[]> {
    return this.ratingList.valueChanges();
  }
  public getMessage(): Observable<Message[]> {
    return this.messageList.valueChanges();
  }
  public insertImageDetails(card: Card): void {
    this.imageList.push(card);
  }
  public insertCategory(category: Category): void {
    this.categoryList.push(category);
  }
  public insertFilm(card: Card): void {
    this.filmList.push(card);
  }
  public insertGif(card: Card): void {
    this.gifList.push(card);
  }
  public insertRating(rating: RatingCard): void {
    this.ratingList.push(rating);
  }
  public insertMessage(message: Message): void {
    this.messageList.push(message);
  }
  public updateFileDetails(card: Card): void {
    this.imageUpdateList = this.imageUpdateList.filter(item => item.payload.val().id === card.id);
    this.imageList.update(this.imageUpdateList[0].key, card);
  }
  public updateCategory(category: Category): void {
    this.categoryUpdateList = this.categoryUpdateList.filter(item => item.payload.val().idCategory === category.idCategory);
    this.categoryList.update(this.categoryUpdateList[0].key, category);
  }
  public updateFilmList(card: Card): void {
    this.filmUpdateList = this.filmUpdateList.filter(item => item.payload.val().id === card.id);
    this.filmList.update(this.filmUpdateList[0].key, card);
  }
  public updateGifList(card: Card): void {
    this.gifUpdateList = this.gifUpdateList.filter(item => item.payload.val().id === card.id);
    this.gifList.update(this.gifUpdateList[0].key, card);
  }
  public updateRatingList(card: RatingCard): void {
    const updateRating = this.ratingListUpdate.filter(item => item.payload.val().id === card.id);
    this.ratingList.update(updateRating[0].key, card);
  }
  public deleteFileDetails(cardID: string): void {
    this.imageUpdateList = this.imageUpdateList.filter(item => item.payload.val().id === cardID);
    this.imageList.remove(this.imageUpdateList[0].key);
  }
  public deleteCategory(idCategory: string): void {
    this.categoryUpdateList = this.categoryUpdateList.filter(item => item.payload.val().idCategory === idCategory);
    this.categoryList.remove(this.categoryUpdateList[0].key);
  }
  public deleteFilm(filmID: string): void {
    this.filmUpdateList = this.filmUpdateList.filter(item => item.payload.val().id === filmID);
    this.filmList.remove(this.filmUpdateList[0].key);
  }
  public deleteGif(gifID: string): void {
    this.gifUpdateList = this.gifUpdateList.filter(item => item.payload.val().id === gifID);
    this.gifList.remove(this.gifUpdateList[0].key);
  }
  public deleteRating(gifID: string): void {
    this.ratingListUpdate = this.ratingListUpdate.filter(item => item.payload.val().id === gifID);
    this.ratingList.remove(this.ratingListUpdate[0].key);
  }
  public addToFavoriteImageCard(cardID: string, favorite: boolean): void {
    this.imageUpdateList = this.imageUpdateList.filter(item => item.payload.val().id === cardID);
    this.imageList.update(this.imageUpdateList[0].key, { 'favorite': favorite });
  }
  public addToFavoriteFilmCard(cardID: string, favorite: boolean): void {
    this.filmUpdateList = this.filmUpdateList.filter(item => item.payload.val().id === cardID);
    this.filmList.update(this.filmUpdateList[0].key, { 'favorite': favorite });
  }
  public addToFavoriteGifCard(cardID: string, favorite: boolean): void {
    this.gifUpdateList = this.gifUpdateList.filter(item => item.payload.val().id === cardID);
    this.gifList.update(this.gifUpdateList[0].key, { 'favorite': favorite });
  }
  public updateRatingCardMarta(cardID: string, rating: number): void {
    this.ratingListUpdate = this.ratingListUpdate.filter(item => item.payload.val().id === cardID);
    this.ratingList.update(this.ratingListUpdate[0].key, { 'ratingMarta': rating });
  }
  public updateRatingCardAdrian(cardID: string, rating: number): void {
    this.ratingListUpdate = this.ratingListUpdate.filter(item => item.payload.val().id === cardID);
    this.ratingList.update(this.ratingListUpdate[0].key, { 'ratingAdrian': rating });
  }
}

