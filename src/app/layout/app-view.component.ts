import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-view',
    templateUrl: 'app-view.component.html',
    host: {
        class: 'app-view'
    },
    styleUrls: ['app-view.component.scss']

})
export class AppViewComponent {

    private _toolbarTitle = 'Weather App';

    @Input()
    set toolbarTitle(title){
        this._toolbarTitle = title;
        document.title = title;
    }

    get toolbarTitle(){
        return this._toolbarTitle;
    }

    @Input()
    layout = 'center-center';


}


