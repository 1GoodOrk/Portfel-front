import { HttpClient, HttpParams, HttpHeaders, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, ErrorNotification, retry, shareReplay, take, scheduled, asapScheduler } from 'rxjs';

interface IRequestOptions {
  url: string;
  headers?: HttpHeaders | Record<string, string | string[]> | undefined;
  context?: HttpContext;
  params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
}
export class HttpGenericService {

  constructor(
    private httpClient: HttpClient
  ) {}

  private getRequest<T>(options: IRequestOptions): Observable<T> {
    return this.httpClient.get<T>(options.url, options)
  }

  protected getRequestProcessing<T>(options: IRequestOptions): Observable<T>{
    return this.getRequest<T>(options)
      .pipe(
        retry(3),
        take(1),
        shareReplay(1),
        catchError((error: ErrorNotification) => {
          console.error('Error fetching data', error);
          return scheduled<T>([], asapScheduler);
        })
      )
  }

  private postRequest<T, F>(options: IRequestOptions, body: F): Observable<T> {
    return this.httpClient.post<T>(options.url, body, options)
  }

  protected postRequestProcessing<T, F>(options: IRequestOptions, body: F): Observable<T>  {
    return this.postRequest<T, F>(options, body)
      .pipe(
        retry(3),
        take(1),
        shareReplay(1),
        catchError((error: ErrorNotification) => {
          console.error('Error fetching data', error);
          return scheduled<T>([], asapScheduler);
        })
      )
  }

  private putRequest<T, F>(options: IRequestOptions, body: F): Observable<T> {
    return this.httpClient.put<T>(options.url, body, options)
  }

  protected putRequestProcessing<T, F>(options: IRequestOptions, body: F): Observable<T> {
    return this.putRequest<T, F>(options, body)
      .pipe(
        retry(3),
        take(1),
        shareReplay(1),
        catchError((error: ErrorNotification) => {
          console.error('Error fetching data', error);
          return scheduled<T>([], asapScheduler);
        })
      )
  }

  private deleteRequest<T>(options: IRequestOptions): Observable<T> {
    return this.httpClient.delete<T>(options.url, options)
  }

  protected deleteRequestProcessing<T>(options: IRequestOptions): Observable<T> {
    return this.deleteRequest<T>(options)
      .pipe(
        retry(3),
        take(1),
        shareReplay(1),
        catchError((error: ErrorNotification) => {
          console.error('Error fetching data', error);
          return scheduled<T>([], asapScheduler);
        })
      )
  }
}
