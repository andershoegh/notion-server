import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NotionDatabasePage {
  @Field()
  id: string;

  @Field({ nullable: true })
  featureName?: string;

  @Field({ nullable: true })
  categoryRefID?: string;

  @Field(() => [String])
  featureGroupRefIDs?: string[];

  @Field({ nullable: true })
  maturityID?: string;

  @Field(() => [String])
  jobToBeDone: string[];
}
