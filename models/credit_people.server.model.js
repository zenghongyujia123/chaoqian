/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var CreditPeopleSchema = new Schema({
    object: {
      type: String,
      default: 'CreditPeople'
    },
    name: {
      type: String,
      require: true,
      index: true
    },
    phone: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
    tags: {
      type: String,
      require: true,
    },
    tag_list: {
      type: []
    },
    company_type: {
      type: String,
      require: true,
    },
    job_start_time: {
      type: String,
      require: true,
    },
    personal_description: {
      type: String,
      require: true,
    },
    business_description: {
      type: String,
      require: true,
    }
  });


  CreditPeopleSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('CreditPeople', CreditPeopleSchema);
};
