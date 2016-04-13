ngDefine('klwork.services', [
  'angular'
], function(module, angular) {

  var TaskManagerFactory = function($resource,$http) {
    var baseURL = '/task-engine';
    function TaskApi() {

      this.taskList = $resource(baseURL + '/tasks/:id/:operation', { id: '@id' } , {
        query:{method:'GET', isArray:false},
        claim : { method: 'POST', params : { operation: 'claim' }},
        unclaim : { method: 'POST', params : { operation: 'unclaim' }},
        delegate : { method: 'POST', params : { operation: 'delegate' }},
        resolve : { method: 'POST', params : { operation: 'resolve' }},
        complete : { method: 'POST', params : { operation: 'complete' }},
        submitTaskForm : { method: 'POST', params : { operation: 'submit-form' }}
      });

      //form
      var forms = $resource(baseURL + '/:context/:id/:action', { id: '@id' } , {
        startForm : { method: 'GET', params : { context: 'process-definition', action: 'startForm' }},
        taskForm : { method: 'GET', params : { context: 'task', action: 'form' }}
      });

      this.taskList.getForm = function(data, fn) {//任务的from
        return forms.taskForm(data, fn);
      };

      this.taskCount = $resource(baseURL + '/task/count');

      //流程定义
      this.processDefinitions = $resource(baseURL + '/process-definition/:id/:operation', { id: '@id' }, {
        xml : { method: 'GET', params : { operation: 'xml' }}
      });


      this.processDefinitions.getStartForm = function(data, fn) {
        return forms.startForm(data, fn);
      };

      this.processDefinitions.startInstance = function(data, fn) {
        data = angular.extend(data, { operation : 'submit-form' });

        return this.save(data, fn);
      };

      //用户组
      this.groups = $resource(baseURL + '/identity/groups');

      //人物相关人
      this.identitylinks = $resource(baseURL + '/runtime/tasks/:taskId/identitylinks/:family/:identityId/:type', { taskId: '@id' }, {
        xml : { method: 'GET', params : { operation: 'xml' }}
      });

      //获得任务的所有附件
      this.attachments = $resource(baseURL + '/runtime/tasks/:taskId/attachments', { taskId: '@id' }, {
      });

      //流程实体
      this.processInstance = $resource(baseURL + '/process-instance/:id/:operation', { id: '@id' } , {
        variables : { method: 'GET', params : { operation: 'variables' }}
      });

    }

    TaskApi.prototype.getProcessDefinitions = function() {
      return this.processDefinitions;
    };

    TaskApi.prototype.getTaskList = function () {
      return this.taskList;
    };


    TaskApi.prototype.getTaskCount = function () {
      return this.taskCount;
    };

    TaskApi.prototype.getColleagueCount = function (userId) {
      return this.taskCount.get({ assignee: userId });
    };

    TaskApi.prototype.getGroupTaskCount = function(groupId) {
      return this.taskCount.get({ candidateGroup: groupId });
    };

    TaskApi.prototype.getGroups = function(userId) {
      return this.groups.get({ userId: userId });
    };

    TaskApi.prototype.getProcessInstance = function() {
      return this.processInstance;
    };

    TaskApi.prototype.getIdentitylinks = function() {
      return this.identitylinks;
    };

    TaskApi.prototype.getAttachments = function() {
      return this.attachments;
    };

    //查询用户关联的用户
    TaskApi.prototype.queryTaskIdentitys = function (taskId,cb) {
      $http.get('/tasks/' + taskId + '/identitylinks').success(function (result) {
        cb(result);
      });
    };

    //验证数据的正确性
    TaskApi.prototype.resDataValid = function (result) {
      return true;
    };

    return new TaskApi();
  };

  TaskManagerFactory.$inject = ['$resource','$http'];

  module.factory('taskManager', TaskManagerFactory);
});
