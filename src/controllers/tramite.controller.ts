import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tramite} from '../models';
import {TramiteRepository} from '../repositories';

export class TramiteController {
  constructor(
    @repository(TramiteRepository)
    public tramiteRepository : TramiteRepository,
  ) {}

  @post('/tramites')
  @response(200, {
    description: 'Tramite model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tramite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tramite, {
            title: 'NewTramite',
            exclude: ['id'],
          }),
        },
      },
    })
    tramite: Omit<Tramite, 'id'>,
  ): Promise<Tramite> {
    return this.tramiteRepository.create(tramite);
  }

  @get('/tramites/count')
  @response(200, {
    description: 'Tramite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tramite) where?: Where<Tramite>,
  ): Promise<Count> {
    return this.tramiteRepository.count(where);
  }

  @get('/tramites')
  @response(200, {
    description: 'Array of Tramite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tramite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tramite) filter?: Filter<Tramite>,
  ): Promise<Tramite[]> {
    return this.tramiteRepository.find(filter);
  }

  @patch('/tramites')
  @response(200, {
    description: 'Tramite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tramite, {partial: true}),
        },
      },
    })
    tramite: Tramite,
    @param.where(Tramite) where?: Where<Tramite>,
  ): Promise<Count> {
    return this.tramiteRepository.updateAll(tramite, where);
  }

  @get('/tramites/{id}')
  @response(200, {
    description: 'Tramite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tramite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tramite, {exclude: 'where'}) filter?: FilterExcludingWhere<Tramite>
  ): Promise<Tramite> {
    return this.tramiteRepository.findById(id, filter);
  }

  @patch('/tramites/{id}')
  @response(204, {
    description: 'Tramite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tramite, {partial: true}),
        },
      },
    })
    tramite: Tramite,
  ): Promise<void> {
    await this.tramiteRepository.updateById(id, tramite);
  }

  @put('/tramites/{id}')
  @response(204, {
    description: 'Tramite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tramite: Tramite,
  ): Promise<void> {
    await this.tramiteRepository.replaceById(id, tramite);
  }

  @del('/tramites/{id}')
  @response(204, {
    description: 'Tramite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tramiteRepository.deleteById(id);
  }
}
