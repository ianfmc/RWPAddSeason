var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var uuid = new Date().getTime();

    if (event.StartDate == null) {
        context.fail(new Error('No Start Date'));
    }
    else if (event.EndDate == null) {
        context.fail(new Error('No End Date'));
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
        docClient.put(params, function(response, result) { context.succeed('Season : ' + uuid.toString()) });
    }
};