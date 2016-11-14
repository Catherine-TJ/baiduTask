// JavaScript Document
var start=0;
//时间格式转换
function getDataStr(dat){
	var y=dat.getFullYear();
	var m=dat.getMonth()+1;
	m=m<10?"0"+m:m;
	var d=dat.getDate();
	d=d<10?"0"+d:d;
	return y+"-"+m+"-"+d;
}
//随机模拟生成测试数据
function randomBuildData(seed){
	var returnData={};
	var dat=new Date("2016-01-01");
	var datStr="";
	for(var i=1;i<92;i++)
	{
		datStr=getDataStr(dat);
		returnData[datStr]=Math.ceil(Math.random()*seed);
		dat.setDate(dat.getDate()+1);	
	}
	return returnData;
}

//随机产生背景颜色
function randomColor(){
	var arraycolor = ['#18BF7D', '#5B9980', '#114465', '#3E627B', '#2A674F', '#21C5B6', '#48DEB2', '#86B4D8', '#71EABA', '#2F8096', '#A2FCD8', '#B3D8F6'];
    return arraycolor[Math.floor(Math.random()*(arraycolor.length))];
}

//总数据对象
/*
	aqiSourceData的格式为：
	aqiSourceDara={
		"北京"{"2016-01-01"{n1},"2016-01-02"{n2},"2016-01-03"{n3}...},
		"上海"{"2016-01-01"{n1},"2016-01-02"{n2},"2016-01-03"{n3}...},
		...,
		...	
	}
*/
var aqiSourceData={
	"北京":randomBuildData(500),
	"上海":randomBuildData(300),
	"广州":randomBuildData(200),
	"深圳":randomBuildData(100),
	"成都":randomBuildData(300),
	"西安":randomBuildData(500),
	"福州":randomBuildData(100),
	"厦门":randomBuildData(100),
	"沈阳":randomBuildData(500)
}

//设置数据用于图表的宽度
var chartWidth={
	"day":10,
	"week":50,
	"month":100
}

//用于渲染图表的数据
var chartData={};

//////////记录当前页面的表单选项
var pageState={
	nowSelectCity:-1,
	nowGraTime:"day"
}

//渲染图表
function renderChart(){
	var ntime=pageState.nowGraTime;
	var chart=document.getElementById("aqi-chart-wrap");
	chart.innerHTML="";//别忘了写这个啊啊啊！！！
	for(var dataTip in chartData)//这种写法多简单
	{
		var aqiValue=chartData[dataTip];
		chart.innerHTML+="<div style='width:"+chartWidth[ntime]+"px; height:"+aqiValue+"px; background-color:"+randomColor()+";' title="+(dataTip+"空气质量："+aqiValue)+"></div>";	
	}
	
	
	
	
	/*for(var i=0;i<chartData.height.length;i++)
	{
		var div=document.createElement("div");
		div.setAttribute("class","bear");
		div.style.height=chartData.height[i]+"px";
		div.style.width=chartWidth[ntime]+"px";
		div.style.backgroundColor=randomColor();
		
		var span=document.createElement("span");
		span.setAttribute("class","divtitle");
		span.style.left=(Math.round(chartWidth[ntime]/2)-70)+"px";
		var p=document.createElement("p");
		p.innerHTML=chartData.time[i];
		
		var p2=document.createElement("p");
		p2.innerHTML="AQI:"+chartData.height[i];
		
		span.appendChild(p);
		span.appendChild(p2);
		div.appendChild(span);
		chart.appendChild(div);
	}*/
	
}

//时间选项表变化
function graTimeChange(){
	/*var ptime=pageState.nowGraTime;
	if(start!=0&&ptime==ntime.value)
	{
		return false;
	}
	else if(start!=0&&ptime!=ntime.value)
	{
		pageState.nowGraTime=ntime.value;
		console.log("时间选项变化，现在所选时间为："+pageState.nowGraTime);	
	}	
	start++;需要参数ntime*/
	//换一种简单的，不需要参数
	if(pageState.nowGraTime===this.value) return;
	pageState.nowGraTime=this.value;	
	//更新初始化图表数据
	initAqiChartData();
	renderChart();
}

//城市选项表变化
function citySelectChange(){
	if(this[this.selectedIndex].value===pageState.nowSelectCity) return;
	pageState.nowSelectCity=this[this.selectedIndex].value;
	console.log("城市选项变化，现在所选城市为："+pageState.nowSelectCity);	
	//更新初始化图表数据
	initAqiChartData();
	renderChart();
}

//时间选项表初始化
function initGraTimeForm(){
	console.log("初始化时间表");
	var input=document.getElementById("form-gra-time").getElementsByTagName("input");
	/*if(start==0) graTimeChange(input[0]);
	for(var i=0;i<input.length;i++)
	{
		input[i].onclick=function(){
			graTimeChange(this);	
		}	
	}*///复杂了，来个简单的
	for(var i=0;i<input.length;i++)
	{
		addEventHandler(input[i],"click",graTimeChange);
	}
}

//初始化城市选项表
function initCitySelector(){
	var citySelect=document.getElementById("city-select");
	console.log("初始化城市表");
	/*var text="";
	for(var c in aqiSourceData)
	{
		text+="<option>"+c+"</option>";
		citySelect.innerHTML=text;
	}
	citySelect.addEventListener("change",citySelectChange);*/
	var text="";
	for(var city in aqiSourceData)
	{
		if(pageState.nowSelectCity===-1)
		{
			pageState.nowSelectCity=city;
		}	
		text+="<option>"+city+"</option>";
	}
	citySelect.innerHTML=text;
	//citySelect.onchange=citySelectChange;
	//使用事件监听器
	addEventHandler(citySelect,"change",citySelectChange);
}

