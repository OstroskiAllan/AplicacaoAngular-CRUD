import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0,
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = {
      name: '',
      price: 0,
      id: 0,
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      });
    }
  }


  deleteProduct(): void {
    if (this.product.id !== undefined) {
      this.productService.delete(this.product.id).subscribe(() => {
        this.productService.showMessage('Produto excluido com sucesso!');
        this.router.navigate(['/products']);
      })
    }
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }
}
