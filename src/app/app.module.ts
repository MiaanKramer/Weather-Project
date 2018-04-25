import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatButtonModule, MatToolbarModule,
         MatGridListModule, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatCardModule, MatMenuModule, MatIconModule,
         MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule,
          MatDialogModule, matDialogAnimations, MatSnackBarModule, MatRadioModule,
          MatListModule
        
  } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppViewComponent } from './layout/app-view.component';

import { WeatherService } from './weather.service';
import { SettingsService } from './settings.service';
import { LocationsService } from './locations.service';

import { SettingsComponent } from './settings/settings.component';
import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { convertPipe, windPipe, directionPipe } from './pipes/convert.pipe';
// import { LocationsModalEditComponent } from './locations-modal-edit/locations-modal-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AppViewComponent,
    SettingsComponent,
    LocationsComponent,
    HomeComponent,
    LocationModalComponent,
    convertPipe,
    windPipe,
    directionPipe,
    // LocationsModalEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MatListModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    SettingsService,
    WeatherService,
    LocationsService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LocationModalComponent]
})
export class AppModule { }
