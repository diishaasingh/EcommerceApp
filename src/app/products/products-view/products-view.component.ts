import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/products.model';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService, private router: Router) {} 

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

  goToProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }
}
