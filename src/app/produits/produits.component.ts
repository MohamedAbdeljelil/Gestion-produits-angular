import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {


  public produits : any;
  public size=5;
  public currenPage=0;
  public totalPages : number;
  public pages:Array<number>;
  private currentKeyword: string;
  constructor(private catService : CatalogueService,private router : Router) { }

  ngOnInit(): void {

  }

  onGetProducts() {
    this.catService.getProducts(this.currenPage,this.size).subscribe(
  data => {
      this.totalPages=data["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
    this.produits=data;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  )
  }

  onPageProducts(i: number) {
    this.currenPage=i;
    this.chercherProduits();
  }
  onChercher(value: any) {
    this.currenPage=0;
    this.currentKeyword=value.keyword;
    this.chercherProduits();

  }

  chercherProduits() {
    this.catService.getProductsByKeyword(this.currentKeyword,this.currenPage,this.size).subscribe(
      data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )

  }

  onDeleteProduit(p: any) {
    let conf=confirm("Etes vous sure ?");
    if(conf){
      this.catService.deleteResource(p._links.self.href).subscribe(
        data => {
          this.chercherProduits();
          this.onGetProducts();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  onEditProduit(p) {
    let url=p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url))

  }
}
