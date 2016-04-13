var imtwitterModel = function(format) {
	this.module = "twitter";
	this.action = "twitter";
	this.format = format;
};
imtwitterModel.prototype = BusinessObject;

// 发布新的心情
imtwitterModel.prototype.publishNewTwitter = function(context, bean) {};
//创建一个对象，然后再后续使用
var imtwitter = new imtwitterModel("json").delegate();
