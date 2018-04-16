/*
 * 
 * hahahahhahahahhaha
 * 
 * 
 * 
 * */

$(function() {
	new Fn();
})
window.onload = function() {
    //页面刷新模拟键盘回车事件
	var e = $.Event('keydown');
	e.keyCode = 13;
	$('#txt').trigger(e);
}

function Fn() {
	var that = this;
	this.init();
	this.changeNum();
	this.ok();
	this.del();
	this.rendringpage();
}

Fn.prototype.init = function() {
	var that = this;
	$('#txt').keydown(function(e) {
		if(e.keyCode == 13) {
			that.addnow();
			that.memory();
			$('#txt').val("");
			that.changeNum();
			that.ok();
		}
	})
}

Fn.prototype.addnow = function() {
	var that = this;
	var stxt = $('#txt').val();
	if(stxt) {
		var li = `<li><div id="btn"></div>${stxt}<i id="del" class="iconfont">&#xe63d;</i></li>`;
		$('#todo').append(li);
		this.del();
		this.ok();
	}

}

Fn.prototype.changeNum = function() {
	var num1 = $('#todo').children().length;
	$('#num1').html(num1);
	var num2 = $('#ok').children().length;
	$('#num2').html(num2);
}
Fn.prototype.ok = function() {
	var that = this;
	$('li').on("click", "#btn", function() {
		$(this).addClass('on')
			.html("<i class='iconfont'>&#xe61e;</i>")
			.parent("li")
			.remove()
			.appendTo('#ok');

		that.changeNum();
		that.del();
		that.memory();
	})
}

Fn.prototype.del = function() {
	var that = this;
	$('li').on("click", '#del', function() {
		$(this).parent().remove();
		that.changeNum();
		that.memory();
	})
}

//存cookie
Fn.prototype.memory = function() {
	var $sum1 = $("#todo li");
	if($sum1) {
		var strsum1 = "";

		for(var i = 0; i < $sum1.length; i++) {

			var strsum1 = strsum1 + $("#todo li")[i].outerHTML;
		}
		$.cookie("doing", strsum1, {
			expires: 7
		});

	}
	var $sum2 = $("#ok li");
	if($sum2) {
		var strsum2 = "";

		for(var i = 0; i < $sum2.length; i++) {

			var strsum2 = strsum2 + $("#ok li")[i].outerHTML;
		}
		$.cookie("finish", strsum2, {
			expires: 7
		});
	}
}
Fn.prototype.rendringpage = function() {

	var getsum1 = $.cookie("doing");

	$('#todo').html(getsum1);

	var getsum2 = $.cookie("finish");

	$('#ok').html(getsum2);

}