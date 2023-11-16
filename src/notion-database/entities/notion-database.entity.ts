import { ObjectType, Field, createUnionType } from '@nestjs/graphql';
import { NotionDatabasePropertyType } from '../../common/enums/notionDatabaseProperty';

@ObjectType()
export class NotionDatabaseProperty {
  @Field()
  name: string;

  @Field(() => NotionDatabasePropertyType)
  type: NotionDatabasePropertyType;
}

@ObjectType()
export class NotionDatabase {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field(() => [NotionDatabaseProperty])
  properties: NotionDatabaseProperty[];
}

@ObjectType()
export class NotionDatabaseNotFound {
  @Field()
  message: string;

  @Field({ nullable: true })
  errorMessage?: string;
}

export const NotionDatabaseResult = createUnionType({
  name: 'NotionDatabaseResult',
  types: () => [NotionDatabase, NotionDatabaseNotFound] as const,
  resolveType: (value) => {
    if (value.errorMessage) {
      return NotionDatabaseNotFound;
    }
    if (value.id) {
      return NotionDatabase;
    }
  },
});
