import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService, Settings } from '../settings.service';

@Pipe({ name: 'convertTemp' })
export class convertPipe implements PipeTransform {
    constructor(private settings: SettingsService) {}

    transform(value: any) {
        if (this.settings.get().unitType == "metric") {
            return (value + '°C');
        } else if (this.settings.get().unitType == "imperial") {
            return (value + '°F');
        }

        return value;
    }
    
}

@Pipe({ name: 'convertWind' })
export class windPipe implements PipeTransform {
    constructor(private settings: SettingsService) {}

    transform(value: number) {
        if (this.settings.get().unitType == "metric") {
            return (value + "kmph")
        } else if (this.settings.get().unitType == "imperial") {
            return (value + "mph")
        }

        return value;
    } 
}

@Pipe({ name: 'convertDirection' })
export class directionPipe implements PipeTransform {
    constructor(private settings: SettingsService) {}

    transform(value: number) {
        if(value > 0 && value < 90) {
            return "NE";
        }

        if(value > 90 && value < 180) {
            return "SE";
        }
        
        if(value > 180 && value < 270) {
            return "SW";
        }

        if(value > 270 && value < 360) {
            return "NW";
        }
            
    } 
}

