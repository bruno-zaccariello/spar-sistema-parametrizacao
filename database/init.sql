-- SQL script to initialize the PostgreSQL database

CREATE SCHEMA IF NOT EXISTS "SPARO" AUTHORIZATION sparu;

CREATE TABLE IF NOT EXISTS "SPARO"."TSistema"
(
    "ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999 ),
    nome_sistema character varying(20) NOT NULL,
    descricao_sistema character varying(150) NOT NULL,
    PRIMARY KEY ("ID")
);

ALTER TABLE IF EXISTS "SPARO"."TSistema" OWNER to sparu;

CREATE TABLE IF NOT EXISTS "SPARO"."TParametro"
(
    "ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999 ),
    chave character varying(30) NOT NULL,
    "valorJson" jsonb NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sistema_id bigint NOT NULL,
    CONSTRAINT "TParametro_pkey" PRIMARY KEY ("ID"),
    CONSTRAINT "FKTParametro_Tsistema" FOREIGN KEY (sistema_id)
        REFERENCES "SPARO"."TSistema" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS "SPARO"."TParametro" OWNER to sparu;