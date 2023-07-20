import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PopUpSnackMessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}
  showPopUpSnackMessage(message: string, type): void {
    let css;
    if (type === 'error') {
      css = 'snack-red';
    } else if (type === 'success') {
      css = 'snack-green';
    }
    this.snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: [css],
    });
  }

  showSuccessMessage(message): void {
    this.showPopUpSnackMessage(message, 'success');
  }

  showErrorMessage(message): void {
    this.showPopUpSnackMessage(message, 'error');
  }
}
