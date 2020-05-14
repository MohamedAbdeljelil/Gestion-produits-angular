import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';
import {discardPeriodicTasks} from '@angular/core/testing';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public currentProduct: Product;
  private url: string;

  constructor(private catService : CatalogueService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.url=atob(this.activatedRoute.snapshot.params.id)
    console.log(this.url);
    this.catService.getResource(this.url).subscribe(
      data => {
        this.currentProduct=data;
      },
      err => {
        console.log(err);
      }
    )
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url,value).subscribe(
      data => {
        alert("Mise a jour effectue avec succes");
        this.router.navigateByUrl("/products");
      },
      err => {
        console.log(err);
      }
    )
  }
}
