// JavaScript Document

var colors=new Array();
var count=colors.push("red","green");//返回数组的长度
console.log(count);
count=colors.push("blue");
console.log(count);

var item=colors.shift();//队列右进左出，返回删除的值
console.log("这是返回什么"+item);
console.log(colors.length);

var colors2=new Array();
var count2=colors2.push("red","green");
console.log("这是colors2"+count2);
count2=colors2.unshift("blue");//队列左进右出，返回添加的值
console.log("返回什么"+count2);
var item2=colors2.pop();
console.log(item2);
console.log(colors2.length);










