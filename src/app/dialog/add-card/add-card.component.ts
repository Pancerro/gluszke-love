import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-add-or-edit-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit, OnDestroy {
  constructor(private fileService: DatabaseService) { }
  public categoryTable = [];
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.fileService.getCategory().subscribe(categoryTable =>
      this.categoryTable = categoryTable);
  }
  public showPreview(event: any): void {
    this.fileService.selectedImage = event.target.files[0];
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
