import { Module } from '@nestjs/common';
import { NotionDatabasePagesService } from './notion-database-pages.service';
import { NotionDatabasePagesResolver } from './notion-database-pages.resolver';

@Module({
  providers: [NotionDatabasePagesResolver, NotionDatabasePagesService],
})
export class NotionDatabasePagesModule {}
