import * as mongoose from 'mongoose';

export class Db {
    constructor(dbName: string, host:string = 'localhost') {
        (mongoose as any).Promise = global.Promise;
        // Connect to MongoDB and create/use database called "ntoes"
        let res =mongoose.connect('mongodb://' + host + '/' + dbName, {}, (err: Error) => {
            if (err)
                console.log(err.message);
            else
                console.log('Connected to the: mongodb://' + host + '/' + dbName);
        });
    }
}
