import { Injectable } from '@angular/core';
import { CountedItem } from './shared/models';

@Injectable()
export class PetService {

  constructor() { }

  public getPets(): CountedItem[] {
    let pets: CountedItem[];
    pets.push({
      name: 'cat',
      count: 10
    });
    pets.push({
      name: 'dog',
      count: 15
    })
    pets.push({
      name: 'fish',
      count: 3
    })
    return pets;
  }
}
