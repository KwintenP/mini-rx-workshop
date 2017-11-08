import {Injectable} from '@angular/core';
import {Item} from '../entities/item.entity';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BasketService {
  basket$: Observable<Array<Item>>;

  private items$ = new Subject<{ type: 'ADD' | 'REMOVE', value: Item, count?: number }>();

  constructor() {
    this.basket$ = this.items$
      .scan<{ type: 'ADD' | 'REMOVE', value: Item, count?: number }, Array<Item>>(
        (acc: Array<Item>, curr: { type: 'ADD' | 'REMOVE', value: Item, count?: number }) => {
          switch (curr.type) {
            case 'ADD':
              const foundItem = acc.find(item => item.name === curr.value.name);
              if (foundItem) {
                return acc.map(item => item.name === curr.value.name ? {
                  ...item,
                  count: item.count + curr.count
                } : item)
                  .filter(item => item.count > 0);
              } else {
                return [...acc, {...curr.value, count: 1}];
              }
            case 'REMOVE':
              return acc.filter(item => item.name !== curr.value.name);
          }
        }, [])
      .do(console.log);
  }

  addItem(item, count) {
    this.items$.next({type: 'ADD', value: item, count});
  }

  removeItem(item) {
    this.items$.next({type: 'REMOVE', value: item});
  }
}
