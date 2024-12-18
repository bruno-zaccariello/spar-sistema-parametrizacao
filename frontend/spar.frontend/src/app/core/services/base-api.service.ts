import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';

type QueryParams = { [key: string]: string | number | boolean };

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  protected env = environment;
  protected apiUrl = environment.apiUrl;

  protected abstract apiContext: string;
  protected abstract http: HttpClient;

  protected get<T>(endpoint: string, params?: QueryParams, headers?: HttpHeaders): Observable<T> {
    const options = headers ? { headers } : {};
    params = this.tratarParamNulo(params);
    if (endpoint.startsWith('/')) {
      return this.http.get<T>(`${this.apiUrl}${this.apiContext}${endpoint}`, { params, ...options });
    }
    return this.http.get<T>(`${this.apiUrl}${this.apiContext}/${endpoint}`, { params, ...options });
  }

  protected post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const options = headers ? { headers } : {};
    if (endpoint.startsWith('/')) {
      return this.http.post<T>(`${this.apiUrl}${this.apiContext}${endpoint}`, body, options);
    }
    return this.http.post<T>(`${this.apiUrl}${this.apiContext}/${endpoint}`, body, options);
  }

  protected put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const options = headers ? { headers } : {};
    if (endpoint.startsWith('/')) {
      return this.http.put<T>(`${this.apiUrl}${this.apiContext}${endpoint}`, body, options);
    }
    return this.http.put<T>(`${this.apiUrl}${this.apiContext}/${endpoint}`, body, options);
  }

  protected delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const options = headers ? { headers } : {};
    if (endpoint.startsWith('/')) {
      return this.http.delete<T>(`${this.apiUrl}${this.apiContext}${endpoint}`, options);
    }
    return this.http.delete<T>(`${this.apiUrl}${this.apiContext}/${endpoint}`, options);
  }

  private tratarParamNulo(obj: any) {
    if (!obj) { return obj; }
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== null && obj[key] !== undefined) {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as QueryParams);
  }
}
