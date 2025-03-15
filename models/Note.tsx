import { Model } from '@nozbe/watermelondb';
import { date, text } from '@nozbe/watermelondb/decorators';

export default class Note extends Model {
    static table = 'notes';

    @text('title') title!: string;
    @text('content') content!: string;
    @date('created_at') createdAt!: number;
    @date('updated_at') updatedAt!: number;
}