import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../entities/item.entity';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <img class="card-img-top" [src]="item.thumbnailImage">
      <div class="card-body">
        <h4 class="card-title">{{item.name}}</h4>
        <p class="card-text">
          &euro;{{item.salePrice}} <br/>
          {{item.shortDescription}}
        </p>
        <a href class="btn btn-primary" (click)="addElementClicked(item, $event)">Add to cart</a>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: Item;
  @Output() addElementToCart = new EventEmitter<Item>();

  constructor() {
  }

  ngOnInit() {
  }

  addElementClicked(item, $event) {
    $event.preventDefault();
    this.addElementToCart.emit(item);
  }
}
