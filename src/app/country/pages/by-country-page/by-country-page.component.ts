import { Component, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ListComponent } from '../../components/list/list.component';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      return this.countryService.searchByCountry(request.query);
    },
  });
}
