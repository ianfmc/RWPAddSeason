var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {

    var docClient = new AWS.DynamoDB.DocumentClient();
    var uuid = new Date().getTime();

    if (event.StartDate == null) {
        callback(new Error('No Start Date'));
    }
    else if (event.EndDate == null) {
        callback(new Error('No End Date'));
    }
    else {
        var params = {
            TableName : 'Season',
            Item : { 
                "SeasonID" : uuid,
                "Name" : event.Name ,
                "StartDate" : event.StartDate,
                "EndDate" : event.EndDate
            },
        };
        docClient.put(params, function(response, result) { 
            callback(null, 'Season : ' + uuid.toString()) });
    }
};