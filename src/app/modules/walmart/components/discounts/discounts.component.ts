import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-discounts',
  template: `
    <form>
      <div class="form-check">
        <label class="form-check-label">
          <input type="checkbox" class="form-check-input" [formControl]="vatFormControl">
          VAT free
        </label>
      </div>
    </form>
    <form class="form-inline">
      <div class="form-group mx-sm-3">
        <label for="discountCode" class="sr-only">Discount code</label>
        <input type="text" class="form-control" id="discountCode" placeholder="Discount code"
               [formControl]="discountCodeFormControl">
      </div>
      <button type="submit" class="btn btn-primary" (click)="discountCode.emit(discountCodeFormControl.value)">Update
      </button>
    </form>
  `,
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  @Output() vatFree = new EventEmitter<boolean>();
  @Output() discountCode = new EventEmitter<number>();

  vatFormControl = new FormControl(false);
  discountCodeFormControl = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.vatFormControl.valueChanges
      .subscribe(this.vatFree);
  }

}
