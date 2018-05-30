import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private gl:GeolocationService, 
              private router: Router, 
              private ds: DataService) { }

  tastingEnabled: boolean = false;
  routingSubscription: any;
  coffee: Coffee;
  types = ["Expresso", "Ristretto", "Americano", "Cappuccino", "Sweetner"];

  tastingRatingChanged(checked: boolean) {
    if( checked){
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this.route.params.subscribe(
      params => {
        console.log(params["id"]);
        if(params["id"]) {
          this.ds.get(params["id"], res =>{
            this.coffee = res;
            if(this.coffee.tastingRating) {
              this.tastingEnabled = true;
            }
          });
        }
      }
    );

    this.gl.requestLocation(location => {
      if(location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    })
  }

  ngOnDestroy(){
    this.routingSubscription.unsubscribe();
  }

  cancel(){
    this.router.navigate(['/']);
  }

  save(){
    this.ds.save(this.coffee, result => {
      if(result) {
        this.router.navigate(["/"]);
      }
    })
  }

}
