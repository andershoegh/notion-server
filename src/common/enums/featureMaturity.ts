import { registerEnumType } from '@nestjs/graphql';

export enum FeatureMaturity {
  MINIMAL = 'MINIMAL',
  VIABLE = 'VIABLE',
  COMPLETE = 'COMPLETE',
  LOVABLE = 'LOVABLE',
}

registerEnumType(FeatureMaturity, {
  name: 'FeatureMaturity',
});
