import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterPokemonDetail, adapterPokemonList } from '../../adapters/pokemons.adapter';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';
import { Pokemon, ResultItem } from '../../interfaces/pokemon.interface';
import { responseDetail, responsePokemons } from '../../mock/pokemon-mock';
import { PaginationSearchPipe } from '../../pipes/pagination-search.pipe';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { PokemonService } from '../../services/pokemon.service';
import {of} from 'rxjs'


import { DashboardPokemonComponent } from './dashboard-pokemon.component';

const PokemonServiceMock = {
  getPokemons: () => of(responsePokemons),
};

describe('DashboardPokemonComponent', () => {
  const arrayPokemon:ResultItem[] = responsePokemons;
  // const listPokemon:Pokemon[] = adapterPokemonList(arrayPokemon)
  let service: PokemonService;

  let component: DashboardPokemonComponent;
  let fixture: ComponentFixture<DashboardPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardPokemonComponent,
        PaginationPipe,
        PaginationSearchPipe,
        DetailPokemonComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers:[
        PokemonService,
        {
          provide: PokemonService,
          useValue: PokemonServiceMock
      },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(PokemonService);
        spyOn(service, 'getPokemons').and.callFake( () => of(arrayPokemon));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return how many porkemons start with each letter - there is two pokemon start with letter b',()=>{
    const newArraywithQuantity = component.getQuantityForFirstLetter(adapterPokemonList(arrayPokemon))
    console.log("que es esto",newArraywithQuantity)
    expect(newArraywithQuantity[0].quantity).toBe(2)
  })

  it('should increment and decrement in pagination pokemon',()=>{
    component.nextPage('pokemon');
    expect(component.pagePokems).toBe(10)
    component.prevPage('pokemon');
    expect(component.pagePokems).toBe(0)
  })

  it('should increment and decrement in pagination quantity',()=>{
    component.nextPage('quantity');
    expect(component.pageQuantity).toBe(10)
    component.prevPage('quantity')
    expect(component.pageQuantity).toBe(0)
  })

  it('should request service pokemons and return 11 pokemons',()=>{
    component.ngOnInit()
    expect(component.listPokemon.length).toBe(11)
  })

  it('should filter pokemon - in this case should return a bulbasaur only one',()=>{
    component.filterInput = 'bulbasaur';
    const result = component.filter(adapterPokemonList(adapterPokemonList(arrayPokemon)))
    expect(result.length).toBe(1)
  })

});
