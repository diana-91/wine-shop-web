export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Array<string> = new Array();
}
