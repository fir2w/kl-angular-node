'use strict';
var request = require('superagent');
var tools = require('../lib/util/tools.js');
var myConf = require('../config/app.json');
var TaskAttachment = require('../models/taskAttachmentModel');

module.exports = function (server) {

  var prefix = '/task-engine';

  //查询一个账户所有的team
  server.get('/:userId/tasks/inbox', function (req, res) {
    var userId = req.params.userId;
    var pwd = req.user.dataValues.pwd_;
    var _auth = 'Basic ' + new Buffer(userId + ':' + pwd).toString('base64');
    var url = myConf.task.urlPath + '/runtime/tasks';
    request
      .get(url)
      .set('Authorization', _auth)
      .set('Accept', 'application/json')
      .end(function (err, agRes) {
        if (err) throw err;
        console.log('inbox:-----------' + JSON.stringify(agRes.body));
        tools.jsonData(res, agRes.body.data);
      });
  });

  //任务操作
  server.get(prefix + '/tasks/:id/:operation', function (req, res) {
    callTaskRestService(req, res);
  });

  /**
   *
   * 任务相关人
   * runtime/tasks/:taskId/identitylinks
   *
   */
  server.get(prefix + '/runtime/tasks/:taskId/identitylinks', function (req, res) {
    callTaskRestService(req, res);
  });

  /**
   * 任务查询
   */
  server.get(prefix + '/tasks', function (req, res) {
    callTaskRestService(req, res);
  });

  /**
   * 任务附件查询
   * /runtime/tasks/:taskId/attachments
   */
  server.get(prefix + '/runtime/tasks/:taskId/attachments', function (req, res) {
    var proId = 'f7072d82-e60e-11e3-91c4-8ca98202f59e';
    TaskAttachment.findAll({where: {proc_inst_id_: proId}}).success(function (attachs) {
      res.json(attachs);
    }).error(function (err) {
      res.json(500, { error: err });
    });
  });

  //新增任务/提交任务
  server.post(prefix + '/runtime/tasks', function (req, res) {
    var factUrl = myConf.task.urlPath + req.url.substring(prefix.length);
    console.log('任务实际地址:' + factUrl);
    console.log('请求参数' + JSON.stringify(req.body));
    var userId = req.user.dataValues.id_;
    var pwd = req.user.dataValues.pwd_;
    var _auth = 'Basic ' + new Buffer(userId + ':' + pwd).toString('base64');
    request
      .post(factUrl)
      .send(req.body)
      .set('Authorization', _auth)
      .set('Accept', 'application/json')
      .end(function (err, agRes) {
        if (err) throw err;
        console.log('result:' + JSON.stringify(agRes.body));
        tools.jsonData(res, agRes.body);
      });
  });


  //调用任务restfull
  function callTaskRestService(req, res) {
    var factUrl = myConf.task.urlPath + req.url.substring(prefix.length);
    console.log('任务查询实际地址:' + factUrl);
    var userId = req.user.dataValues.id_;
    var pwd = req.user.dataValues.pwd_;
    var _auth = 'Basic ' + new Buffer(userId + ':' + pwd).toString('base64');
    var req2 = request
      .get(factUrl)
      .set('Authorization', _auth)
      .set('Accept', 'application/json');
    req2.end(function (err, res2) {
      if (err) {
        res.json(500, { error: err });
        return;
      }
      res.status(res2.statusCode);
      res.send(res2.body);
      //console.log('返回数据:-----------' + JSON.stringify(res2.body));
    });
  }
};
