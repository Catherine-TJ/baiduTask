// JavaScript Document

var queueArr=[];//队列数组
var value="";
//事件监听器
function addEventHandler(target,type,func){
	if(target.addEventListener)
	{
		target.addEventListener(type,func,false);	
	}
	else if(target.attachEvent)
	{
		target.attachEvent("on"+type,func);	
	}
	else
	{
		target["on"+type]=func;	
	}
}		
function getValue(){
	var inpValue=document.getElementById("controlForm").getElementsByTagName("input")[0].value.trim();
	if(inpValue=="")
	{
		alert("输入的值为空");
		return false;	
	}
	else if(isNaN(inpValue))
	{
		alert("格式不正确，请输入数字");
		return false;	
	}
	else
	{
		return inpValue;	
	}
}
function leftIn(){
	if(getValue())
	{
		queueArr.unshift(getValue());	
		show();
	}
}
function rightIn(){
	if(getValue())
	{
		queueArr.push(getValue());
		show();	
	}
}
function leftOut(){
	if(queueArr.length>0)
	{
		queueArr.shift();
		show();	
	}
	else
	{
		alert("队列为空！");	
	}
}
function rightOut(){
	if(queueArr.length>0)
	{
		queueArr.pop();
		show();
	}
	else
	{
		alert("队列为空！");	
	}
}
function deleteValue(){
	var queue=document.getElementById("showQueue");
	queue.removeChild(this);
	var children=queue.childNodes;
	queueArr=[];
	for(var i=0;i<children.length;i++)
	{
		queueArr.push(children[i].innerHTML);	
	}
	show();
}

//渲染队列
function show(){
	var queue=document.getElementById("showQueue");
	queue.innerHTML="";
	for(var i=0;i<queueArr.length;i++)
	{
		var div=document.createElement("div");
		div.innerHTML=queueArr[i];
		addEventHandler(div,"click",deleteValue);
		queue.appendChild(div);
	}	
}

//事件处理函数
function controlButton(){
	var input=document.getElementById("controlForm").getElementsByTagName("input");
	for(var i=1;i<input.length;i++)
	{
		switch(input[i].value)
		{
			case "左侧入":addEventHandler(input[i],"click",leftIn);break;			
			case "右侧入":addEventHandler(input[i],"click",rightIn);break;
			case "左侧出":addEventHandler(input[i],"click",leftOut);break;
			case "右侧出":addEventHandler(input[i],"click",rightOut);break;
			default:break;	
		}	
	}
}



//去除字符串前后空白
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/,"");
}


window.onload=function(){
	controlButton();
}


















