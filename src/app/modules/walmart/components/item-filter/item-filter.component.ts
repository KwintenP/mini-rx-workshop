import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

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
    </form>
  `,
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit {
  @Output() searchTermChange = new EventEmitter<string>();

  searchTermControl = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.searchTermControl.valueChanges
      .subscribe(this.searchTermChange);
  }
}
