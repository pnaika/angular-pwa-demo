/// <reference types="@types/googlemaps" />
import {Component, ElementRef, ViewChild} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {MapsAPILoader} from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-demo';
  @ViewChild('search') public searchElement: ElementRef;

  constructor(updates: SwUpdate, public mapApiLoader: MapsAPILoader) {
    this.getMapAPiLoader();
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => {
        document.location.reload();
      })
    })
  }

  getMapAPiLoader() {
    this.mapApiLoader.load().then(() => {
      new google.maps.places.Autocomplete(this.searchElement.nativeElement).getPlace();
    });
  }
}
