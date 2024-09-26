import 'reflect-metadata';
import { Container, inject, injectable } from 'inversify';
import DBConnectionHelper from './DBConnectionHelper';
import DBConnectionHelperTypeORM from './DBConnectionHelperTypeORM';
import DBConnectionOfflineHelperTypeORM from './DBConnectionOfflineHelperTypeORM';
import EnvironmentHelper from '../helpers/EnvironmentHelper';

@injectable()
export default class DBConnectionHelperFactory {
  constructor(
    @inject(Container) private container: Container
    ) {}
    
    public create(): DBConnectionHelper {
      const connectionHelperMap: { [key: string]: typeof DBConnectionOfflineHelperTypeORM | typeof DBConnectionHelperTypeORM } = {
        'local': DBConnectionOfflineHelperTypeORM,
        'staged': DBConnectionHelperTypeORM
      }
      const connectionHelperType = connectionHelperMap[EnvironmentHelper.MODE];
      return this.container.resolve<DBConnectionHelper>(connectionHelperType);
    }
}