import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-basket-overview',
  template: `
    <h3>Basket overview</h3>
    <form [formGroup]="basketOverviewFormGroup">
      <div class="form-group row">
        <label for="nrOfElements" class="col-sm- col-form-label">Number of elements</label>
        <div class="col-sm-6">
          <input readonly
                 formControlName="nrOfElements"
                 type="text" class="form-control" id="nrOfElements" placeholder="Number of elements">
        </div>
      </div>
      <div class="form-group row">
        <label for="totalPrice" class="col-sm- col-form-label">Total price</label>
        <div class="col-sm-6">
          <input readonly
                 formControlName="totalPrice"
                 type="text" class="form-control" id="totalPrice" placeholder="Total price">
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./basket-overview.component.scss']
})
export class BasketOverviewComponent implements OnInit {
  @Input()
  set nrOfElements(nrOfElements) {
    if (nrOfElements) {
      this.basketOverviewFormGroup.patchValue({nrOfElements});
    }
  }

  @Input()
  set totalPrice(totalPrice) {
    if (totalPrice) {
      this.basketOverviewFormGroup.patchValue({totalPrice});
    }
  }

  basketOverviewFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.basketOverviewFormGroup = this.formBuilder.group({
      nrOfElements: '',
      totalPrice: ''
    });
  }

}
