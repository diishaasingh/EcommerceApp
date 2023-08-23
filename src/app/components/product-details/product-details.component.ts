import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/app/models/products.model';

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
    private productService: ProductService,
    private cartService: CartService,
    private router: Router 
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

  onAddToCartClick() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  onViewCartClick() {
    this.router.navigate(['/cart', { productId: this.id }]);
  }
  
}
