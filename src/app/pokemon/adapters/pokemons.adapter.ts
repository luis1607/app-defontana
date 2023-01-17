import { Pokemon, PokemonDetail, ResponseDetail, ResultItem } from "../interfaces/pokemon.interface";

export const adapterPokemonList = (listPokemon:ResultItem[]):Pokemon[]=>{
    return listPokemon.map( ({name,url })=>{
        let id = parseInt(url.split("/")[6]); 
        return {
            id: id,
            name: name,
            url: url
        }
    })
}

export const adapterPokemonDetail = ({abilities,id,name}:ResponseDetail):PokemonDetail=>{
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
    return {
        name: name,
        id:id,
        img: pic,
        abilities: abilities.map(x=>{
            return x.ability.name;
        })
    }
}