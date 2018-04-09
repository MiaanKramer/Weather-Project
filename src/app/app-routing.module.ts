import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { SettingsComponent } from './settings/settings.component';
import { ForecastComponent } from './forecast/forecast.component';

export const APP_ROUTES: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'locations', component: LocationsComponent},
	{path: 'settings', component: SettingsComponent},
	{path: 'forecast', component: ForecastComponent},
	{path: 'forecast/:cityId', component: ForecastComponent},
];