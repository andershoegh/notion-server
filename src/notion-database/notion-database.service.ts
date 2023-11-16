import { Injectable } from '@nestjs/common';
import { NotionService } from '../notion/notion.service';
import { NotionDatabaseResult } from './entities/notion-database.entity';
import { isFullDatabase } from '@notionhq/client';
import { inspect } from 'util';
import { NotionDatabasePropertyType } from '../common/enums/notionDatabaseProperty';

@Injectable()
export class NotionDatabaseService {
  constructor(private notionSDK: NotionService) {}

  async findOne(id: string): Promise<typeof NotionDatabaseResult | null> {
    try {
      const notionDB = await this.notionSDK.notion.databases.retrieve({
        database_id: id,
      });

      const databaseProperties = Object.values(notionDB.properties).map(
        (prop) => ({
          type: NotionDatabasePropertyType[prop.type],
          name: prop.name,
        }),
      );

      if (isFullDatabase(notionDB)) {
        console.log(inspect(notionDB, false, null, true /* enable colors */));

        return {
          id: notionDB.id,
          url: notionDB.url,
          properties: databaseProperties,
          title: notionDB.title[0].plain_text,
        };
      }
    } catch (error) {
      return {
        message: 'Not found',
        errorMessage: error,
      };
    }
    return null;
  }
}
