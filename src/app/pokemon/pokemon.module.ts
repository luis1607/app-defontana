import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { DashboardPokemonComponent } from './pages/dashboard-pokemon/dashboard-pokemon.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationSearchPipe } from './pipes/pagination-search.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DashboardPokemonComponent,
    DetailPokemonComponent,
    PaginationPipe,
    PaginationSearchPipe,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CommonModule,
    PokemonRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class PokemonModule {}
