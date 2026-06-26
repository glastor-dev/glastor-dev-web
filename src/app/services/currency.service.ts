import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface DolarApiResponse {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private http = inject(HttpClient);

  getEurExchangeRate(): Observable<number> {
    return this.http.get<DolarApiResponse>('https://dolarapi.com/v1/cotizaciones/eur').pipe(
      map(response => response.venta),
      catchError(() => of(1100)) // Fallback rate if API fails
    );
  }
}
