Locations
<div *ngIf="locations != 0">
    <div *ngFor="let loc of locations"> 
        <div *ngFor="let cast of loc">
        </div>
        <p>{{loc.type}}</p>
        <p *ngIf="{{loc.cityName}}">{{loc.cityName}}</p>
        <p>Lat: {{loc.lat}} Lng: {{loc.lng}}</p>
        <img src="http://openweathermap.org/img/w/{{cast.conditionIcon}}" alt="{{cast.condition}}">
    </div>
</div>