var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = chai.expect;
var assert = chai.assert;

describe('Add a New Season', function() { 

	var seasonCorrect;
	var seasonNoStart;
	var seasonNoEnd;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
				callback();
			});
	});

	beforeEach(function() {
		seasonCorrect = {
		    "name" : "2016 CIF Boys",
		    "startDate" : "20160830",
		    "endDate" : "20161115"
			};
		seasonNoStart = {
		    "name" : "2016 CIF Boys",
		    "endDate" : "20161115"
			};
		seasonNoEnd = {
		    "name" : "2016 CIF Boys",
		    "startDate" : "20160830"
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


