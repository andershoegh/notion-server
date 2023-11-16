import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  public notion = new Client({
    auth: process.env.NOTION_TOKEN,
    notionVersion: '2022-06-28',
  });
}
