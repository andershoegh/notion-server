import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotionDatabaseService } from './notion-database.service';
import { NotionDatabaseResult } from './entities/notion-database.entity';

@Resolver(() => NotionDatabaseResult)
export class NotionDatabaseResolver {
  constructor(private readonly notionDatabaseService: NotionDatabaseService) {}

  @Query(() => NotionDatabaseResult, { name: 'notionDatabase', nullable: true })
  findOne(@Args('id') id: string) {
    return this.notionDatabaseService.findOne(id);
  }
}
