import { Module } from '@nestjs/common';
import { NotionDatabaseService } from './notion-database.service';
import { NotionDatabaseResolver } from './notion-database.resolver';

@Module({
  providers: [NotionDatabaseResolver, NotionDatabaseService],
})
export class NotionDatabaseModule {}