//初始化图表需要的数据,
//主要是创建height数组和time数组，保存在chartData对象中，
//用于图表的渲染
function initAqiChartData(){
/*	chartData.height=[];
	chartData.time=[];*/
	//获取目前页面的日期和城市选择
	var ntime=pageState.nowGraTime;
	console.log("图表数据获取时间为："+ntime);
	var ncity=pageState.nowSelectCity;
	console.log("图表数据获取城市为："+ncity);
	//分日期的不同选择考虑
/*	var jsq=0;*/
	var timeStr="";
	if(ntime=="day")
	{
		chartData={};
/*		for(var v in aqiSourceData[ncity])
		{
			chartData.height[jsq]=aqiSourceData[ncity][v];		
			chartData.time[jsq]=v;
			jsq++;	
		}	*/
		for(var v in aqiSourceData)
		{
			chartData=aqiSourceData[v];	
		}
	}
	else if(ntime=="week")
	{
		/*var i=0;
		var timeStr="";
		var weeknum=0;
		var weekHeight=0;
		for(var v in aqiSourceData[ncity])
		{
			if(jsq==7)
			{
				jsq=0;	
			}
			if(jsq==0)
				{
					timeStr+="From"+v+"<br/>";	
				}
			if(jsq!=6)
			{
				weekHeight+=Number(aqiSourceData[ncity][v]);
				jsq++;
			}
			else
			{
				weekHeight+=Number(aqiSourceData[ncity][v]);
				timeStr+="To"+v;
				chartData.height[weeknum]=Math.round(weekHeight/7);
				chartData.time[weeknum]=timeStr;
				weeknum++;
				weekHeight=0;
				timeStr="";
				jsq++;				
			}	
			i++;
		}*/	
		//换一种简洁的写法(需要考虑到当天是周几)//好像也不简洁。。再想想
		chartData={};
		var weeknum=1;
		var str="";
		var aqiValue=0;
		var i=0;
		var start="";
		var end="";
		for(var date in aqiSourceData[ncity])
		{
			aqiValue+=Number(aqiSourceData[ncity][date]);
			var day=new Date(date).getDay();
			i++;
			
			if(day!=6)
			{
				if(weeknum==1)
				{
					if(i==1)
					{
						start=date;	
					}
				}
				else
				{
					if(day==0)
					{
						start=date;	
					}
				}
				continue;	
			}
			else
			{
				end=date;
				if(weeknum==1)
				{
					str+="第"+weeknum+"周("+start+"~"+end+")";
					chartData[str]=Math.round(Number(aqiValue)/i);
				}
				else
				{
					str+="第"+weeknum+"周("+start+"~"+end+")";
					chartData[str]=Math.round(Number(aqiValue)/7);
				}
				str="";
				aqiValue=0;
				weeknum++;
			}
		}
		if(aqiValue>0)
		{
			var dateStart=new Date(start);
			dateStart.setDate(dateStart.getDate()+day);
			var endYear=dateStart.getFullYear();
			var endMonth=(dateStart.getMonth()+1)<10?"0"+(dateStart.getMonth()+1):(dateStart.getMonth()+1);
			var endDay=(dateStart.getDate())<10?"0"+(dateStart.getDate()):dateStart.getDate();
			end=endYear+"-"+endMonth+"-"+endDay;
			str+="第"+weeknum+"周("+start+"~"+end+")";
			chartData[str]=Math.round((Number(aqiValue)/(day+1)));	
		}

	}
	else//月
	{
		/*var monthNum=0;
		var monthHeight=0;
		var timeStr="";
		var i=0;
		for(var v in aqiSourceData[ncity])
		{
			if(i==0)
			{
				timeStr+="From"+v+"<br/>";
			}
			if(i==31||i==60)
			{
				jsq=0;
				timeStr+="From"+v+"<br/>";
				monthHeight+=Number(aqiSourceData[ncity][v]);
				jsq++;
			}
			else if(i==30||i==59||i==90)
			{
				timeStr+="To"+v;
				monthHeight+=Number(aqiSourceData[ncity][v]);
				chartData.height[monthNum]=Math.round(monthHeight/(jsq+1));
				chartData.time[monthNum]=timeStr;
				timeStr="";
				monthHeight=0;
				monthNum++;
			}
			else
			{
				monthHeight+=Number(aqiSourceData[ncity][v]);
				jsq++;	
			}
			i++;
		}*/
		
		//另外一种方法（直接获取月份）
		chartData={};
		aqiValue=0;
		str="";
		for(var date in aqiSourceData[ncity])
		{
			aqiValue+=aqiSourceData[ncity][date];
			var monthNum=(new Date(date).getMonth())+1;
			var day=new Date(date).getDate();//是从1号开始的吧
			if(monthNum==2)
			{
				if(day==29)
				{
					str+=monthNum+"月";
					chartData[str]=Math.round(Number(aqiValue/day));
					aqiValue=0;
					str="";
				}
				continue;	
			}
			else if(monthNum==1||monthNum==3||monthNum==5||monthNum==7||monthNum==8||monthNum==10||monthNum==12)
			{
				if(day==31)
				{
					str+=monthNum+"月";
					chartData[str]=Math.round(Number(aqiValue/day));
					aqiValue=0;
					str="";
				}
				continue;	
			}
			else
			{
				if(day==30)
				{
					str+=monthNum+"月";
					chartData[str]=Math.round(Number(aqiValue/day));
					aqiValue=0;
					str="";
				}
				continue;	
			}
			
		}
	}
}

/*addEventHandler方法，跨浏览器实现事件绑定*/
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

window.onload=function(){
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
	
	renderChart();
}























