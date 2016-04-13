/* global ngDefine: false */

/**
 *
 */
ngDefine('klwork.services', [
  'module:klwork.services.socket:./socket.service',
  './uiManager.service',
  './imManager.service',
  'module:klwork.services.userManager:./userManager.service',
  './dataMockManager.service',
  './outsourcingProject.service',
  './taskManager.service',
  'module:klwork.services.notificationManager:./notifications.service',
  'module:klwork.services.routeResolverServices:./routeResolver.service',
  'module:klwork.services.ui:./ui.klwork.service'
], function() {});
