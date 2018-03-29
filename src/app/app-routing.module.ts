import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LocationModalComponent } from './location-modal/location-modal.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'locations', component: LocationsComponent },
  {path: 'locations-modal', component: LocationModalComponent },
  {path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
