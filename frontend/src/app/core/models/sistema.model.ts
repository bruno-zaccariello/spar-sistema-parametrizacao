import { Parametro } from "./parametro.model";

export class Sistema {
    constructor(
        public sistemaID?: number,
        public nome?: string,
        public descricao?: string,
        public parametros?: Parametro[]
    ) { }
}