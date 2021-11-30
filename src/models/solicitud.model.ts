import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
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
  mensaje: string;

  @property({
    type: 'number',
    required: true,
  })
  idUsuario: number;

  @property({
    type: 'number',
    required: true,
  })
  idAsesor: number;

  @property({
    type: 'number',
  })
  idInmueble?: number;

  @property({
    type: 'number',
  })
  idEstado?: number;

  @property({
    type: 'number',
  })
  idTramite?: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
