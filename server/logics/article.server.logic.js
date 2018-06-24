/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Article = appDb.model('Article');
var sysErr = require('./../errors/system');
var that = exports;
var agent = require('superagent').agent();

function sendArticleToBaidu(article_id) {
  agent.post("http://data.zz.baidu.com/urls?appid=1547899268867648&token=ZPoUz3LNpokfGbYd&type=batch")
    .set('Content-Type', 'text/plain')
    .send('http://m.chaoqianwang.com/page/product_detail/' + article_id)
    .end(function (err, res) {
      console.log('sendArticleToBaidu---->');
      console.log(res.text);
    });

  agent.post("http://data.zz.baidu.com/urls?site=m.chaoqianwang.com&token=1O5egVZWxqFllSYY&type=mip")
    .set('Content-Type', 'text/plain')
    .send('http://m.chaoqianwang.com/page/product_detail/' + article_id)
    .end(function (err, res) {
      console.log('sendArticleToBaidu---->');
      console.log(res.text);
    });

  agent.post("http://data.zz.baidu.com/urls?site=www.chaoqianwang.com&token=1O5egVZWxqFllSYY")
    .set('Content-Type', 'text/plain')
    .send('http://www.chaoqianwang.com/page/product_detail/' + article_id)
    .end(function (err, res) {
      console.log('sendArticleToBaidu---->');
      console.log(res.text);
    });
}
exports.updateArticle = function (info, callback) {

  if (!info._id) {
    info._id = mongoose.generateNewObjectId();
  }

  that.articleDetail(info._id, function (err, article) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!article) {
      article = new Article({});
    }

    article.title = info.title;
    article.image = info.image;
    article.content = info.content;
    article.description = info.description;
    article.tag_string = info.tag_string;
    article.tag_array = info.tag_string.split('|');

    //   article.ma
    article.save(function (err, savedarticle) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }

      sendArticleToBaidu(savedarticle._id);
      return callback(null, savedarticle);
    });
  })

};

exports.articleList = function (info, callback) {
  var query = {}
  Article.find(query).sort({ create_time: -1 }).exec(function (err, articles) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, articles);
  });
};


exports.articleSingleList = function (info, callback) {
  var query = {}
  Article.find(query).select('-content').sort({ create_time: -1 }).exec(function (err, articles) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, articles);
  });
};

exports.articleDetail = function (articleId, callback) {
  Article.findOne({ _id: articleId }, function (err, article) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, article);
  });
};


exports.articleListByIds = function (ids, callback) {
  ids = ids || [];
  Article.find({ _id: { $in: ids } }).exec(function (err, articles) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, articles);
  });
};


exports.increase_read_count = function (articleId, callback) {
  Article.update({ _id: articleId }, { $inc: { read_count: 1 } }, function (err, result) {
    if (err) {
      console.error(err);
    }
    return callback();
  })
}
