import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotionDatabasePagesService } from './notion-database-pages.service';
import { NotionDatabasePage } from './entities/notion-database-page.entity';

@Resolver(() => NotionDatabasePage)
export class NotionDatabasePagesResolver {
  constructor(
    private readonly notionDatabasePagesService: NotionDatabasePagesService,
  ) {}

  @Query(() => [NotionDatabasePage], { name: 'notionDatabasePages' })
  findAll(@Args('databaseID') databaseID: string) {
    return this.notionDatabasePagesService.findAll(databaseID);
  }

  // @Query(() => NotionDatabasePage, { name: 'notionDatabasePage' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.notionDatabasePagesService.findOne(id);
  // }
}
