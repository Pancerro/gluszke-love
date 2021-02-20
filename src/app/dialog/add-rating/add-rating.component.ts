import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from '../../service/database.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit, OnDestroy {
  constructor(private databaseService: DatabaseService) { }
  public categoryTable = [];
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.databaseService.getCategory().subscribe(categoryTable =>
      this.categoryTable = categoryTable);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
