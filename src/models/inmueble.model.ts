import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tramite} from './tramite.model';
import {Solicitud} from './solicitud.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  area: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Tramite, {name: 'inmueblecontienetramite'})
  idTramite: number;

  @hasMany(() => Solicitud, {keyTo: 'idInmueble'})
  inmuebletienesolicitudes: Solicitud[];

  @property({
    type: 'number',
  })
  idCiudad?: number;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
