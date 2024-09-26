import { TerraformStack } from "cdktf";

export default interface IIaCProvider {
    setStack(stack: TerraformStack): void;
}