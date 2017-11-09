import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-item-filter',
  template: `
    <h3>Search for elements</h3>
    <form>
      <div class="form-group row">
        <label for="searchTerm" class="col-sm- col-form-label">Search term</label>
        <div class="col-sm-6">
          <input
            [formControl]="searchTermControl"
            type="text" class="form-control" id="searchTerm" placeholder="Enter a search term">
        </div>
      </div>
      <div class="form-group row">
        <label for="priceFrom" class="col-sm- col-form-label">Price from</label>
        <div class="col-sm-4">
          <input
            [formControl]="priceFromControl"
            min="1"
            max="5000"
            type="range" class="form-control" id="priceFrom">
        </div>
        <div class="col-sm-2">
          {{priceFrom$ | async}}
        </div>
      </div>
      <div class="form-group row">
        <label for="priceTo" class="col-sm- col-form-label">Price to</label>
        <div class="col-sm-4">
          <input
            [formControl]="priceToControl"
            min="1"
            max="5000"
            type="range" class="form-control" id="priceTo">
        </div>
        <div class="col-sm-2">
          {{priceTo$ | async}}
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit, OnDestroy {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() priceFromChange = new EventEmitter<number>();
  @Output() priceToChange = new EventEmitter<number>();

  stop$ = new Subject();

  searchTermControl = new FormControl('');
  priceFromControl = new FormControl(1);
  priceToControl = new FormControl(5000);

  priceFrom$;
  priceTo$;

  constructor() {
  }

  ngOnInit() {
    this.priceFrom$ = this.priceFromControl.valueChanges
      .startWith(1)
      .shareReplay(1);

    this.priceTo$ = this.priceToControl.valueChanges
      .startWith(5000)
      .shareReplay(1);

    this.searchTermControl.valueChanges
      .takeUntil(this.stop$)
      .subscribe(this.searchTermChange);

    this.priceFrom$
      .debounceTime(250)
      .takeUntil(this.stop$)
      .subscribe(this.priceFromChange);

    this.priceTo$
      .debounceTime(250)
      .takeUntil(this.stop$)
      .subscribe(this.priceToChange);
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
