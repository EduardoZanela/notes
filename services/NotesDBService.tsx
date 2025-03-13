import { notesDatabase, Note } from '../db/NotesDatabase';

// Add a new note
export const addNote = async (note : Note) => {
  return await notesDatabase.notes.add({ ...note, updatedAt: Date.now() });
};

// Fetch all notes
export const getAllNotes = async () => {
  return await notesDatabase.notes.toArray();
};

// Update a note
export const updateNote = async (id: number, data: Note) => {
  return await notesDatabase.notes.update(id, { ...data, updatedAt: Date.now() });
};

// Delete a note
export const deleteNote = async (id: number) => {
  return await notesDatabase.notes.delete(id);
};