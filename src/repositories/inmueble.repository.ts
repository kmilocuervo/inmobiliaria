import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Tramite, Solicitud} from '../models';
import {TramiteRepository} from './tramite.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly inmueblecontienetramite: BelongsToAccessor<Tramite, typeof Inmueble.prototype.id>;

  public readonly inmuebletienesolicitudes: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource, @repository.getter('TramiteRepository') protected tramiteRepositoryGetter: Getter<TramiteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.inmuebletienesolicitudes = this.createHasManyRepositoryFactoryFor('inmuebletienesolicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('inmuebletienesolicitudes', this.inmuebletienesolicitudes.inclusionResolver);
    this.inmueblecontienetramite = this.createBelongsToAccessorFor('inmueblecontienetramite', tramiteRepositoryGetter,);
    this.registerInclusionResolver('inmueblecontienetramite', this.inmueblecontienetramite.inclusionResolver);
  }
}
