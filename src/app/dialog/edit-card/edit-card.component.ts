import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit, OnDestroy {
  public categoryTable = [];
  private subscription: Subscription;
  constructor(private fileService: DatabaseService,
              @Inject(MAT_DIALOG_DATA) public data) { }
  ngOnInit() {
    this.data = cloneDeep(this.data);
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
