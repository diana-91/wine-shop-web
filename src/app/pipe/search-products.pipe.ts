import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(items: any[], searchProducts: string, value:string): any {
    
    if(!items){
      return [];
    }

    if(!value){
      return items;
    }
      console.log('entra');
    const myPattern = new RegExp(value,'i');
    return items.filter(it => it[searchProducts].match(myPattern));
  }

}
