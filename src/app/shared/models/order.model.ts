export class Order {
  id: string;
  _userId: any;
  _productId: Array<any> = new Array();
  date: string;
  amount: Array<number> = new Array();
  state: string;
  totalPrice: number;
}
