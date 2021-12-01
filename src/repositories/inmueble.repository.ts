import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Tramite, Solicitud, Foto} from '../models';
import {TramiteRepository} from './tramite.repository';
import {SolicitudRepository} from './solicitud.repository';
import {FotoRepository} from './foto.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly inmueblecontienetramite: BelongsToAccessor<Tramite, typeof Inmueble.prototype.id>;

  public readonly inmuebletienesolicitudes: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.id>;

  public readonly inmuebletienefotos: HasManyRepositoryFactory<Foto, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource, @repository.getter('TramiteRepository') protected tramiteRepositoryGetter: Getter<TramiteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>,
  ) {
    super(Inmueble, dataSource);
    this.inmuebletienefotos = this.createHasManyRepositoryFactoryFor('inmuebletienefotos', fotoRepositoryGetter,);
    this.registerInclusionResolver('inmuebletienefotos', this.inmuebletienefotos.inclusionResolver);
    this.inmuebletienesolicitudes = this.createHasManyRepositoryFactoryFor('inmuebletienesolicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('inmuebletienesolicitudes', this.inmuebletienesolicitudes.inclusionResolver);
    this.inmueblecontienetramite = this.createBelongsToAccessorFor('inmueblecontienetramite', tramiteRepositoryGetter,);
    this.registerInclusionResolver('inmueblecontienetramite', this.inmueblecontienetramite.inclusionResolver);
  }
}
