export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Array <string> = new Array;

  public asFormData(): FormData {
        const data = new FormData();
        data.append('name', this.name);
        data.append('description', this.description);
        for (let cat of this.category) {
            data.append('category', cat);
        }
        data.append('price', this.price.toString());
        data.append('image', this.image);

        return data;
    }
}
