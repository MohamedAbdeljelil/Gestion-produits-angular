import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {NewProductsComponent} from "./new-products/new-products.component";
import {EditProductComponent} from './edit-product/edit-product.component';


const routes: Routes = [
  {
    path : "products",
    component : ProduitsComponent
  },
  {
    path : "new-product",
    component : NewProductsComponent
  },
  {
    path :"",
    redirectTo : "/products",
    pathMatch : 'full'
  },
  {
    path : "edit-product/:id",
    component : EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
