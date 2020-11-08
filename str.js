
var str0 = [];
var str1 = ["abc","weifh","232k2n3","fdsfdsf","32rewf"];
var str2 = ["abc","weifh"];


var crossSet = str1.filter(function(v){ return str2.indexOf(v) > -1 });

function consolidate(fund1, fund2){
    console.log('str 1 '+ fund1);
    console.log('str 2 '+ fund2);
    //并集
    var uni = fund1.concat(fund2.filter(function(v){ return !(fund1.indexOf(v) > -1)}));
    console.log('uni '+ uni);
    return unique(uni);
}

function unique(array){
    var r = [];
    for(var i = 0, l = array.length; i < l; i++) {
     for(var j = i + 1; j < l; j++)
      if (array[i] === array[j]) j = ++i;
     r.push(array[i]);
    }
    return r;
}

result = new Map();

result.set('钴曾被疯抢如今价格腰斩连累寒锐钴业市值蒸发275亿','str1');

result.set('123','str1dfsdf');


console.log('map '+ JSON.stringify(result));
