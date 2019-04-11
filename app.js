const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017';

const colName = "col"
const dbName = "test"


// Create a new MongoClient
const client = new MongoClient(url);


// Use connect method to connect to the Server
client.connect(function(err) {

	if (!err) {
		console.log("Connected successfully to server");

		const db = client.db(dbName);

		findDocuments(db, function(err, docs) {

			if (err) return console.log('Error ' + err)


			console.log("Found the following records");
			console.log(docs)

			client.close();
		})
	}
});



const findDocuments = function(db, callback) {
	// Get the documents collection
	const collection = db.collection(colName);
	// Find some documents

	var query = {
		_id: {
			$gt: objectIdWithTimestamp(getDaysBefore(1))
		}
	}

	// use find operator here to find all documents
	// in the case you need delete, update or else
	// just use another command properly
	collection.find(query).toArray(function(err, docs) {
		if (err) return callback(err, null)
		callback(null, docs);
	});
}



// This function returns an ObjectId embedded with a given datetime
// Accepts both Date object and string input

function objectIdWithTimestamp(timestamp) {
	// Convert string date to Date object (otherwise assume timestamp is a date)
	if (typeof(timestamp) == 'string') {
		timestamp = new Date(timestamp);
	}

	// Convert date object to hex seconds since Unix epoch
	var hexSeconds = Math.floor(timestamp / 1000).toString(16);

	// Create an ObjectId with that hex timestamp
	var constructedObjectId = ObjectId(hexSeconds + "0000000000000000");

	console.log('\tThe new ObjectId: ' + constructedObjectId + " \n\tHuman readable: " + ObjectId(constructedObjectId).getTimestamp())

	return constructedObjectId
}


function getDaysBefore(days) {
	var now = new Date()
	var newDate = new Date()
	newDate.setDate(now.getDate() - days)
	return newDate
}