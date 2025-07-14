import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Model/common.model';

@Injectable({
  providedIn: 'root',
})
export class DataLookupService {
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  setSelectedProduct(product: Product) {
    this.selectedProductSubject.next(product);
  }

  private products: Product[] = [];

  setProducts(data: Product[]) {
    this.products = data;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
