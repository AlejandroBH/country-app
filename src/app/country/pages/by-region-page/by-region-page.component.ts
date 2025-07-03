import { Component, inject, signal } from '@angular/core';
import { CountryService } from './../../services/country.service';
import { ListComponent } from '../../components/list/list.component';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      return this.countryService.searchByRegion(request.region);
    },
  });
}
