import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public fWatch: any;
  public bWatch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation) {
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    // setInterval(() => this.geolocation.getCurrentPosition(options).then(e => console.log("yay " + JSON.stringify(e))).catch(e => console.error("Error on get " + e.message)), 2000);
    this.bWatch = this.backgroundGeolocation.configure(config).subscribe((location) => {
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
  }

  startTracking() {
    console.log("Started tracking");

    console.log("Started background geolocation");
    this.backgroundGeolocation.start();

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.fWatch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      
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
    if (!this.fWatch) return;

    console.log('stopTracking');

    this.backgroundGeolocation.stop();
    this.fWatch.unsubscribe();

    this.fWatch = null;
  }
}