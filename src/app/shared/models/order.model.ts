export class Order {
  _userId: string;
  _productId: Array<string> = new Array();
  date: string;
  amount: Array<number> = new Array();
  state: string;
  totalPrice: number;
}
