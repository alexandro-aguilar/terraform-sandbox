import 'reflect-metadata';
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { TerraformStack } from "cdktf";
import IIaCProvider from "./IaCProvider";
import { injectable } from 'inversify';

@injectable()
export default class LocalIaCProvider implements IIaCProvider {

  public setStack(stack: TerraformStack) {

    new AwsProvider(stack, 'AWS', {
      region: process.env.AWS_REGION,
    });
  }


} 