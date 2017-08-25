import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation) {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    // setInterval(() => this.geolocation.getCurrentPosition(options).then(e => console.log("yay " + JSON.stringify(e))).catch(e => console.error("Error on get " + e.message)), 2000);
    
  }

  startTracking() {
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    console.log("Started tracking");

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log("background - " + JSON.stringify(location));

      if (!location) return;

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.error("Failed background - " + err.message || err);

    });

    console.log("Started background geolocation");

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    console.log("Started foreground geolocation");

    this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {

      console.log("foreground - " + JSON.stringify(position));

      if (position.coords === undefined) return;

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }, e => console.error("Failed foreground - " + e || e.message));
  }

  stopTracking() {
    if (!this.watch) return;

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}