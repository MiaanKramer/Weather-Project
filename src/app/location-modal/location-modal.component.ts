import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})

export class LocationModalComponent implements OnInit {

  constructor() {
    
  }

  
  ngOnInit() {
  
  }

  // Basic dialog opener
  openDialog(index) {
    // create a new dialog with layout provided by the locationModalCOmpoonent
    let dialogRef = this.dialog.open(LocationModalComponent, {
      // the data which the dialog uses it passed to it within this object
      width: "600px",
      data: location[index]
    });

    // results retrieved from dialog with be 
    //retrieved and sent to this function which will then produce a console.log to display information
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }
}
