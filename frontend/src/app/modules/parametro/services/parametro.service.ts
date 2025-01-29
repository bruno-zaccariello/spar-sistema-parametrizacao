import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/environment';
import { Parametro, ParametroPut } from '../../../core/models/parametro.model';
import { BaseApiService } from '../../../core/services/base-api.service';

export type QueryParametroGetAll = {
  SistemaID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParametroService extends BaseApiService {

  protected apiContext = environment.apiParametro;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getParametro(id: number): Observable<Parametro> {
    return this.get<Parametro>(`${id}`);
  }

  public postParametro(sistema: Partial<Parametro>): Observable<Parametro> {
    return this.post<Parametro>('', sistema);
  }

  public putParametro(parametro: Partial<ParametroPut>): Observable<Parametro> {
    const parametroDTO = { ...parametro };
    delete parametroDTO.createdAt;
    return this.put<Parametro>(`${parametro.parametroID}`, parametroDTO);
  }

  public getAll(sistemaId?: number): Observable<Parametro[]> {
    const param: QueryParametroGetAll = { SistemaID: sistemaId };
    return this.get<Parametro[]>('');
  }

}
