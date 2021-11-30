import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tramite, TramiteRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class TramiteRepository extends DefaultCrudRepository<
  Tramite,
  typeof Tramite.prototype.id,
  TramiteRelations
> {

  public readonly tramitetienesolicitudes: HasManyRepositoryFactory<Solicitud, typeof Tramite.prototype.id>;

  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Tramite, dataSource);
    this.tramitetienesolicitudes = this.createHasManyRepositoryFactoryFor('tramitetienesolicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tramitetienesolicitudes', this.tramitetienesolicitudes.inclusionResolver);
  }
}
