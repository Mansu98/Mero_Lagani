// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

var url = 'mongodb://localhost:27017/MeroLagani';
var dbConn;
mongodb.MongoClient.connect(url, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});


// CSV file name
const fileName = 'detailData.csv';
var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
             Title: source[i]['Title'],
             Date: source[i]['Date'],
             Detail: source[i]['Detail']
         };
         arrayToInsert.push(oneRow);
     }
     //inserting into the table “employees”
     var collectionName = 'MeroLagani';
     var collection = dbConn.collection(collectionName);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log('Import CSV into database successfully.');
         }
     });
});