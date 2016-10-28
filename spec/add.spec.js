var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = chai.expect;
var assert = chai.assert;

describe('Add a New Season', function() { 

	var database;

	var seasonCorrect;
	var seasonNoStart;
	var seasonNoEnd;

	before(function(){
		database = new AWS.DynamoDB.DocumentClient();
		mock = sinon.mock(database);
		mock.expects("get").withArgs(seasonCorrect).returns("OK");
		mock.expects("get").withArgs(seasonNoStart).returns(new(Error));
		mock.expects("get").withArgs(seasonNoEnd).returns(new(Error));
	});

	beforeEach(function() {
		seasonCorrect = {
		    "Name" : "2016 CIF Boys",
		    "StartDate" : "20160830",
		    "EndDate" : "20161115"
			};
		seasonNoStart = {
		    "Name" : "2016 CIF Boys",
		    "EndDate" : "20161115"
			};
		seasonNoEnd = {
		    "Name" : "2016 CIF Boys",
		    "StartDate" : "20160830"
			};
	});

	afterEach(function() {
	    });

	it('-- Adds a Season with correct data', sinon.test(function(done) {

		app.handler(seasonCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Season');

			done();
		});
	}));

	it('-- Fails when no Start Date is found', sinon.test(function(done) {

		app.handler(seasonNoStart, context, function (err, data) {
			expect(err.message).equal('No Start Date');		;
			done();
		});
	}));	

	it('-- Fails when no End Date is found', sinon.test(function(done) {

		app.handler(seasonNoEnd, context, function (err, data) {
			expect(err.message).equal('No End Date');		;
			done();
		});	
	}));
});


