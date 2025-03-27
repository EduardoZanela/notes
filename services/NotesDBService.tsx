import { database } from "../db/NotesDatabase";
import Note from "../models/Note";
import { NotePayload } from "../types/NotePayload";

let autoSaveTimeout: NodeJS.Timeout | null = null;

export const autoSaveNote = async (noteId: string, data: NotePayload): Promise<string> => {
  if(autoSaveTimeout){
    clearTimeout(autoSaveTimeout!);
  }

  return new Promise((resolve, reject) => {
    let returnID = "";
    autoSaveTimeout = setTimeout(async () => {
      
      await getNote(noteId).then(note => {
        returnID = note.id;
      }).catch( error => {
        console.log("[NotesDBService.autoSaveNote] Note not find ", error);
      });

      if (!returnID) {        
        await addNote(data).then(id => {
          returnID = id;
        }).catch(() => {
          reject();
        });
      } else {
        returnID = noteId;
        await updateNote(noteId, data).catch(() => {
          reject();
        });
      }

      resolve(returnID);

    }, 1000);
  });
};

// Add a new note
export const addNote = async (data : NotePayload): Promise<string> => {
  let noteId: string = "";
  await database.write(async () => {
    const notesCollection = await database.get<Note>('notes');
    const newNote = await notesCollection.create((note) => {
      note.title = data.title;
      note.content = data.content;
      note.createdAt = Date.now();
      note.updatedAt = Date.now();
    });
    noteId = newNote.id;
  });
  return noteId;
};

// Update a note
export const updateNote = async (id: string, data: NotePayload) => {
  await database.write(async () => {
    const nodesCollection = await database.get<Note>('notes');
    const currentNote = await nodesCollection.find(id);
    await currentNote.update((note) => {
      note.title = data.title;
      note.content = data.content;
      note.updatedAt = Date.now();
    });
  });
};

// Fetch all notes
export const getAllNotes = async (): Promise<Note[]> => {
  return await database.get<Note>('notes').query().fetch();
};

export const getNote = async (id: string): Promise<Note> => {
  return await database.get<Note>('notes').find(id);
};

// Delete a note
export const deleteNote = async (id: string) => {
  return (await getNote(id)).destroyPermanently();
};