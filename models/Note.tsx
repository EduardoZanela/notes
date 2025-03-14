import { Model, Q } from '@nozbe/watermelondb';
import { date, children, text } from '@nozbe/watermelondb/decorators';
import Tag from './Tag';

export default class Note extends Model {
    static table = 'notes';

    @text('title') title!: string;
    @text('content') content!: string;
    @date('created_at') createdAt!: number;
    @date('updated_at') updatedAt!: number;

    @children('notes_tags') noteTags!: Tag[]; // Relation to join table

    get tags() {
        return this.collections
        .get('tags')
        .query(Q.on('notes_tags', 'note_id', this.id));
    }
}

export type NoteDTO = {
    title?: string;
    content?: string;
    createdAt?: number;
    updatedAt?: number;
    tags?: string[];
}