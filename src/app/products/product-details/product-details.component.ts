import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { CartService } from 'src/app/cart/cart.service';
import { IProduct } from 'src/app/models/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct ;
  id: string | null = '';
  showMessage: boolean = false; 

  constructor(
    private snackBar: MatSnackBar,
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
      console.log('added to cart')
      this.displayAddToCart('Added to cart','Dismiss'); 
      setTimeout(() => {
        this.showMessage = false; 
      }, 2000); 
    }
  }

  onViewCartClick() {
    this.router.navigate(['/cart', { productId: this.id }]);
  }

  displayAddToCart(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right', 
    });
  }
}
