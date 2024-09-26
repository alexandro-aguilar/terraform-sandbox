import { Container } from 'inversify';
import IaCProvider from './provider/IaCProvider';
import TYPES from './TYPES';
import LocalIaCProvider from './provider/LocalIaCProvider';


const container: Container = new Container();
container.bind<Container>(Container).toConstantValue(container);


container.bind<IaCProvider>(TYPES.IaCProvider).to(LocalIaCProvider);
// container.bind<IaCProvider>(TYPES.IaCProvider).to(AwsIaCProvider);


export default container;