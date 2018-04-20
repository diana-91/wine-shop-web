import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  public transform(items: any[], searchProducts: string, value:string): any {

    if(!items){
      return [];
    }

    if(!value){
      return items;
    }
    const myPattern = new RegExp(value,'i');
    return items.filter(it => it[searchProducts].match(myPattern));
  }

}
