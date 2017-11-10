import {Component, OnInit} from '@angular/core';
import {WalmartApiService} from '../../services/walmart-api.service';
import {Item} from '../../entities/item.entity';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {BasketService} from '../../services/basket.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-shopping-list-overview',
  template: `
    <div class="content">
      <div class="main">
        <app-item-filter (searchTermChange)="searchTerm$.next($event)"
                         (priceFromChange)="priceFrom$.next($event)"
                         (priceToChange)="priceTo$.next($event)"></app-item-filter>
        <app-item-overview [items]="foundItems$ | async"
                           (itemAdded)="itemAdded($event)"></app-item-overview>
      </div>
      <div class="main">
        <app-item-basket [items]="basket$ | async"
                         (removeItem)="removeItem($event)"
                         (oneExtra)="changeCount($event, 1)"
                         (oneLess)="changeCount($event, -1)"></app-item-basket>
        <app-discounts (vatFree)="vatFree$.next($event)"
                       (discountCode)="discountCode$.next($event)"></app-discounts>
        <app-basket-overview [nrOfElements]="nrOfElements$ | async"
                             [totalPrice]="totalPrice$ | async"></app-basket-overview>
      </div>
    </div>
  `,
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit {
  // Streams drawn from our child components
  searchTerm$ = new BehaviorSubject<string>('');
  priceFrom$ = new ReplaySubject<number>(1);
  priceTo$ = new ReplaySubject<number>(1);
  vatFree$ = new BehaviorSubject<boolean>(false);
  discountCode$ = new BehaviorSubject<number>(0);

  // Streams that will be passed to our view
  foundItems$: Observable<Array<Item>>;
  basket$: Observable<Array<Item>>;
  nrOfElements$: Observable<number>;
  totalPrice$: Observable<string>;

  // Intermediate stream used to clear results
  reset$ = new Subject<Array<any>>();

  constructor(private walmartApiService: WalmartApiService,
              private basketService: BasketService) {
  }

  ngOnInit() {
    const countTheNumberOfElements = (items: Array<Item>) => items.reduce<number>((acc: number, curr) => acc + curr.count, 0);
    const countTheTotalValueOfTheBasket =
      (items: Array<Item>) => items.reduce<number>((acc: number, curr) => acc + curr.count * curr.salePrice, 0);

    const clearData$ = this.reset$
      .mapTo([]);

    // The search term is a stream of all the input values

    // Debounce the stream with 200ms
    // Avoid two time the same value after one another
    // Filter out the string where the length is 1 or 0

    // We have a new stream called handledSearchTerm$ with a search term we can use to trigger
    const handledSearchTerm$ = this.searchTerm$;
    // TODO: implement (see instructions above)

    // We want to create a new stream based on the handledSearchTerm$, the priceForm$ and the priceTo$
    // Every time one of these streams changes, we need to do a new search

    // Create a new stream based on these streams that will emit every time one of them changes
    const searchFilter$; // TODO implement (see instructions above)

    // Based on our searchFilter$, we want to perform a backend call
    // What we want to do is map the searchFilter values to a backend call/async action and get the results to create a new stream

    // Based on the searchFilter$, perform a backend call (aka map the filter onto an async action)
    // Map the response to get the items from it
    const searchResults$;
    // TODO: implement (see instructions above)

    // These are already implemented for you
    this.foundItems$ = clearData$.merge(searchResults$);
    this.basket$ = this.basketService.basket$;

    // Create a new stream 'nrOfElements$' that hold the number of elements of the basket$
    // You can use the 'countTheNumberOfElements' method for the calculation
    this.nrOfElements$;

    // Create a new stream 'basketPrice$ ' that holds the basket price
    // You can use the 'countTheTotalValueOfTheBasket' method for the calculation
    const basketPrice$;

    // The totalPrice$ is a combination of the vatFree$, discountCode$ and the basketPrice$
    // Every time one changes, the totalPrice$ needs to be recalculated.
    // When a vatFree$ holds a true value, the 21% tax should be deducted.
    // The discount code works on the vatFreePrice
    this.totalPrice$;
    // TODO: implement (see instructions above)
  }

  itemAdded(item: Item) {
    this.basketService.addItem(item, 1);
  }

  changeCount(item: Item, toAdd: number) {
    this.basketService.addItem(item, toAdd);
  }

  removeItem(item: Item) {
    this.basketService.removeItem(item);
  }
}
