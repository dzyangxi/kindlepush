
//窗口加载时执行些函数
window.onload=function () {

	var dataSource = {data:[{'src':'P_00.jpg'},{'src':'P_010.jpg'},{'src':'P_08.jpg'},{'src':'P_09.jpg'},{'src':'P_012.jpg'},{'src':'P_03.jpg'},{'src':'P_04.jpg'},{'src':'P_018.jpg'},{'src':'P_017.jpg'}]};

	waterfull('main','box');

	//当窗口
	window.onscroll = function(){
		
		if (checkscrollside()) {

			var oParent = document.getElementById('main');

			for(var i=0; i<dataSource.data.length; i++){
				//加载
				var OBox = document.createElement('div');
				OBox.className = 'box';
				oParent.appendChild(OBox);

				var OPic = document.createElement('div');
				OPic.className = 'pic' ;
				OBox.appendChild(OPic);

				var OImg = document.createElement('img');

				OImg.src = 'images/'+dataSource.data[i].src;
				OPic.appendChild(OImg);
			}

			waterfull('main','box');
		};
	}
}


function waterfull (parent,box) {

	//取出要查找元素的节点
	var oParent = document.getElementById(parent);
	//取出节点下的所有class元素
	var oBoxs = getByClass(oParent,'box');

	//计算每个box宽度
	var oBoxW = oBoxs[0].offsetWidth;	//offsetWidth偏移量
	//计算每行有多少列
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);		//Math.floor四舍五入    document.documentElement.clientWidth节点客户端宽度

	oParent.style.cssText = 'width:'+oBoxW*cols+'px; margin:0 aout;';		//设置main宽度和居中


	var boxs = [];	//记录第一行的个数，然后根据第一行个数下确定下一个box的放置位置
	for (var i = 0; i<oBoxs.length; i++) {
		if (i<cols) {
			boxs.push(oBoxs[i].offsetHeight);
		}else{

			//计算出最小的一个box
			var minH = Math.min.apply(null,boxs);

			//取出最小一个的index
			var index = getMinIndexByArrays(boxs,minH);

			oBoxs[i].style.position = 'absolute';

			oBoxs[i].style.top = minH +'px';
			oBoxs[i].style.left = oBoxW * index + 'px';

			boxs[index] += oBoxs[i].offsetHeight;
		}; 
	};

}

//取出节点下的所有class
function getByClass (parent,clsName) {

	//用来存储所有box
	var boxs = new Array();

	//取出指点节点下的所有class
	var oElements = parent.getElementsByTagName('*');

	for (var i=0;i<oElements.length;i++) {
		if (oElements[i].className==clsName) {
			boxs.push(oElements[i]);	//向数组插入值
		};
	};

	return boxs ;
}

//取出数组最小一个的index
function getMinIndexByArrays (boxs,minH) {
	for (var i=0; i<boxs.length; i++) {
		if (boxs[i]==minH) {
			return i ;
		};
	};
}

function checkscrollside () {
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	for(var i=0; i<oBoxs.length; i++){
		//最后一个盒子的高度=盒子到父元素的高度+自身高度/2
		var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[i].offsetHeight/2);

		//滚动高度(分为浏览器兼容模式或不兼容模式)
		var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop ;
		
		//页面高度
		var documentH = document.body.clientHeight || document.documentElement.clientHeight ;
	}

	//如果最后个图片的高度小于文档高度，则返回true，加载
	return (lastBoxH<scrollHeight+documentH)?true:false ;
}

