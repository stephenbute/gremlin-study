https://blog.csdn.net/linlin1989117/article/details/99751274

%%gremlin

//institution manage fund hold security
//g.V().hasLabel('institution').outE('manage').otherV().out('hold').valueMap(true).limit(10)

//g.V().hasLabel('institution').out('manage').limit(10).valueMap(true)


//g.addV("news").property(T.id,"stp002")

//g.V().hasLabel("test1107").valueMap(true)

//g.V("stp001").property("create-time","2020-11-11").property("last-modifiy-time", "2020-11-12")

//g.V().hasLabel("institution").outE().hasLabel("manage").limit(10).valueMap(true)

//g.V().hasLabel("institution").as("a").where(outE().hasLabel("manage")).limit(10).valueMap(true)

//g.V().hasLabel("institution").as("a").where(outE().hasLabel("issue")).limit(10).valueMap(true)

//g.V().hasLabel("institution").as("a").where(outE().hasLabel("issue")).limit(10).addE("mention").from(g.V("stp002"))


//g.V("stp001").addE("mention").to(g.V("ins1437"))

//g.V().hasLabel("person").count()

//find the impacted security by the institution who manage the fund

//g.V("stp001").out("mention").out("manage").out("hold").limit(50).values("name_short")

//g.V("stp002").out("mention").out("issue").order().by("ticker_symbol").limit(1000).valueMap("ticker_symbol","name_short")

//g.V().hasLabel("News").out("mention").out("manage").out("issue").limit(50).valueMap("ticker_symbol","name_short").toList()

//valueMap(true)

//g.V("stp002").outE("mention").otherV().valueMap().out("issue").out("hold").valueMap("ticker_symbol","name_short").limit(50)

//g.V("stp002").out("mention").out("issue").as("a").where(eq(property("ticker_symbol").length(), 6); 

//g.V("stp002").out("mention").out("issue").order().by("ticker_symbol").limit(50).valueMap("ticker_symbol","name_short")

//strategy = ElementIdStrategy.build().create()
//g = graph.traversal().withStrategies(strategy)


//g.V().hasLabel("News").out("mention").out("manage").out("hold").valueMap("ticker_symbol","name_short").limit(50)
//g.V().hasLabel("News").out("mention").out("issue").order().by("ticker_symbol").limit(3)


//g.V().hasLabel("MyNews").has("title","钴曾被疯抢如今价格腰斩连累寒锐钴业市值蒸发275亿").limit(20).valueMap()

//g.V().hasLabel("News").outE().otherV().valueMap(true)

//g.V().hasLabel("security").limit(5).valueMap("ticker_symbol","name_short")

//g.V().hasLabel("institution").limit(10).values("name", "name_short").toList()

//g.V().hasLabel("institution").has("name_short","绿城中国").limit(10).valueMap(true)

//news->security
//g.V().hasLabel("MyNews").out("refer").as('sec').inE("hold").otherV().hasLabel("fund").has("time","latest").as("fund").path()

//g.V().hasLabel("MyNews").out("refer").inE("hold").otherV().hasLabel("fund").has("time","latest").outE("hold").otherV().hasLabel("security").valueMap();

//g.V().hasLabel("MyNews").out("refer").hasLabel("security").union(inE("hold").otherV().hasLabel("fund").has("time","latest"), outE("issue").otherV().inE("hold").otherV().hasLabel("fund").has("time","latest")).valueMap();

g.V().hasLabel("MyNews").out("refer").union(hasLabel("security"), hasLabel("fund").out("hold").hasLabel("security")).inE("hold").otherV().hasLabel("fund").has("time","latest").path();


//news->institution -> security 
//g.V().hasLabel("MyNews").has("title","钴曾被疯抢如今价格腰斩连累寒锐钴业市值蒸发275亿").outE("refer").otherV().outE("issue").otherV().inE("hold").otherV().hasLabel("fund").has("time","latest").path()
    //limit(10).valueMap(true)

//g.V().hasLabel("MyNews").outE("refer").otherV().outE("issue").otherV().inE("hold").otherV().hasLabel("fund").has("time","latest").valueMap(true)


//g.V().hasLabel("MyNews").has("title","网易有道递交招股书：丁磊持股30%上半年净亏1.68亿元").out("refer").out("issue").inE("hold").otherV().hasLabel("fund").has("time","latest").values("name").toList();
        
//g.V().hasLabel("MyNews").out("refer").valueMap()

//g.V().hasLabel("fund").has("time","latest").limit(10).valueMap(true)
//g.V("a2bad16a-b7c8-16f6-29cd-2b7559f6257c").out("hold").valueMap(true)

//g.V().hasLabel("MyNews").out("refer").has("name_short","德邦股份")
//g.V().hasLabel("MyNews").out("refer").out("issue").has("name_short","德邦股份")

//g.V().hasLabel("MyNews").has("title","网易有道递交招股书：丁磊持股30%上半年净亏1.68亿元").out("refer").out("issue").inE("hold").valueMap(true)

