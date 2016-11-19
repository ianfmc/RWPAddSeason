var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {

    var docClient = new AWS.DynamoDB.DocumentClient();
    var uuid = new Date().getTime();

    if (event.startDate == null) {
        callback(new Error('No Start Date'));
    }
    else if (event.endDate == null) {
        callback(new Error('No End Date'));
    }
    else {
        var params = {
            TableName : 'Season',
            Item : { 
                "seasonID" : uuid,
                "name" : event.name ,
                "startDate" : event.startDate,
                "endDate" : event.endDate
            },
        };
        docClient.put(params, function(response, result) { 
            callback(null, 'Season : ' + uuid.toString()) });
    }
};