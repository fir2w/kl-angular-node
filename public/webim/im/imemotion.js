var imemotionModel = function(format) {
	this.module = "emotion";
	this.action = "emotion";
	this.format = format;
};
imemotionModel.prototype = BusinessObject;
// 发布新的心情
imemotionModel.prototype.publishNewEmotion = function(context, bean) {};

// 创建一个对象，然后再后续使用
var imemotion = new imemotionModel("json").delegate();