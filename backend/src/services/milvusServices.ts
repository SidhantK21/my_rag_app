import { MilvusClient,DataType } from "@zilliz/milvus2-sdk-node";


const address = "http://milvus-standalone:19530";

// export this client to tingle with the db in the other folders 
type Collection_name=string;
type Dbname=string;

export const client=new MilvusClient(address);
export const collectionName:Collection_name="my_newapp";

// mlivus context check 
export const milvusCreds={
  dbcheck:false,
  collectionCheck:false
};

const dbName:Dbname = "my_dbapp";

const schema = {
    collection_name: collectionName,
    fields: [
      {
        name: 'id', 
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
      },
      {
        name: 'vector_field', 
        data_type: DataType.FloatVector,
        dim: 1536, 
      },
    ],
};


export const initailzeService=async ()=>{
  try {
    const databases = await client.listDatabases();
    const dbNames = databases.db_names;

    if (!dbNames.includes(dbName)) {  
        await client.createDatabase({ db_name: dbName });
        milvusCreds.dbcheck = true;
        console.log("Database created successfully");
    } else {
        console.log("Database already exists");
    }
} catch (e) {
    console.log("Error creating the database", e);
}

try {
    await client.use({ db_name: dbName });
    console.log(`Using database: ${dbName}`);
} catch (e) {
    console.error("Error selecting database:", e);
    return; 
}

try {
    const collections = await client.listCollections();
    const collectionExists = collections.data.some((col) => col.name === collectionName);

    if (!collectionExists) {
        await client.createCollection(schema);
        console.log("Collection created successfully.");
    } else {
        console.log("Collection already exists.");
    }
} catch (e) {
    console.error("Error initializing Milvus:", e);
}

try {
    const indexes = await client.describeIndex({ collection_name: collectionName });
    if (!indexes || indexes.index_descriptions.length === 0) {
        await client.createIndex({
            collection_name: collectionName,
            field_name: 'vector_field',
            index_name: 'vector_index',
            index_type: 'IVF_FLAT',
            metric_type: 'L2', 
            params: { nlist: 1024 },
        });
        console.log("Index created successfully.");
    } else {
        console.log("Index already exists.");
    }
} catch (e) {
    console.error("Error checking/creating index:", e);
}
}