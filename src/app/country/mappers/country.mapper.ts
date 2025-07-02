import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from './../interfaces/country.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      FlagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  static mapRestCountryToCountryArray(restCountry: RESTCountry[]): Country[] {
    return restCountry.map(this.mapRestCountryToCountry);
  }
}
