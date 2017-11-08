import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShoppingListOverviewComponent} from './containers/shopping-list-overview/shopping-list-overview.component';
import {walmartRoutes} from './walmart.routes';
import {RouterModule} from '@angular/router';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemOverviewComponent } from './components/item-overview/item-overview.component';
import { ItemBasketComponent } from './components/item-basket/item-basket.component';
import {WalmartApiService} from './services/walmart-api.service';
import {HttpClientModule} from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasketService} from './services/basket.service';
import { BasketOverviewComponent } from './components/basket-overview/basket-overview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(walmartRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WalmartApiService,
    BasketService
  ],
  declarations: [ShoppingListOverviewComponent, ItemFilterComponent, ItemOverviewComponent, ItemBasketComponent, CardComponent, BasketOverviewComponent]
})
export class WalmartModule {
}
