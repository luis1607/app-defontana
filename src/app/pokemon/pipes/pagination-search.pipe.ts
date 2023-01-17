import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';

@Pipe({
  name: 'paginationSearch'
})
export class PaginationSearchPipe implements PipeTransform {

  transform(list: Pokemon[]  , page:number = 0,search: string = '',limit:number=0):Pokemon[] {
    if ( search.length === 0 )
      {return list.slice(page, page + limit);}
      
        const filteredPokemons:Pokemon[] = list.filter( (poke:Pokemon ) => poke.name.includes( search ) || poke.name === search );
        return filteredPokemons.slice(page, page + limit);
  }

}
