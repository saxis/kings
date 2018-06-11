import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {

  lists = [
    {
      itemName: 'Milk',
      checked: false
    },
    {
      itemName: 'Cheese',
      checked: true
    },
    {
      itemName: 'Break',
      checked: false
    }
  ]

  constructor() {
    console.log('Hello DataProvider Provider');
  }

}
