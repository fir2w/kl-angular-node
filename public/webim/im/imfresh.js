// 本模块与后台交互的方法接口部分
var imfreshModel = function(format) {
	this.module = "fresh";
	this.action = "fresh";
	this.format = format;
};
imfreshModel.prototype = BusinessObject;

// 添加便笺
imfreshModel.prototype.addFreshMemo = function(context, title) {};


//创建对象，然后再后续使用
var imfresh = new imfreshModel("json").delegate();