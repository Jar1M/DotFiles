$(document).on("ui",function(c,a){if($("#ui-encourage").length>0){return}var d=a.target;var b=$("<div id='ui-encourage'>").append($("<div class='encourage'>").append($("<div>").text(translate._("Don't risk your security")),$("<div>").text(translate._("Encourage Message")))).dialog({title:translate.company,target:d,width:420,resizable:false,autoOpen:d==null,dialogClass:"ui-encourage",buttons:[{text:translate._("Disable"),click:function(){d!=null&&$.ui.logmeonce.message({ui:"target",target:d.ui,name:"encourage-disable"});$(this).dialog("close")}},{text:translate._("Not Today"),click:function(){d!=null&&$.ui.logmeonce.message({ui:"target",target:d.ui,name:"encourage-not-today"});$(this).dialog("close")}},{text:translate._("Login"),click:function(){$.logmeonce.fireEvent("newtab",{newtab:true,blank:{login:true,close:true}});$(this).dialog("close")}}]});if(d!=null){$(b).dialog("widget").css("visibility","hidden");$(b).dialog("open");$(b).dialog("widget").css("visibility","visible")}});