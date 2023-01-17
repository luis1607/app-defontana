import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon, Quantity } from '../interfaces/pokemon.interface';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(list: Quantity[]  , page:number = 0, limit:number = 0): Quantity[] {
    return list.slice(page, page + limit);
  }

}
