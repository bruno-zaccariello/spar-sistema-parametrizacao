import { Sistema } from "./sistema.model";

export class Parametro {
    parametroID!: number;
    chave!: string;
    valorJson!: string;
    createdAt!: Date;
    sistema!: Sistema;
}