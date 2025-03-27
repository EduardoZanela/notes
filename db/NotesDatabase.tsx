import { appSchema, Database, tableSchema } from '@nozbe/watermelondb';
import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { Platform } from 'react-native';
import Note from '../models/Note';

const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'notes',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'content', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        })
    ]
});

const migrations = schemaMigrations({
    migrations: [
    ]
});

const adapter = Platform.OS === 'web' ? new LokiJSAdapter({
    schema,
    migrations,
    useWebWorker: false,
    dbName: 'notes',
    useIncrementalIndexedDB: true,
    onQuotaExceededError: () => {
        // Browser ran out of disk space -- offer the user to reload the app or log out
      },
      onSetUpError: () => {
        // Database failed to load -- offer the user to reload the app or log out
      },
      extraIncrementalIDBOptions: {
        onDidOverwrite: () => {
          // Called when this adapter is forced to overwrite contents of IndexedDB.
          // This happens if there's another open tab of the same app that's making changes.
          // Try to synchronize the app now, and if user is offline, alert them that if they close this
          // tab, some data may be lost
        },
        onversionchange: () => {
          // database was deleted in another browser tab (user logged out), so we must make sure we delete
          // it in this tab as well - usually best to just refresh the page
         
        },
      }
    }) : new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'notes',
    jsi: Platform.OS === 'ios',
    onSetUpError: (error) => {
        console.log(error);
    }
});

export const database = new Database({
    adapter,
    modelClasses: [Note],
});