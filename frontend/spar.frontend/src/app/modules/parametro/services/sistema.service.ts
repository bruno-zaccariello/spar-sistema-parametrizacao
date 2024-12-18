import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/environment';
import { Sistema } from '../../../core/models/sistema.model';
import { BaseApiService } from '../../../core/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SistemaService extends BaseApiService {

  protected apiContext = environment.apiParametro;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getParametro(id: number): Observable<Sistema> {
    return this.get<any>(`${id}`);
  }

  public getAll() {
    return this.get<any>('');
  }

}
