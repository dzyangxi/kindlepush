$(window).on('load',function  () {
	
	var dataSource = {data:[{'src':'P_00.jpg'},{'src':'P_010.jpg'},{'src':'P_08.jpg'},{'src':'P_09.jpg'},{'src':'P_012.jpg'},{'src':'P_03.jpg'},{'src':'P_04.jpg'},{'src':'P_018.jpg'},{'src':'P_017.jpg'}]};


	waterfaull();

	$(window).on('scroll',function (){
		if (checkscrollside()) {

			$.each(dataSource.data,function(key,value){
				console.log('data');
				// var oBox = $('div').addClass('box').appendTo($('#main'));
				// var oPic = $('div').addClass('pic').appendTo($(oBox));
				// $('<img>').attr('str','images/'+$(value).attr('src')).appendTo($oPic);
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			});
			
			
		};	

		waterfaull();		
	});
});

function waterfaull () {
	//取得main下的第一级div
	var $boxs = $('#main>div');

	//width()只获取定义的宽度  outerWidth()：包括padding+宽度
	var w = $boxs.eq(0).outerWidth();

	//列数
	var cols = Math.floor($(window).width()/w);

	$('#main').width(w*cols).css('margin','0 auto');

	var hArr = new Array() ;

	$boxs.each(function (index,value) {

		var height = $boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index] = height;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH +'px',
				'left':minHIndex*w+'px'
			});

			hArr[minHIndex] += $boxs.eq(index).outerHeight();
		};
	});
}

function checkscrollside () {

	//获取最后一个
	var $lastBox = $('#main>div').last();

	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();

	var documentH = $(window).height();

	return (lastBoxDis<scrollTop+documentH)?true:false;
}