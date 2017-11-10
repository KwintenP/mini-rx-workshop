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

    const handledSearchTerm$ = this.searchTerm$
      .do(_ => this.reset$.next([]))
      .debounceTime(200)
      .distinctUntilChanged()
      .filter(item => item.length > 1);

    const searchFilter$ = Observable.combineLatest(handledSearchTerm$, this.priceFrom$, this.priceTo$);

    const searchResults$ = searchFilter$
      .switchMap(([searchTerm, priceFrom, priceTo]) => this.walmartApiService.searchItems(searchTerm, 0, priceFrom, priceTo))
      .map(response => response.items);

    this.foundItems$ = clearData$.merge(searchResults$);

    this.basket$ = this.basketService.basket$;

    this.nrOfElements$ = this.basket$
      .map(countTheNumberOfElements);

    const basketPrice$ = this.basket$
      .map(countTheTotalValueOfTheBasket);

    this.totalPrice$ = basketPrice$.combineLatest(this.vatFree$, (basketPrice, vatFree) => vatFree ? basketPrice / 1.21 : basketPrice)
      .combineLatest(this.discountCode$, (vatBasketPrice, discountCode) => vatBasketPrice - discountCode)
      .map(totalValue => totalValue.toFixed(1));
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
