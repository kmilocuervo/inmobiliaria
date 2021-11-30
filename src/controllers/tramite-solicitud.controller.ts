import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tramite,
  Solicitud,
} from '../models';
import {TramiteRepository} from '../repositories';

export class TramiteSolicitudController {
  constructor(
    @repository(TramiteRepository) protected tramiteRepository: TramiteRepository,
  ) { }

  @get('/tramites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Tramite has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.tramiteRepository.tramitetienesolicitudes(id).find(filter);
  }

  @post('/tramites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tramite model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tramite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInTramite',
            exclude: ['id'],
            optional: ['idTramite']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.tramiteRepository.tramitetienesolicitudes(id).create(solicitud);
  }

  @patch('/tramites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tramite.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tramiteRepository.tramitetienesolicitudes(id).patch(solicitud, where);
  }

  @del('/tramites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tramite.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tramiteRepository.tramitetienesolicitudes(id).delete(where);
  }
}
