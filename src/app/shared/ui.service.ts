import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class UIService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(message, action, duration) {
    this.snackBar.open(message, action, {duration});
  }
}
