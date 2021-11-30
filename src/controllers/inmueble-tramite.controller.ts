import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Tramite,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTramiteController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tramite', {
    responses: {
      '200': {
        description: 'Tramite belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tramite)},
          },
        },
      },
    },
  })
  async getTramite(
    @param.path.number('id') id: typeof Inmueble.prototype.id,
  ): Promise<Tramite> {
    return this.inmuebleRepository.inmueblecontienetramite(id);
  }
}
