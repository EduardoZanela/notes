import { Model } from '@nozbe/watermelondb';
import { relation } from '@nozbe/watermelondb/decorators';
import Note from './Note';
import Tag from './Tag';

export default class NoteTag extends Model {
  static table = 'note_tags';

  @relation('notes', 'note_id') note!: Note;
  @relation('tags', 'tag_id') tag!: Tag;
}