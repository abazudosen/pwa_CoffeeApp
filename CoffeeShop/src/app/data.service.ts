import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public endpoint = "http://localhost:3000";

  constructor(private http: Http) { }

  get(coffeeId, callback){
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`).subscribe(res => {
      callback(res.json());
    })
  }

  getList(callback) {
    // const list = [
    //   new Coffee("Double Expressor", "Sunny Cafe", new PlaceLocation("123 Market Street", "San Franciso")),
    //   new Coffee("Caranel Americano", "starboxx", new PlaceLocation("Gran Via 34", "Madrid"))
    // ];
    // callback(list);

    this.http.get(`${this.endpoint}/coffees`).subscribe(res => {
      console.log(res.json());
      callback(res.json());
    });
    
  }

  save(coffee, callback){
    
    //TODO UPDATE
    if(coffee._id){
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee).subscribe(res =>{
        callback(true);
      });
    } else {
      //TODO INSERT
      this.http.post(`${this.endpoint}/coffees`, coffee).subscribe(res => {
        callback(true);
      })
    }
    
  }
}
