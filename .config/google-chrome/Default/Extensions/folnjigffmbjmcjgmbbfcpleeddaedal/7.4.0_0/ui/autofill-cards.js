$(document).on("ui",function(c,f){var d=f.target;var g=$("#autofill-cards");var a=g.length>0&&g.dialog("option","target")===d?"none":undefined;g.dialog("option","hide",null).dialog("close");var b=$("<ul id='autofill-cards' class='card-list select-dialog'>").append(f.cards.length<=0?$("<li class='empty'>").text(translate._("No cards found")):"",$.map(f.cards,function(e,h){var j=creditcards.card.format(e.number);if(typeof j=="string"&&j.length>4){var k=j.lastIndexOf(" ")>0?j.lastIndexOf(" "):j.length-4;j=j.replace(/[0-9]/g,"*").substr(0,k)+j.substr(k)}return $("<li>").css({width:f.cards.length<=1?"100%":"50%"}).append($("<div class='credit-card'>").data("index",h).css({backgroundColor:e.color||"#FF0000"}).append($("<span class='issuer'>").text(e.issuer),$("<span class='type'>").addClass(typeof e.type==="string"?e.type.replace(/\s+/g,"-").toLowerCase():null),$("<span class='number'>").text(j),$("<span class='expires'>").append($("<span>").text(e.month),$("<span>").text(e.year)),$("<span class='name'>").text(e.name))).contextmenu({items:function(){return[{text:translate._("Edit"),icon:"far fa-edit",click:function(i){$.logmeonce.fireEvent("urlGoto",{url:"/wallet/"+e.id,newtab:true})}},{text:translate._("Copy to Clipboard"),icon:"far fa-copy",items:$.map([{name:translate._("Card name"),copy:e.name},{name:translate._("Card number"),copy:e.number},{name:translate._("Card month"),copy:e.month},{name:translate._("Card year"),copy:e.year},{name:translate._("Card code"),copy:e.code},{name:translate._("Card issuer"),copy:e.issuer},{name:translate._("Card type"),copy:e.type},],function(i){return i.copy!=null?{text:i.name,icon:"far fa-copy",click:function(){$.copyToClipboard(i.copy)}}:null})}]}})})).on("click",".credit-card",function(){$.ui.logmeonce.message({ui:"target",target:d.ui,name:"fill",args:{fill:"card",index:$(this).data("index")}});b.dialog("close")}).dialog({title:translate._("Credit cards",1),target:d,width:f.cards.length<=1?250:450,minWidth:f.cards.length<=1?250:450,maxWidth:600,minHeight:0,maxHeight:300,resizable:false,autoOpen:false,icons:["password-generate","site-select","autofill-profile"],show:a,open:function(){$(this).css({height:"auto"})}});b.dialog("widget").css("visibility","hidden");b.dialog("open");b.dialog("widget").css("visibility","visible")});