import { registerEnumType } from '@nestjs/graphql';

export enum NotionDatabasePropertyType {
  checkbox = 'checkbox',
  created_by = 'created_by',
  created_time = 'created-time',
  date = 'date',
  email = 'email',
  files = 'files',
  formula = 'formula',
  last_edited_by = 'last_edited_by',
  last_edited_time = 'last_edited_time',
  multi_select = 'multi_select',
  number = 'number',
  people = 'people',
  phone_number = 'phone_number',
  relation = 'relation',
  rich_text = 'rich_text',
  rollup = 'rollup',
  select = 'select',
  status = 'status',
  title = 'title',
  unique_id = 'unique_id',
  url = 'url',
}

registerEnumType(NotionDatabasePropertyType, {
  name: 'NotionDatabasePropertyType',
});
