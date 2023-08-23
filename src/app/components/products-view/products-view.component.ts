import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/products.model';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  @Output() viewDetails: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  products: IProduct[] = [];
  router: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
