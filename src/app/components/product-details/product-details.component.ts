import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | undefined;
  id: string | null = '';

  constructor(
    private actRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
      if (this.id) {
        const productId = Number(this.id);
        this.productService.getProductById(productId).subscribe(
          (product: IProduct) => {
            this.product = product;
          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
      }
    });
  }
}
