import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: Product = new Product();
  apiError: string;
  currentCategory: any;
  category : Array<string> = ['Tinto','Blanco','Ecológico','Rosado'];

  private value:String = '';
@ViewChild('image') image;


  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onSubmitNewProduct(newProductForm){
    const image = this.image.nativeElement;
    this.product.category[0] = this.currentCategory[0].text;
    if (image.files && image.files[0]) {
      this.product.image = image.files[0];
      this.productService.create(this.product).subscribe(
        (user) => {
          newProductForm.reset();      },
        (error) => {
          this.apiError = error.message;
        }
      )
    }
  }




  public refreshValue(value:String):void {
    this.value = value;
  }


}
