import { database } from "../db/NotesDatabase";
import Note, { NoteDTO } from "../models/Note";
let autoSaveTimeout: NodeJS.Timeout | null = null;

export const autoSaveNote = async (noteId: string, data: NoteDTO): Promise<string> => {
  if(autoSaveTimeout){
    clearTimeout(autoSaveTimeout!);
  }
  return new Promise((resolve, reject) => {
    autoSaveTimeout = setTimeout(async () => {
      const note = await getNote(noteId);
      if (!note) {
        await addNote(data).then((id) => {
          resolve(id!);
        }).catch(() => {
          reject();
        });

      } else {
        await updateNote(noteId, data).catch(() => {
          reject();
        });

      }
      resolve(noteId);
    }, 1000);
  });
};

// Add a new note
export const addNote = async (note : NoteDTO): Promise<string> => {
  let noteId: string = "";
  await database.write(async () => {
    const notesCollection = await database.get<Note>('notes');
    const newNote = await notesCollection.create((note) => {
      note.title = note.title;
      note.content = note.content;
      note.createdAt = Date.now();
      note.updatedAt = Date.now();
    });
    noteId = newNote.id;
  });

  return noteId;
};

// Fetch all notes
export const getAllNotes = async () => {
  return await database.get<Note>('notes').query().fetch();
};

export const getNote = async (id: string) => {
  return await database.get<Note>('notes').find(id);
};

// Update a note
export const updateNote = async (id: string, data: NoteDTO) => {
  const nodesCollection = await database.get<Note>('notes');
  await database.write(async () => {
    const note = await nodesCollection.find(id);
    await note.update((note) => {
      note.title = data.title!;
      note.content = data.content!;
      note.updatedAt = Date.now();
    });
  });
};

// Delete a note
export const deleteNote = async (id: number) => {
  //return await notesDatabase.notes.delete(id);
};