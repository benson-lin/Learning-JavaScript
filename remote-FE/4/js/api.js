define(['jquery'], function($){
	return {
		getUser: function(){
			var def = $.Deferred();
			require(['./app/user'], function(user){
				def.resolve(user);
			});
			return def;
		},
		loadUser: function(){
			require(['text!./../user.html!strip'], function(template){//strip:只拿body的内容，需要有服务器启动，否则不支持file://本地文件跨域
				 $("#userInfo").html(template);
			});
		}
	};
});