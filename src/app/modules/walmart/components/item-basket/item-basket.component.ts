import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../entities/item.entity';

@Component({
  selector: 'app-item-basket',
  template: `
    <h3>Basket List</h3>
    <table class="table" *ngIf="items">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Count</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let item of items">
        <td>{{item.name}}</td>
        <td>{{item.salePrice}}</td>
        <td>{{item.count}}</td>
        <td>
          <i class="fa fa-trash-o" aria-hidden="true" (click)="removeItem.emit(item)"></i>
          <i class="fa fa-plus" aria-hidden="true" (click)="oneExtra.emit(item)"></i>
          <i class="fa fa-minus" aria-hidden="true" (click)="oneLess.emit(item)"></i>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./item-basket.component.scss']
})
export class ItemBasketComponent implements OnInit {
  @Input() items: Array<Item>;
  @Output() removeItem = new EventEmitter<Item>();
  @Output() oneExtra = new EventEmitter<Item>();
  @Output() oneLess = new EventEmitter<Item>();

  constructor() {
  }

  ngOnInit() {
  }

}
