import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
  ngOnInit() {
    this.data = cloneDeep(this.data);
  }
}
