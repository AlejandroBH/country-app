import { CountryMapper } from '../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, of, tap, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import type { Region } from '../interfaces/region.type';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const URL = `${API_URL}/capital/${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(URL).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener capitales con ese query ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const URL = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(URL).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const URL = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(URL).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener regiones con ese query ${region}`)
        );
      })
    );
  }

  searchByCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const URL = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(URL).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      map((countries) => countries.at(0)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese codigo ${code}`)
        );
      })
    );
  }
}
