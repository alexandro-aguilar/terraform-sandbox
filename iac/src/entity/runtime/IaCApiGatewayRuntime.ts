export interface IaCResource {
    id: string;
    path: string;
    children: Map<string, IaCResource>;
}

export default class IaCApiGatewayRuntime {
    id!:  string;
    rootResourceId!: string;
    resources!: Map<string, IaCResource>;
}

