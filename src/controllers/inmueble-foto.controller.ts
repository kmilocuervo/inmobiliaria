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
  Inmueble,
  Foto,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleFotoController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.inmuebleRepository.inmuebletienefotos(id).find(filter);
  }

  @post('/inmuebles/{id}/fotos', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInInmueble',
            exclude: ['id'],
            optional: ['idInmueble']
          }),
        },
      },
    }) foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.inmuebleRepository.inmuebletienefotos(id).create(foto);
  }

  @patch('/inmuebles/{id}/fotos', {
    responses: {
      '200': {
        description: 'Inmueble.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.inmuebleRepository.inmuebletienefotos(id).patch(foto, where);
  }

  @del('/inmuebles/{id}/fotos', {
    responses: {
      '200': {
        description: 'Inmueble.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.inmuebleRepository.inmuebletienefotos(id).delete(where);
  }
}
