import Dexie, { EntityTable } from "dexie";

interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[];
    created_at: Date;
    updated_at: Date;
}

const db = new Dexie("NotesDatabase") as Dexie & {
    notes: EntityTable<Note, 'id'>;
};

db.version(1).stores({
    notes: '++id, title, content, tags, created_at, updated_at'
});

export type { db };
export { Note };