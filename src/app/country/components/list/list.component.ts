import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './list.component.html',
})
export class ListComponent {
  countries = input.required<Country[]>();
}
