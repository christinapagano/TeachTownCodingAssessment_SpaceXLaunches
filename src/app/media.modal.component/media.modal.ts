import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'media-modal',
  templateUrl: './media.modal.html',
  styleUrls: ['./media.modal.css']

})
export class MediaModalComponent {
  youtubeLink: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MediaModalComponent>) {
    this.youtubeLink = `https://www.youtube.com/watch?v=${data.youtubeId}`;
  }

  openLink(): void {
    window.open(this.youtubeLink, '_blank');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
