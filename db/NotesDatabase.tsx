import Dexie, { EntityTable } from "dexie";

export type Note = {
    id?: number;
    title?: string;
    content: string;
    tags?: string[];
    createdAt: number;
    updatedAt: number;
}

export const db = new Dexie("NotesDatabase") as Dexie & {
    notes: EntityTable<Note, 'id'>;
};

db.version(1).stores({
    notes: '++id, title, content, tags, created_at, updated_at'
});

export type NotesDatabase = typeof db ;