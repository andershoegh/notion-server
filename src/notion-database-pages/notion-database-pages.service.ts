import { Injectable } from '@nestjs/common';
import { NotionService } from '../notion/notion.service';
import { isFullPageOrDatabase } from '@notionhq/client';
import { NotionDatabasePage } from './entities/notion-database-page.entity';

const getPropertyValueFinder = (pageProperties: [string, any][]) => {
  return (propertyName: string) =>
    pageProperties.find((p) => p[0] === propertyName)?.[1];
};

@Injectable()
export class NotionDatabasePagesService {
  constructor(private notion: NotionService) {}

  async findAll(databaseID: string): Promise<NotionDatabasePage[]> {
    const notionDatabasePages: NotionDatabasePage[] = [];
    const fullOrPartialPages = await this.notion.notion.databases.query({
      database_id: databaseID,
    });

    for (const page of fullOrPartialPages.results) {
      if (!isFullPageOrDatabase(page)) {
        continue;
      }

      const pageProperties = Object.entries(page.properties);
      const getPropertyValue = getPropertyValueFinder(pageProperties);

      const pageID = page.id;

      const featureName =
        getPropertyValue('Feature name').title[0]?.plain_text || null;

      const categoryRefID =
        getPropertyValue('Category')?.relation[0]?.id || null;

      const featureGroupRefIDs = getPropertyValue(
        'Feature Groups',
      )?.relation.map((relation: { id: string }) => relation.id);

      const maturityID = getPropertyValue('Maturity')?.relation[0]?.id || null;

      const jobToBeDone =
        getPropertyValue('JTBD')?.relation.map(
          (relation: { id: string }) => relation.id,
        ) || [];

      notionDatabasePages.push({
        id: pageID,
        featureName,
        jobToBeDone,
        categoryRefID,
        featureGroupRefIDs,
        maturityID,
      });
    }

    return notionDatabasePages;
  }

  findOne(id: number) {
    return `This action returns a #${id} notionDatabasePage`;
  }
}
