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

  protected apiContext = environment.apiSistema;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getSistema(id: number): Observable<Sistema> {
    return this.get<Sistema>(`${id}`);
  }

  public postSistema(sistema: Partial<Sistema>): Observable<Sistema> {
    return this.post<Sistema>('', sistema);
  }

  public putSistema(sistema: Partial<Sistema>): Observable<Sistema> {
    const sistemaDTO = { ...sistema };
    delete sistemaDTO.parametros;
    delete sistemaDTO.sistemaID;
    return this.put<Sistema>(`${sistema.sistemaID}`, sistemaDTO);
  }

  public getAll(): Observable<Sistema[]> {
    return this.get<Sistema[]>('');
  }

}
