import { Component, OnInit } from '@angular/core';
import { count, map, Observable, startWith } from 'rxjs';
import { adapterPokemonDetail, adapterPokemonList } from '../../adapters/pokemons.adapter';
import {
  HEADER_TABLE_POKEMON,
  HEADER_TABLE_QUANTITY,
} from '../../constants/constants';
import { Pokemon, PokemonDetail, Quantity } from '../../interfaces/pokemon.interface';
import { LoaderService } from '../../services/loader.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-dashboard-pokemon',
  templateUrl: './dashboard-pokemon.component.html',
  styleUrls: ['./dashboard-pokemon.component.scss'],
})
export class DashboardPokemonComponent implements OnInit {
  
  pokemonFilter: Observable<Pokemon[]> = new Observable<Pokemon[]>();
  pokemonDetail: PokemonDetail = {} as PokemonDetail
  headerTablePokemon: string[] = HEADER_TABLE_POKEMON;
  headerTableQuantity: string[] = HEADER_TABLE_QUANTITY;
  listPokemon: Pokemon[] = [];
  listQuantityForFirstLetter: Quantity[] = [];

  pagePokems: number = 0;
  pageQuantity: number = 0;
  limitQuantity:number = 10;
  limitPokemon:number = 10;
  messageError:string = ''
  filterInput = '';

  constructor(private pokemonService: PokemonService,public loaderService:LoaderService) {}

  doFilter() {
    this.pokemonFilter = this.pokemonService
      .getPokemons()
      .pipe(map((pokemons) => this.filter(adapterPokemonList(pokemons))));
  }

  ngOnInit() {
    this.loaderService.showLoading();
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.loaderService.hideLoading();
      this.listPokemon = adapterPokemonList(pokemons);
      this.listQuantityForFirstLetter = this.getQuantityForFirstLetter(
        this.listPokemon
      );
    },error=>{
      this.loaderService.hideLoading();
      this.messageError = 'Error en el servicio'
    });
  }

  getQuantityForFirstLetter(listPokemon: Pokemon[]) {
    const objForCounter: any = {};
    let listQuantity: Quantity[] = [];
    listQuantity = listPokemon.map(({ name }: Pokemon) => {return { quantity: 0, letter: name.charAt(0) };});
    listQuantity.forEach((el: any) => {objForCounter[el.letter] = objForCounter[el.letter] + 1 || 1;});
    listQuantity = Object.entries(objForCounter).map((i: any) => {return { letter: i[0], quantity: i[1] };}).
      sort((x, y) => x.letter.localeCompare(y.letter));;
    return listQuantity;
  }

  filter(pokemons: Pokemon[]) {
    return pokemons.filter((poke: any) =>
      poke.name.toLowerCase().includes(this.filterInput)
    );
  }

  search() {
    this.filterInput = this.filterInput
    this.pagePokems = 0;
  }

  getDetailPokemon(name:string){
    this.messageError=''
    this.loaderService.showLoading();
    this.pokemonService.getDetailPokemon(name).subscribe(x=>{
      this.loaderService.hideLoading();
      this.pokemonDetail = adapterPokemonDetail(x)
    },error =>{
      this.messageError = 'Error en el servicio'
      this.loaderService.hideLoading();
    })
  }

  nextPage(type?: string) {
    switch (type) {
      case 'pokemon':
        this.pagePokems += this.limitPokemon;
        break;
      case 'quantity':
        this.pageQuantity += this.limitQuantity;
        break;
      default:
        break;
    }
  }

  prevPage(type?: string) {
    if (this.pagePokems > 0 || this.pageQuantity > 0) {
      switch (type) {
        case 'pokemon':
          this.pagePokems -= this.limitPokemon;
          break;
        case 'quantity':
          this.pageQuantity -= this.limitQuantity;
          break;
        default:
          break;
      }
    }
  }
}
