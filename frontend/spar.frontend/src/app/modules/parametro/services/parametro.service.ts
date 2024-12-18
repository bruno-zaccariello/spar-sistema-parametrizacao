import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/environment';
import { Parametro } from '../../../core/models/parametro.model';
import { BaseApiService } from '../../../core/services/base-api.service';


export type QuerySistemaGetAll = {
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
    return this.get<any>(`${id}`);
  }

  public getAll(sistemaId?: number) {
    const param: QuerySistemaGetAll = { SistemaID: sistemaId };
    return this.get<any>('', param);
  }

}
