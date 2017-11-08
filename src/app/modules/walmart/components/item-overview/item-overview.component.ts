import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../entities/item.entity';

@Component({
  selector: 'app-item-overview',
  template: `
    <h3>Items found</h3>
    <div class="card-content">
      <app-card *ngFor="let item of items"
                (addElementToCart)="itemAdded.emit($event)"
                [item]="item"></app-card>
    </div>
  `,
  styleUrls: ['./item-overview.component.scss']
})
export class ItemOverviewComponent implements OnInit {
  @Input() items: Array<Item>;
  @Output() itemAdded = new EventEmitter<Item>();

  constructor() {
  }

  ngOnInit() {
  }

}
