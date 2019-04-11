In mongodb all id built using timestamp
This let us fetch orders by timestamp without explicity crating timestamp fields inside of docs

This script gets date one day before now
And fetches all documents that were created before timestamp

To fetch all documents from last day just change "gt" to "lt" or "lte"
To remove all documents or make another operation you can just 
just verb from "find" to "remove/update" and etc
