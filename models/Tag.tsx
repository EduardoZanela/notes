import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';
import NoteTag from './NoteTag';

export default class Tag extends Model {
  static table = 'tags';

  @field('name') name!: string;

  @children('notes_tags') noteTags!: NoteTag[];
}