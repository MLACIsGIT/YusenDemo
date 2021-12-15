import { Request } from "tedious";
import { opendbConnection, dbConnection } from '../dbConnection';

export default class StoredProcedureCaller {
    constructor(procName, timeOut) {
        this.procName = procName;
        this.params = [];

        this.timeOut = parseInt(process.env.DB_TIMEOUT);
        if (Number.isInteger(timeOut)) {
            this.timeOut = timeOut;
        }
    }

    addParameter(name, type, value, options) {
        this.params.push({
            direction: 'input',
            name,
            type,
            value,
            options,
        })
    }

    addOutputParameter(name, type, value, options) {
        this.params.push({
            direction: 'output',
            name,
            type,
            value,
            options,
        })
    }

    async execute() {
        await opendbConnection();

        const promise = new Promise((res, rej) => {
            const output = {};
            let columns = [];
            const recordset = [];

            const request = new Request(this.procName, (err) => {
                if (err) {
                    rej(err);
                }
            });

            request.setTimeout = parseInt(process.env.DB_TIMEOUT);

            this.params.forEach((param) => {
                if (param.direction === 'input') {
                    request.addParameter(param.name, param.type, param.value, param.options);
                } else {
                    request.addOutputParameter(param.name, param.type, param.value, param.options);
                }
            })

            request.on('requestCompleted', () => {
                res({ output, columns, recordset });
            });

            request.on('returnValue', (name, value) => {
                output[name] = value;
            });

            request.on('columnMetadata', (columnsMetadata) => {
                columns =
                    columnsMetadata.map(colData => (
                        {
                            name: colData.colName,
                            type: colData.type.name,
                        })
                );
            });

            request.on('row', (columns) => {
                const record = {};

                columns.map(column => {
                    record[column.metadata.colName] = column.value;
                })

                recordset.push(record)
            })

            dbConnection.callProcedure(request);
        });

        const result = await promise
            .then((output) => {
                return output
            })
            .catch(err => {
                const error = new Error('Failed');
                error.status = 500;
                throw error;
            });

        return result;
    }
}
