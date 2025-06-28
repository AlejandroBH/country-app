import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from './../interfaces/country.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      FlagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital.join(','),
      population: restCountry.population,
    };
  }

  static mapRestCountryToCountryArray(restCountry: RESTCountry[]): Country[] {
    return restCountry.map(this.mapRestCountryToCountry);
  }
}
