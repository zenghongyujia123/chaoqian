/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var CreditPeople = appDb.model('CreditPeople');
var sysErr = require('./../errors/system');

var that = exports;

exports.updateCreditPeople = function (info, callback) {
  if (!info._id) {
    info._id = mongoose.generateNewObjectId();
  }

  that.creditPeopleDetail(info._id, function (err, creditPeople) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!creditPeople) {
      creditPeople = new CreditPeople({});
    }

    creditPeople.name = info.name;
    creditPeople.phone = info.phone;
    creditPeople.photo = info.photo;
    creditPeople.tags = info.tags;
    if (info.tags) {
      creditPeople.tag_list = info.tags.split(',') || [];
    }
    else {
      creditPeople.tag_list = []
    }
    creditPeople.job_start_time = info.job_start_time;
    creditPeople.personal_description = info.personal_description;
    if (info.personal_description) {
      creditPeople.personal_description_list = info.personal_description.split('|') || [];
    }
    else {
      creditPeople.personal_description_list = []
    }
    creditPeople.business_description = info.business_description;
    if (info.business_description) {
      creditPeople.business_description_list = info.business_description.split('|') || [];
    }
    else {
      creditPeople.business_description_list = []
    }  
    creditPeople.company_type = info.company_type;
    creditPeople.location = info.location;

    creditPeople.save(function (err, savedCreditPeople) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, savedCreditPeople);
    });
  })

};

exports.creditPeopleList = function (callback) {
  CreditPeople.find({}, function (err, creditPeoples) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, creditPeoples);
  });
};

exports.nearCreditPeopleList = function (location, callback) {
  var point = { type: "Point", coordinates: location || [0, 0] };
  CreditPeople.geoNear(point, { spherical: true }, function (err, creditPeoples) {
    if (err) {
      console.log(err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, creditPeoples);
  });
};

exports.creditPeopleDetail = function (id, callback) {
  CreditPeople.findOne({ _id: id }, function (err, creditPeople) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, creditPeople);
  });
};