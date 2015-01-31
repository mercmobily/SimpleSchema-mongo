/*
Copyright (C) 2013 Tony Mobily

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var 
  dummy
, declare = require('simpledeclare')
, mongo = require('mongodb')
;

function ObjectId( id ){
  return ( id instanceof mongo.ObjectID) ? id : mongo.ObjectID( id );
}

function checkObjectId( s ){
  return ( s instanceof mongo.ObjectID ) ? true : new RegExp("^[0-9a-fA-F]{24}$").test(s);
}

var MongoSchemaMixin = declare( Object, {

  // Cast an ID for this particular engine. If the object is in invalid format, it won't
  // get cast, and as a result check will fail
  idTypeCast: function(  definition, value, fieldName, options, failedCasts ){

    if( checkObjectId( value ) ) {
      return ObjectId( value );
    } else {
      failedCasts[ fieldName ] = true;
    }
  },

  // The default id maker available as an object method
  makeId: function( object, cb ){
    MongoSchemaMixin.makeId( object, cb );
  },

});

// The default id maker
MongoSchemaMixin.makeId = function( object, cb ){
  cb( null, ObjectId() );
},

exports = module.exports = MongoSchemaMixin;

