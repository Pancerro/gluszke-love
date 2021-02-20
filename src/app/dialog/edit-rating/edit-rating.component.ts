import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DatabaseService} from '../../service/database.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.css']
})
export class EditRatingComponent implements OnInit, OnDestroy {
  public categoryTable = [];
  private subscription: Subscription;
  constructor(private databaseService: DatabaseService,
              @Inject(MAT_DIALOG_DATA) public data) { }
  ngOnInit() {
    this.data = cloneDeep(this.data);
    this.subscription = this.databaseService.getCategory().subscribe(categoryTable =>
      this.categoryTable = categoryTable);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
