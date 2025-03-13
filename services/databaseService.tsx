import { NotesDatabase, db, Note } from '../db/NotesDatabase';

const notesDb : NotesDatabase = db;

// Add a new note
export const addNote = async (note : Note) => {
  return await db.notes.add({ ...note, updatedAt: Date.now() });
};

// Fetch all notes
export const getAllNotes = async () => {
  return await db.notes.toArray();
};

// Update a note
export const updateNote = async (id: number, data: Note) => {
  return await db.notes.update(id, { ...data, updatedAt: Date.now() });
};

// Delete a note
export const deleteNote = async (id: number) => {
  return await db.notes.delete(id);
};