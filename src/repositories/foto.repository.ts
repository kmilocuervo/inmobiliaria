import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Foto, FotoRelations} from '../models';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {
  constructor(
    @inject('datasources.MYSQL') dataSource: MysqlDataSource,
  ) {
    super(Foto, dataSource);
  }
}
