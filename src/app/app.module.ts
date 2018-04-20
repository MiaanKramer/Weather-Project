import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatButtonModule, MatToolbarModule,
         MatGridListModule, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatCardModule, MatMenuModule, MatIconModule,
         MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule, MatDialogModule, matDialogAnimations} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app-routing.module';

import { AppComponent } from './app.component';

import { WeatherService } from './weather.service';
import { SettingsService } from './settings.service';
import { LocationsService } from './locations.service';

import { SettingsComponent } from './settings/settings.component';
import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { convertPipe, windPipe, directionPipe } from './pipes/convert.pipe';
import { LocationsModalEditComponent } from './locations-modal-edit/locations-modal-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    LocationsComponent,
    HomeComponent,
    LocationModalComponent,
    convertPipe,
    windPipe,
    directionPipe,
    LocationsModalEditComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    SettingsService,
    WeatherService,
    LocationsService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LocationModalComponent, LocationsModalEditComponent]
})
export class AppModule { }
