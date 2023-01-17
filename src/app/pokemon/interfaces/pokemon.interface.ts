export interface RequestList{
    limit?: number;
    offset?: number;
    next?:string;
    previous?:string;
}

export interface ResponseList{
    offset?: number;
    next?:string;
    previous?:string;
    results: ResultItem[]
}

export interface ResultItem{
    name: string;
    url:string
}

export interface Pokemon {
    name: string;
    url:string;
    id: number
}

export interface Quantity{
    letter:string;
    quantity?:number
}

export interface ResponseDetail{
    abilities: Ability[];
    id: number;
    name:string;
}

export interface PokemonDetail{
    id:number;
    abilities: string[];
    img: string;
    name:string
}

export interface Ability {
    ability:   Species;
    is_hidden: boolean;
    slot:      number;
}

export interface Species {
    name: string;
    url:  string;
}


