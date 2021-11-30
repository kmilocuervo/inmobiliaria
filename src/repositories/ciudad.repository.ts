import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly ciudadtieneinmuebles: HasManyRepositoryFactory<Inmueble, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Ciudad, dataSource);
    this.ciudadtieneinmuebles = this.createHasManyRepositoryFactoryFor('ciudadtieneinmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('ciudadtieneinmuebles', this.ciudadtieneinmuebles.inclusionResolver);
  }
}
