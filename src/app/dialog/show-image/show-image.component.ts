import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
  public url: string;
  private index = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private elRef: ElementRef) { }
  ngOnInit() {
    this.data = cloneDeep(this.data);
    this.url = this.data[this.index];
  }
  public bigger(url): void {
    this.url = url;
  }
  public next(): void {
    if (this.index === this.data.length - 1) {
      this.index = 1;
      this.url = this.data[this.index];
    } else {
      this.index++;
      this.url = this.data[this.index];
    }
    if (this.url.toString().split('.')[5].split('?')[0] === 'mp4') {
      const player = this.elRef.nativeElement.querySelector('video');
      player.load();
    }
  }

  public previous(): void {
    if (this.index === 1) {
      this.index = this.data.length - 1;
      this.url = this.data[this.index];
    } else {
      this.index--;
      this.url = this.data[this.index];
    }
    if (this.url.toString().split('.')[5].split('?')[0] === 'mp4') {
      const player = this.elRef.nativeElement.querySelector('video');
      player.load();
    }
  }
}
