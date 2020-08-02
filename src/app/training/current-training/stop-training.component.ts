import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
      <h2 mat-dialog-title>Are you sure?</h2>
      <p>You already got {{passedData.progress}}%</p>
      <mat-dialog-actions>
          <button mat-raised-button color="primary" [mat-dialog-close]="false">No</button>
          <button mat-raised-button color="basic" [mat-dialog-close]="true">Yes</button>
      </mat-dialog-actions>
  `,
  styles: [':host{text-align:center;}', 'p{margin:0;}', 'h2{margin: 0}']
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}
