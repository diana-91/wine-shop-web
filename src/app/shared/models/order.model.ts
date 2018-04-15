export class Order {
  id: string;
  _userId: string;
  _productId: Array<string> = new Array();
  date: string;
  amount: Array<number> = new Array();
  state: string;
  totalPrice: number;
}
