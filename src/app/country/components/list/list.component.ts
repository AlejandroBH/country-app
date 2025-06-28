import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.component.html',
})
export class ListComponent {
  countries = input.required<Country[]>();
}
