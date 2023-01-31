import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, defer, delay, Observable, repeat, switchMap, throwError, timer } from 'rxjs';
import { Time } from '../interfaces/time.interface';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  // private _baseUrl: string = environment.baseUrl;
  private _baseUrl!: string;
  private _apikey!: string;
  private isInitialice!: boolean;
  private timer$!: Observable<Time>;

  constructor( private http: HttpClient ) { 
    this._baseUrl = 'https://timezone.abstractapi.com/v1/current_time';
    this._apikey = 'f1a51fd0efba46b7840d71f20485da6c';
    this.isInitialice = true;

    const params = new HttpParams().appendAll({
      api_key : this._apikey,
      location: 'Oxford, United Kingdom'
    });

    this.timer$ = defer(() => {
      if ( this.isInitialice ) {

        this.isInitialice = false;
        return this.http.get<Time>(`${this._baseUrl}/`, {params}).pipe(
          catchError( this.controlError ),  
          delay(1000) 
        );

        
      } else {

        return timer(500).pipe(
          switchMap(() => this.http.get<Time>(`${this._baseUrl}/`, {params})),
          catchError( this.controlError ),   
          delay(5000)
        );

      } 

    }).pipe(
      repeat(5)
    )

  }
  
  getTime(): Observable<Time> {
    return this.timer$;
   }

   controlError( error: HttpErrorResponse ) {
    console.warn(error);
    return throwError(() => new Error('Error personalizado'));
   }
   
}
