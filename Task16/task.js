// JavaScript Document

var aqiData={};

/* 从用户输入中获取数据，向aqiData中增加一条数据
 然后渲染aqi-list列表，增加新增的数据*/
function addAqiData(){
	var city=document.getElementById("aqi-city-input").value.trim();
	var value=document.getElementById("aqi-value-input").value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
	{
		alert("城市名必须为中英文字符！");
		return;	
	}
	if(!value.match(/^\d+$/))
	{
		alert("空气质量指数必须为整数");
		return;
	}
	aqiData[city]=value;
}
/*渲染aqi-table表格*/
function renderAqiList(){
	var table=document.getElementById("aqi-table");
	var text="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for(var city in aqiData)
	{
		text+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
	}
	table.innerHTML=city?text:"";
}

/*
点击add-btn时的处理逻辑
获取用户输入，更新输入，并进行页面呈现的更新
*/
function addBtnHandle(){
	addAqiData();
	renderAqiList();
}

/*
点击删除按钮的处理逻辑
*/
function delBtnHandle(e){
	var cityName=e.parentElement.parentElement.firstChild.innerHTML;
	delete aqiData[cityName];
	renderAqiList();
}
function init(){
	//在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick=addBtnHandle;
	
	//想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	document.getElementById("aqi-table").addEventListener("click",function(event){
		var event=event||window.event;
		var target=event.target||event.srcElement;
		if(target.nodeName.toLowerCase()=="button")
		{
			delBtnHandle(target);	
		}
	})
}
init();



















