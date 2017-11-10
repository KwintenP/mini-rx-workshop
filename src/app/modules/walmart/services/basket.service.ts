import {Injectable} from '@angular/core';
import {Item} from '../entities/item.entity';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BasketService {
  basket$: Observable<Array<Item>>;

  private items$ = new Subject<{ type: 'ADD' | 'REMOVE', value: Item, count?: number }>();

  constructor() {
    // Create basket$ based on the items$
    // When the type is 'ADD':
    //  - if the item is already in the items: Add the count to the current count (this can be negative)
    //    if the new amount is 0, remove it
    //  - if it is not already in the items, add the item with a count of 1
    // When the type is 'REMOVE':
    //  - Remove the item from the list

    // REMEMBER IMMUTABILITY IS KEY HERE
    this.basket$;
  }

  addItem(item, count) {
    this.items$.next({type: 'ADD', value: item, count});
  }

  removeItem(item) {
    this.items$.next({type: 'REMOVE', value: item});
  }
}
