import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Estado, EstadoRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly estadotienesolicitudes: HasManyRepositoryFactory<Solicitud, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Estado, dataSource);
    this.estadotienesolicitudes = this.createHasManyRepositoryFactoryFor('estadotienesolicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('estadotienesolicitudes', this.estadotienesolicitudes.inclusionResolver);
  }
}
