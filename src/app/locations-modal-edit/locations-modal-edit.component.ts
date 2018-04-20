import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { LocationsService, Location} from '../locations.service';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-locations-modal-edit',
  templateUrl: './locations-modal-edit.component.html',
  styleUrls: ['./locations-modal-edit.component.scss']
})
export class LocationsModalEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LocationsModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoCLick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

}
