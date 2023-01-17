
import { Injectable } from '@angular/core';
import { RequestList, ResponseDetail, ResponseList } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlPath = 'https://pokeapi.co/api/v2'

  constructor(private http:HttpClient) { }


  getPokemons (request?:RequestList){
    const url = `${this.urlPath}/pokemon/?limit=${request?.limit || 151}`
    return this.http.get<ResponseList>(url).pipe(
      map(response=>{
        return response.results
      })
    )
  }

  getDetailPokemon(name:string){
    const url = `${this.urlPath}/pokemon/${name}`
    return this.http.get<ResponseDetail>(url).pipe(
      map(response=>{
        return {
          abilities:response.abilities,
          id: response.id,
          name: response.name
        }
      })
    )
  }
}
