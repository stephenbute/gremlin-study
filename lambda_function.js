const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var clusterEndpoint = process.env.CLUSTER_ENDPOINT;
var port = process.env.CLUSTER_PORT;

var connectionStrArray = [];
connectionStrArray.push("wss://");
connectionStrArray.push(clusterEndpoint);
connectionStrArray.push(":");
connectionStrArray.push(port.toString());
connectionStrArray.push("/gremlin");

exports.lambda_handler = async (event, context, callback) => {
    var dc = new DriverRemoteConnection(connectionStrArray.join(""));
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    //var holdingSecurities = process.env.HOLDING_SECURITIES.split(",");

    var news = await g.V().hasLabel("MyNews").values("title").toList();
    console.log("news number "+news.length);
    
    //news = ["钴曾被疯抢如今价格腰斩连累寒锐钴业市值蒸发275亿"];
    
    //var result = new Map();
    var result = "{ 'impactchain': [";
    
    for (var prop in news) {

        console.log('news['+prop+']: ', news[prop]);
        //news-> security
        //var fund1 = await g.V().hasLabel("MyNews").has("title",news[prop]).out("refer").inE("hold").otherV().hasLabel("fund").has("time","latest").values("name").toList();
        //console.log('impact fund 1 :', fund1);
        
        //news-> institution -> security
        //var fund2 = await g.V().hasLabel("MyNews").has("title",news[prop]).out("refer").out("issue").inE("hold").otherV().hasLabel("fund").has("time","latest").values("name").toList();
        //console.log('impact fund 2 :', fund2);
        //var fund = consolidate(fund1,fund2);
        
        var fund = await g.V().hasLabel("MyNews").has("title",news[prop]).out("refer").union("hasLabel('security)", "hasLabel('fund')".out("hold").hasLabel("security")).inE("hold").otherV().hasLabel("fund").has("time","latest").valueMap();
 
        
        //result.set(news[prop],fund);
        if(fund.length > 0) {
            result = result+"{'news' : '"+news[prop]+"', ";
            result = result + "'fund' : "+JSON.stringify(fund) +"},";
        }
    }
    result = result + "}"
    
    dc.close();
    callback(null,response(200,result))
}

/*exports.lambda_handler = (event, context, callback) => {
    var dc = new DriverRemoteConnection(connectionStrArray.join(""));
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    var holdingSecurities = process.env.HOLDING_SECURITIES.split(",");

    console.log('holding securities :', holdingSecurities);
    console.log('Received event in handler:', JSON.stringify(event));
    
    if (event == undefined) {
        event = {
            "action": "search/fund"
        }
    }

    g.V().hasLabel("MyNews").values("title").toList().
    then(data => {
        console.log("news : " + JSON.stringify(data));
        
        dc.close();
        callback(null,response(200,data))
    }).catch(error => {
        console.log('ERROR', error);
        dc.close();
        response(400,error)
    });

    g.V("stp001").out("mention").out("manage").out("hold").has("name_short", "within('16国开09','16广发银行CD053')").limit(50).values("name_short")
.toList().
    then(data => {
        console.log("type: "+typeof(data)+" security : " + JSON.stringify(data));
        dc.close();
        //var result = { "news": "test", "security": data };
        callback(null, response(200, data));
    
    }).catch(error => {
        console.log('ERROR', error);
        dc.close();
        callback(null, response(400, error));
    });
}*/



function response(status, data) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
        'Access-Control-Allow-Headers': '*',
        "Content-Type": "application/json"
    };

    var response = {
        "statusCode": status,
        "headers": headers,
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };

    console.log("response : " + JSON.stringify(response));

    return response;
}

function findImpactSec(sec1,sec2){
    
    //console.log("securities 1 "+sec1);
    
    //console.log("securities 2 "+sec2);
    
    var crossSet1 = sec1.filter(function(v){ return holdingSecurities.indexOf(v) > -1 });
    
    //console.log("cross set 1 "+crossSet1);
    
    var crossSet2 = sec2.filter(function(v){ return holdingSecurities.indexOf(v) > -1 });
    
    //console.log("cross set 2 "+crossSet2);
    
    //并集
    var uniSet = crossSet1.concat(crossSet2.filter(function(v){ return !(crossSet1.indexOf(v) > -1)}));
    
    return unique(uniSet);
}

function consolidate(fund1, fund2){
    //console.log('str 1 '+ fund1);
    //console.log('str 2 '+ fund2);
    //并集
    var uni = fund1.concat(fund2.filter(function(v){ return !(fund1.indexOf(v) > -1)}));
    //console.log('uni '+ uni);
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

