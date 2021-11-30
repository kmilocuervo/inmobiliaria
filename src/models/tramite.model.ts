import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Tramite extends Entity {
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
  nombre: string;

  @hasMany(() => Solicitud, {keyTo: 'idTramite'})
  tramitetienesolicitudes: Solicitud[];

  constructor(data?: Partial<Tramite>) {
    super(data);
  }
}

export interface TramiteRelations {
  // describe navigational properties here
}

export type TramiteWithRelations = Tramite & TramiteRelations;
