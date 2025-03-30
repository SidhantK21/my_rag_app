"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initailzeService = exports.milvusCreds = exports.collectionName = exports.client = void 0;
const milvus2_sdk_node_1 = require("@zilliz/milvus2-sdk-node");
const address = "http://localhost:19530";
exports.client = new milvus2_sdk_node_1.MilvusClient(address);
exports.collectionName = "my_newapp";
// mlivus context check 
exports.milvusCreds = {
    dbcheck: false,
    collectionCheck: false
};
const dbName = "my_dbapp";
const schema = {
    collection_name: exports.collectionName,
    fields: [
        {
            name: 'id',
            data_type: milvus2_sdk_node_1.DataType.Int64,
            is_primary_key: true,
            autoID: true,
        },
        {
            name: 'vector_field',
            data_type: milvus2_sdk_node_1.DataType.FloatVector,
            dim: 1536,
        },
    ],
};
const initailzeService = async () => {
    try {
        const databases = await exports.client.listDatabases();
        const dbNames = databases.db_names;
        if (!dbNames.includes(dbName)) {
            await exports.client.createDatabase({ db_name: dbName });
            exports.milvusCreds.dbcheck = true;
            console.log("Database created successfully");
        }
        else {
            console.log("Database already exists");
        }
    }
    catch (e) {
        console.log("Error creating the database", e);
    }
    try {
        await exports.client.use({ db_name: dbName });
        console.log(`Using database: ${dbName}`);
    }
    catch (e) {
        console.error("Error selecting database:", e);
        return;
    }
    try {
        const collections = await exports.client.listCollections();
        const collectionExists = collections.data.some((col) => col.name === exports.collectionName);
        if (!collectionExists) {
            await exports.client.createCollection(schema);
            console.log("Collection created successfully.");
        }
        else {
            console.log("Collection already exists.");
        }
    }
    catch (e) {
        console.error("Error initializing Milvus:", e);
    }
    try {
        const indexes = await exports.client.describeIndex({ collection_name: exports.collectionName });
        if (!indexes || indexes.index_descriptions.length === 0) {
            await exports.client.createIndex({
                collection_name: exports.collectionName,
                field_name: 'vector_field',
                index_name: 'vector_index',
                index_type: 'IVF_FLAT',
                metric_type: 'L2',
                params: { nlist: 1024 },
            });
            console.log("Index created successfully.");
        }
        else {
            console.log("Index already exists.");
        }
    }
    catch (e) {
        console.error("Error checking/creating index:", e);
    }
};
exports.initailzeService = initailzeService;
