import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent {
  @Input() img:string = '';
  @Input() name: string = '';
  @Input() abilities:string[] = [];

}
