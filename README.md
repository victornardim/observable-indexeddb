# Observable IndexedDB

This service has been created to easily deal with IndexedDB using rxjs.

Some of the main operations has been contemplated, but feel free to add more.

## Getting started

Import the content of the services folder to your project.

To start the service you need to setup and init it, with the methods setup(databaseSettings: Database) and init().

**For the deleteDatabase() method you just have to setup it. If it has been initted, the database cannot be deleted.**

## Database setup object

The database setup object have the following structure:

{\
    name: string,\
    version: number,\
    objectStores: [\
        {\
            name: string,\
            keyPath: string | string[],\
            autoIncrement: boolean,\
            indexes: [\
                {\
                    name: string,\
                    keyPath: string | string[],\
                    unique: boolean\
                }\
            ]\
        }\
    ]\
}

## Methods

setup(databaseSettings: Database)\
init(): Observable<any>\
insert(storeName: string, object: object): Observable<any>\
load(storeName: string, key: any): Observable<any>\
loadByIndex(storeName: string, indexName: string, key: any): Observable<any>\
loadAll(storeName: string): Observable<any>\
update(storeName: string, key: any, object: object): Observable<any>\
updateByIndex(storeName: string, indexName: string, key: any, object: object): Observable<any>\
delete(storeName: string, key: any): Observable<any>\
deleteDatabase(): Observable<any>\

## Examples

This application have some examples of use in the app.component.ts, if you want to see it running, just ng serve it.

Have fun! :)