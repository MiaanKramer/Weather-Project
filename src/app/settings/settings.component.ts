import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SettingsService, Settings } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    formGroup = new FormGroup({
        apiKey: new FormControl('', [Validators.required, Validators.min(10)], [this.validateApiKey.bind(this)]),
        unitType: new FormControl('metric', [Validators.required])
    });

    constructor(
        public settingsService: SettingsService,
        private _router: Router,
        private _snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.formGroup.reset(this.settingsService.get());
    }

    reset() {
        this.settingsService.reset();
        this.formGroup.reset(this.settingsService.get());
    }

    save() {

        if(this.formGroup.valid){

            let settings = this.formGroup.value;
            this.settingsService.set(settings);
            this._snackbar.open("Settings saved!", null, {duration: 4000});
            this._router.navigate(['/home']);
        }else{
            this._snackbar.open("Settings invalid", null, { duration: 4000 });
        }

    }

    validateApiKey(control: AbstractControl){
        return this.settingsService
                    .validateApiKey(control.value)
                    .map(result => {
                        console.log('validation ', result);
                        if(result) return null;
                        else return { invalidApiKey: true };
                    });
    }


}
