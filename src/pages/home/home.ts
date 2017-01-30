import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
        this.loadMap();
    });
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     console.log("getting current position");
     console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = Geolocation.watchPosition();
    watch.subscribe((resp) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     console.log("watching position");
     console.log(resp.coords.latitude, resp.coords.longitude);
    });

    let location = new GoogleMapsLatLng(-34.9290,138.6010);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.setDebuggable(true);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log("map loaded");
    });
  }

}
