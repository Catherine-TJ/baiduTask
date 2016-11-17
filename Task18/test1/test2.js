// JavaScript Document

$=function(el){
	return document.querySelector(el);	
}
var data=[];

function render(){
	//data.map()表示对data数组中的每一个元素执行function函数
	$("#result").innerHTML=data.map(function(d){
		return "<div>"+d+"</div>";	
	}).join("");
}

//处理函数
function deal(func,succ){
	var args=[].slice.call(arguments,2);
	return function(e){
		try{
			var arg=args.map(function(item){
				return typeof item==="function"?item(e):item;	
			});
			var result=func.apply(data,arg);
			if(succ!=null)
			{
				succ(result);	
			}//这句话表示如果提示为错误，则直接返回其值（返回alert）。
		}	
		catch(ex){
			alert(ex.message);//出现异常则返回异常信息。
		}
		render();
	};
}

//获取输入的值
function getInputValue(){
	var numStr=$("input").value;
	if(!validate(str)) throw new Error("输入有误！");
	return parseInt(numStr);
	console.log("输入的值"+numStr);
}
//验证输入值得有效性
function validate(str){
	//去除输入值的前后空白
	var strTrim=str.replace(/(^\s*)|(\s*$)/,"");
	return /^\d+$/.test(strTrim);
}

//获取点击的按钮索引号
function getClickIndex(e){
	var node=e.target;
	return [].indexOf.call(node.parentNode.children,node);
	//返回所点击的子元素是其父元素的第几个元素
}

//给按钮添加事件
$("#left-in").onclick=deal([].unshift,null,getInputValue);
$("#right-in").onclick=deal([].push,null,getInputValue);
$("#left-out").onclick=deal([].shift,window.alert);
$("#right-out").onclick=deal([].pop,window.alert);
$("#result").onclick=deal([].splice,null,getClickIndex,1);














