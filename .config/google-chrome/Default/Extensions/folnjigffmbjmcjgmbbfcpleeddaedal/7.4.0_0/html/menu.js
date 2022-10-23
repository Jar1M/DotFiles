$(document).on("extension",function(f){var a=this;var d=f.logmeonce.window(a);d.logmeonce=f.logmeonce;d.translate=f.logmeonce.translate;if(f.logmeonce.browser.type=="ie"){$("#search-input").each(function(){$(this).data("val",$(this).val())});a.keyupInterval=setInterval(function(){$("#search-input").each(function(){if($(this).data("val")!=$(this).val()){$(this).data("val",$(this).val()).trigger({type:"keyup",emulated:true})}})},30)}$("#notifications-button .icon").text(Math.min(logmeonce.notification.icon,99)).toggle(logmeonce.notification.icon>0);$("#wrapper").toggleClass("console",logmeonce.config.user!=null&&logmeonce.config.user.console===true).height("auto");$("#offline").toggle(logmeonce.config.user!=null&&logmeonce.config.user.offline===true);$("#firstname").toggle(logmeonce.config.user!=null);$("#search-input").attr("placeholder",translate._("Search sites")).prop("disabled",logmeonce.config.user==null).val("");$("#logout").text(logmeonce.config.user!=null?translate._("Logout"):translate._("Login"));$("#menu-button, #home-button").prop("disabled",logmeonce.config.user==null);$("#site-container .icon-view").empty();if(logmeonce.config.user==null){return}$(".menu-item[allowed]").each(function(){var e=$(this).attr("allowed");var g=logmeonce.config.user.license<100;if(e.length>0&&e.indexOf("|")>0){g=$.grep(e.split("|"),function(h){return logmeonce.allowed.apply(logmeonce,h.split(":"))}).length>0}else{if(e.length>0&&e.indexOf("&")>0){g=$.grep(e.split("&"),function(h){return logmeonce.allowed.apply(logmeonce,h.split(":"))}).length===e.split("&").length}else{if(e.length>0&&e.indexOf(":")>0){g=logmeonce.allowed.apply(logmeonce,e.split(":"))}else{g=logmeonce.allowed("site",e)}}}$(this).toggle(g)});var c=$.type(logmeonce.config.user.profile)=="array"?logmeonce.config.user.profile[0]:logmeonce.config.user.profile;var b=!logmeonce.config.user.name.indexOf("@")?logmeonce.config.user.name:logmeonce.config.user.name.substring(0,logmeonce.config.user.name.indexOf("@"));$("#menu-container").menuItemList();$("#firstname div").text(c.firstname!=null&&c.firstname.length>0?c.firstname:b);$("#fullname").text(c.fullname!=null&&c.fullname.length>0?c.fullname:b);if(logmeonce.config.user.offline!==true){$("#picture").empty().append($("<img>").attr("src",logmeonce.config.user.pictureUrl))}$(".translate").each(function(){if(this.title!=null&&this.title.length>0){var e=$(this).data("translate-title")||this.title;$(this).data("translate-title",e).attr("title",translate._(e))}if(this.tagName=="input"){var e=$(this).data("translate-value")||this.value;$(this).data("translate-value",e).val(translate._(e))}else{if($(this).children().length<=0){var e=$(this).data("translate-text")||$(this).text();$(this).data("translate-text",e).text(translate._(e))}}});$(".container").hide();$("#site-container").show();$("#site-container .icon-view").show().append($("<i class='fa fa-spinner fa-spin'>"));$("#site-container .not-found").hide();setTimeout(function(){$("#import-from .menu-item.availability[import]").each(function(){var h=$(this);logmeonce.importAvailable(h.attr("import")).then(function(i){h.toggleClass("disabled",!i);h.removeClass("not-supported")},function(i){h.addClass("not-supported")})});if(logmeonce.plugin==null){$("#backup li[backup=restore]").addClass("not-supported")}if(logmeonce.plugin==null){$("#backup li[backup=create]").addClass("not-supported");$("#export-to li[export=pdf]").addClass("not-supported")}logmeonce.config.get("sites.sort").then(function(h){$("#site-container").sites(logmeonce.sites(a,{search:$("#search-input").val(),sort:{by:d.sitesSort=h||"most_used",order:"desc"}}))});if($("#firstname").closest(".titlebar").get(0).scrollWidth>$("#firstname").closest(".titlebar").outerWidth()){$("#firstname").width($("#firstname").width()-($("#firstname").closest(".titlebar").get(0).scrollWidth-$("#firstname").closest(".titlebar").outerWidth()+10))}$("#search-input").focus();if(logmeonce.qr("site")!=null){var e=logmeonce.qr("site");var g=$.grep(logmeonce.config.user.sites,function(h){return h.id==e}).shift();g!=null&&$(a).qrcode({site:g})}},50);if(typeof chrome!=="undefined"&&chrome.extension!=null){chrome.tabs.query({currentWindow:true,active:true},function(h){if(h.length>0&&h[0].url.indexOf("http")==0){var i=logmeonce.tools.parseUri(h[0].url).host;var g="url:"+(i.indexOf("www.")===0?i.substr(4):i);var j=logmeonce.sites(a,{search:g});if(j.length>0){var e=$("#search-input").val(g).get(0);$("<i id='search-clear' class='far fa-times'>").attr("title",translate._("Clear")).insertAfter(e);e.select()}}})}}).on("close",function(){if(typeof window.lmoPopoverClose==="function"){window.lmoPopoverClose()}else{window.close()}}).on("click","#search-input",function(a){if(!$("#site-container").is(":visible")){$(".container").hide();$("#site-container").show()}}).on("keyup","#search-input",function(f,a){if(document.keyupInterval!=null&&f.emulated!==true){clearInterval(document.keyupInterval)}var c=$(this);var d=$.extend({debounce:200,forced:false},typeof a==="object"?a:{});var b=$(this).val().trim();$(this).debounce(d.debounce,function(){var e=$("#site-container").data("searched")!=b||d.forced;e&&logmeonce.sites(document,{sort:{by:window.sitesSort,order:"desc"},search:b,sync:true}).then(function(g){$("#site-container").data("searched",b).sites(g)},null,function(g){$("#site-container").data("searched",b).sites(g)})});if(b.length>0&&$(this).siblings("i").length<=0){$("<i id='search-clear' class='far fa-times'>").attr("title",translate._("Clear")).insertAfter(this)}else{if(b.length<=0){$(this).siblings("i").remove()}}}).on("click","#search-clear",function(){$("#search-input").val("").trigger("keyup")}).on("click","#home-button",function(){logmeonce.urlGoto("/home",{newtab:true});$(document).trigger("close")}).on("click","#menu-button",function(){$("#menu-container").trigger("open")}).on("click","#notifications-button",function(){if($("#notifications-container").is(":visible")){return}logmeonce.notification.read().then(function(a){$(".container").hide();$("#notifications-container").notifications(a)})}).on("click","#password-button",function(){if($("#password-generate").is(":visible")){return}$(".container").hide();$("#password-generator input").length<=0&&$("#password-generator").passwordGenerator();$("#password-generator").show()}).on("click",".logout, #logout",function(){if(logmeonce.config.user!=null){logmeonce.logout()}else{logmeonce.urlGoto("about:newtab",{newtab:true})}$(document).trigger("close")}).on("click",".disabled, .not-supported",function(a){a.stopImmediatePropagation();$.confirm(translate._("Plugin is not installed")+" "+translate._("Would you like to install?")).then(function(){logmeonce.urlGoto("/download",{newtab:true})})}).on("click",".dashboard",function(){logmeonce.urlGoto("/dashboard",{newtab:true});$(document).trigger("close")}).on("click","[import]",function(){logmeonce.urlGoto("/import/"+$(this).attr("import"),{newtab:true});$(document).trigger("close")}).on("click","[export=pdf]",function(){logmeonce.exporting(null,$(this).attr("export")).then(successClose,failClose)}).on("click","[export][export!=pdf]",function(){logmeonce.urlGoto("/export/"+$(this).attr("export"),{newtab:true});$(document).trigger("close")}).on("click",".manually",function(){logmeonce.addSite();$(document).trigger("close")}).on("click","[backup='create']",function(){logmeonce.exporting(null,{name:"logmeonce",backup:true}).then(successClose,failClose)}).on("click","[backup='restore']",function(){logmeonce.importing(null,{name:"logmeonce",backup:true}).then(successClose,failClose)}).on("click",".send-logs",function(){logmeonce.log(null,{action:"ui"});$(document).trigger("close")}).on("click",".about",function(){logmeonce.about();$(document).trigger("close")}).on("click","a[href^='http'], a[href^='/']",function(a){a.preventDefault();logmeonce.urlGoto($(this).attr("href"),{newtab:$(this).attr("target")=="_blank"});$(document).trigger("close")});function successClose(){$(document).trigger("close")}function failClose(b){var a=b!=null&&b.message!=null&&b.plugin==false?$.confirm(b.message+" "+translate._("Would you like to install?")):$.Deferred().reject();return a.then(function(){logmeonce.urlGoto("/download")}).always(function(){$(document).trigger("close")})}$(function(){if(typeof chrome!=="undefined"&&chrome.extension!=null){$(document).trigger({type:"extension",logmeonce:chrome.extension.getBackgroundPage().logmeonce})}});(function(a){a.ui.dialog.prototype._init=function(b){return function(){var c=this;this.options.open=function(d){return function(h){c.options.modal&&c.overlay.$el.addClass("open");var g=a(this);var f=a("<span class='ui-dialog-icons'>").append(a("<a class='close'>").attr("title",translate._("Close")).append(a("<i class='far fa-times fa-fw'>"))).on("click","a.close",function(i){i.preventDefault();g.dialog("close")});a(this).siblings(".ui-dialog-titlebar").append(f).children(".ui-dialog-titlebar-close").remove();c.options.open=d;return typeof d==="function"?d.apply(this,arguments):undefined}}(this.options.open);this.options.beforeClose=function(d){return function(){c.options.modal&&c.overlay.$el.removeClass("open");return typeof d==="function"?d.apply(this,arguments):undefined}}(this.options.beforeClose);return b.apply(this,arguments)}}(a.ui.dialog.prototype._init);a.message=function(c){var e=a.extend({text:typeof c==="string"?c:"",html:null,buttons:["ok"],learnMore:null},typeof c==="object"?c:{});var d={ok:{text:"OK",click:function(){b.resolve();a(this).dialog("close")}},cancel:{text:translate._("Cancel"),click:function(){b.reject();a(this).dialog("close")}}};var b=a.Deferred();a("<div class='alert'>").append(e.html!=null?a("<span>").html(e.html):a("<span>").html(e.text.replace(/\n/g,"<br><br>")),e.learnMore!=null?a("<div class='more'>").append(a("<span>").text(translate._("Would you like to learn more?")),a("<a target='_blank'>").attr("href",e.learnMore).text(translate._("Click here"))):null).dialog({resizable:false,modal:true,width:a(window).width()*0.8,buttons:a.map(e.buttons,function(f){return typeof f==="string"?d[f]:f}),create:function(){a(this).css({minWidth:"300px",maxWidth:"600px",minHeight:"auto"})},close:function(){b[e.buttons.length===1&&e.buttons[0]==="ok"?"resolve":"reject"].call(b);a(this).dialog("destroy").remove()}});return b.promise()};a.confirm=function(b){return a.message(a.extend({text:typeof b==="string"?b:"",buttons:["cancel","ok"]},typeof b==="object"?b:{}))};a.alert=function(b){return a.message(b)};a.fn.sites=function(f){a(".icon-view",this).toggle(f.length>0);a(".not-found",this).toggle(f.length<=0);if(f.length<=0){return}var e={clickToLogin:translate._("Click to login"),openMenu:translate._("Open Menu")};var b=f.slice(0,20);var d=a("ul",this).empty().append(a.map(b,function(h){var g=a("<li>").attr("title",e.clickToLogin).append(a("<div class='site-logo'>").css({backgroundImage:"url("+h.image+")"}),a("<div class='label'>").append(a("<div class='inner'>").append(a("<span>").text(h.name))),a("<a class='more'>").attr("title",e.openMenu).append(a("<i class='fa fa-ellipsis-h'>"))).on("click","a.more",function(i){i.stopPropagation();a(this).closest(".contextmenu").trigger({type:"contextmenu",position:{of:this}})}).on("click",function(){logmeonce.sso(document,h.id);a(document).trigger("close")});setTimeout(function(){g.sitecontext(h)},0);return g}));for(var c=0;c<5;c++){a("<li class='hidden'>").appendTo(d)}a(".label",d).sitelabel()};a.fn.menuItemList=function(){if(a(this).data("menu-attached")===true){a(document).off("click.menu-item-list");a("ul",this).hide();return this.hide()}return this.data("menu-attached",true).on("click",".recently-used",function(d){if(d.isDefaultPrevented()){return}var g=a(".menu-item-list",this).empty();if(logmeonce.config.loginList.length<=0){a("<li class='menu-item'>").text(translate._("None")).appendTo(g)}else{var h=10;var f=[];for(var b=logmeonce.config.loginList.length-1;b>=Math.max(0,logmeonce.config.loginList.length-h);b--){var c=a.grep(logmeonce.config.user.sites,function(e){return e.id==logmeonce.config.loginList[b].id});c.length>0&&f.push(c[0])}a.each(f,function(k,j){var e=[{text:translate._("Goto"),click:function(){logmeonce.sso(document,j.id);a(document).trigger("close")}},{text:translate._("Logout"),click:function(){logmeonce.siteLogout(j.id);a(document).trigger("close")}},{separator:true}].concat(g.sitecontext({load:"items",site:j}));a("<li class='menu-item menu-submenu'>").append(a("<span>").text(j.name),a("<ul class='menu-item-list'>").append(a.map(e,function(i){if(i.separator===true){return a("<li class='menu-separator'>")}else{if(i.allowed!==false&&i.disabled!==true){return a("<li class='menu-item'>").text(i.text).on("click",i.icon=="icon-copy"?function(){i.click.apply(this,arguments);a(document).trigger("close")}:i.click)}}}))).appendTo(g)})}}).on("click",".menu-submenu",function(b){if(b.isDefaultPrevented()){return}if(a(".menu-item-list:first",this).find(".menu-header").length<=0){a(".menu-item-list:first",this).prepend(a("<li class='menu-header'>").append(a("<button class='btn orange back'>").prepend(a("<i class='fas fa-chevron-double-left'>"),a("<span>").text(translate._("Go Back"))).on("click",function(d){a(this).closest(".menu-item-list").hide();a("#wrapper").height("auto");d.preventDefault()})),a("<li class='menu-separator'>"))}var c=a(".menu-item-list:first",this).show();if(a("#wrapper").height()<c.height()+c.offset().top){a("#wrapper").height(c.height()+c.offset().top)}b.preventDefault()}).on("open",function(){var b=a(this).show("slide",{easing:"easeOutQuad"},300);if(a("#wrapper").height()<b.height()+b.offset().top){a("#wrapper").height(b.height()+b.offset().top)}a(document).on("click.menu-item-list",function(c){if(c.target!=b&&a(c.target).parents(".menu-item-list").length===0){a("ul",b).hide();a(b).hide("slide",{easing:"easeOutQuad"},300,function(){a("#wrapper").height("auto")});a(document).off("click.menu-item-list")}})})};a.fn.notifications=function(c){if(a(this).data("initialized")==null){var e=a(this).data("initialized",true).on("click",".refresh",function(){var f=a(this).hide().after(a("<i class='fa fa-spinner fa-spin'>"));logmeonce.notification.refresh({callee:"menu"}).then(function(g){if(g.length!=null&&g.length>0){if(logmeonce.notification.icon>0){a("#notifications-button .icon").text(Math.min(logmeonce.notification.icon,99)).show()}else{a("#notifications-button .icon").hide()}var h=g.concat(c);h.sort(function(j,i){return i.time-j.time});a(e).notifications(h)}}).always(function(){f.show().siblings("i").remove()})}).on("click",".clear",function(){logmeonce.notification.clear({callee:"menu"});a(document).trigger("close")}).on("click",".password-generated .btn-toggle",function(){var g=a(this);var h=a(this).parent();var f=g.closest(".password-generated").data("password");if(a("#password",h).length>0){a("#password",h).remove();a(this).val(translate._("Show"))}else{if(a.verified===true){a(this).val(translate._("Hide"));a("<span id='password'>").text(f).appendTo(h)}else{a("#verification").on("keypress","input",function(i){(i.which==10||i.which==13)&&a(this).closest(".ui-dialog").find("button:last").trigger("click")}).on("click","button",function(l){l.preventDefault();var j=a(this).closest(".login-list");var i=a(this).closest("form");if(!a(this).hasClass("active")){a("button.active",j).removeClass("active");var k=a(this).addClass("active").val();a(".auth."+k,i).show();a(".auth:not(."+k+")",i).hide();setTimeout(function(m){a(".auth.body."+k+" input:first",m).focus()},200)}}).dialog({title:translate._("Verification"),resizable:false,logmeonce:false,modal:true,width:"420px",minHeight:"auto",dialogClass:"ui-logmeonce",open:function(){var i=this;var j="password";if(logmeonce.config.user.keys.mobileconnect==null){a(".login-list button.mobileconnect",this).remove()}logmeonce.config.get("user").then(function(l){var k=l!=null&&l.length>0?l.split(","):[];if(k.length>1&&a(".login-list button."+k[1],i).length>0){j=k[1]}if(j=="mobileconnect"){a(".auth.mobileconnect input",i).val(k[0])}}).always(function(){a("h4",i).text(translate.sprintf(translate._("%s extension require verification"),translate.company));a(".login-list button."+j,i).trigger("click")})},close:function(){a(this).dialog("destroy")},buttons:[{text:translate._("Cancel"),click:function(){a(this).dialog("close")}},{text:translate._("OK"),click:function(){var l=a(this);var n=a(":visible",this).serializeArray();var o=a(".login-list",this);var k=a("button.active",o).val();var p={verification:k};a.each(n,function(s,r){p[r.name]=r.value});var j=a(this).closest(".ui-dialog").find(".ui-dialog-buttonpane button:last-child").addClass("ui-state-disabled").prop("disabled",true).add(a("input, button",this).prop("disabled",true));a(".error."+k,l).text("");if(k.indexOf("push")===0){a("<div class='spinner'>").append(a("<i class='far fa-spinner fa-spin'>"),a("<span>").text(translate._("Sending")+"...")).insertAfter(o)}logmeonce.loadKey(document,p).then(m,q,i);function m(r){a(".spinner",l).remove();l.dialog("close");a.verified=true;g.val(translate._("Hide"));a("<span id='password'>").text(f).appendTo(h)}function q(r){if(r!=null&&r.exception!=null){a(".error."+k,l).text(r.exception.message)}j.removeClass("ui-state-disabled").prop("disabled",false);a(".spinner",l).remove()}function i(s){if(k.indexOf("push")===0){a(".spinner span",l).text(translate._("Waiting")+"...")}else{if(k==="mobileconnect"){function r(u){try{var t=JSON.parse(u.data);if(logmeonce.server.indexOf(u.origin)===0&&t.error!=null){window.removeEventListener("message",r,false);a("#mc-authorization").remove();setTimeout(q,100,{exception:{message:t.error}})}else{if(logmeonce.server.indexOf(u.origin)===0&&t.code!=null&&t.code!=null){window.removeEventListener("message",r,false);a(".spinner span",l).text(translate._("Verifying")+"...");a("#mc-authorization").remove();logmeonce.loadKey(document,a.extend(p,t)).then(m,q,i)}}}catch(u){}}window.addEventListener("message",r,false,true);a("<iframe id='mc-authorization' frameBorder='0' type='content'>").attr("src",s.redirectUrl).css({background:"white",border:0,position:"absolute",left:0,top:0,width:"100%",height:"100%",overflow:"hidden",zIndex:1002,display:s.visibility==null||s.visibility=="visible"?"block":"none"}).load(function(){/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)&&this.contentWindow.addEventListener("lmomc",function(t){r({origin:this.window.location.origin,data:JSON.stringify(t.detail)})},false,true)}).appendTo(document.body);a(".spinner span",l).text(translate._("Waiting for operator")+"...")}}}}}]})}}}).on("mouseover","tr",function(){a(".toggle",this).show()}).on("mouseout","tr",function(){a(".toggle",this).hide()})}a(this).children().not(".notifications-footer").remove();if(c.length<=0){a("<span class='not-found'>").text(translate._("No Notifications")+".").prependTo(this);return a(this).show()}var b=a("<div class='notifications-container'>").prependTo(this);var d=a("<table cellspacing='0' cellpadding='0' width='100%'>").appendTo(b);a(c).each(function(g,l){var k=l.image!=null?"<img src='"+l.image+"' style='max-width: 60px; max-height: 60px'>":"&nbsp;";var j=new Date(l.time).toLocaleString();var f=l.label;var h=l.message;if(l.type==10){f=translate._("Password Generated");k="					<div class='site-logo' style='background-image: url("+logmeonce.server+"image.php?url="+escape(l.url)+"&type=notifications)'>						<img src='"+logmeonce.server+"image.php?url="+escape(l.url)+"&type=notifications' style='opacity: 0; max-width: 60px; max-height: 60px'>					</div>				";h=a("				<div class='password-generated'>					<div>"+translate.sprintf(translate._("Password Generated for %s"),l.host!=null?l.host:l.url)+"</div>					<div class='toggle' style='display: none'>						<input class='btn-toggle btn blue small' type='button' value='"+translate._("Show")+"'>					</div>				</div>				").data("password",l.password)}else{if(l.type==11&&l.share!=null){f=translate._(!l.share.beneficiary?"Pending Share":"Pending Beneficiary");k="<img src='"+logmeonce.server+"image.php?user="+l.share.user+"' style='max-width: 60px; max-height: 60px'>";h=translate.sprintf(translate._(!l.share.beneficiary?"%s would like to share site with you":"%s would like to designate you as site beneficiary"),l.share.username)+".";if(l.share.url!=null){h+=" "+translate.sprintf(translate._("Check email to accept or %s"),"<a target='_blank' href="+l.share.url+">"+translate._("Click here").toLowerCase()+"</a>")+"."}else{h+=" "+translate._("Check email to accept")+"."}if(l.share.sitename!=null){f+=": "+l.share.sitename}}else{if(l.type>11){return true}}}a("			<tr class='notifications-item'>				<td align='center' valign='top'>"+k+"</td>				<td align='left' valign='top'>					<div class='notifications-header'>						<span class='notifications-label title'></span>						<span class='notifications-date title'></span>					</div>					<div class='notifications-message'></div>				</td>			</tr>			").find(".notifications-label").attr("title",f).text(f).end().find(".notifications-date").attr("title",j).text(j).end().find(".notifications-message").css("font-weight",!l.viewed?"bold":"normal").append(h).end().appendTo(d)});a(this).show();a(".notifications-header",this).each(function(){a(".notifications-date",this).css({display:"inline"});a(".notifications-date",this).css({display:"table-cell",width:Math.min(a(this).width()*0.5,a(".notifications-date",this).width()+1)+"px"});a(".notifications-label",this).css({width:"100%"})});if(this.timeout!=null){clearTimeout(this.timeout)}this.timeout=setTimeout(function(){a(".notifications-message").css("font-weight","normal");timeout=null},5000);setTimeout(function(){if(a.grep(c,function(g,f){return !g.viewed}).length>0){a.each(c,function(f,g){g.viewed=true});logmeonce.notification.write(logmeonce.notification.list=c);logmeonce.browser.setBadge("");a("#notifications-button .icon").hide()}},500)};a.fn.sitelabel=function(){return a(this).each(function(){var d,c=a(this).text();var e=new RegExp("\\((.*)\\)","g");var b=null;if((b=e.exec(c))!=null){a("span",this).text(d=c.replace(b[0],""));a(this).parent().mouseover(function(){a(".label span",this).text(c)}).mouseout(function(){a(".label span",this).text(d)})}})};a.fn.sitedelete=function(b){var d=this;var c=a("<div>").text(translate._("Remove Confirmation")).dialog({title:translate.company,resizable:false,modal:true,minHeight:"auto",open:function(){a(this).parent().find(".ui-dialog-buttonset").css("float","right")},buttons:[{text:"OK",click:function(){a(c).dialog("close");logmeonce.deleteSite(document,{site:b.id}).then(function(){a(d).remove()},function(f){f!=null&&f.exception!=null&&alert(f.exception.message)})}},{text:translate._("Cancel"),click:function(){a(this).dialog("close")}}]})};a.fn.sitecontext=function(f){var g=a.extend({load:"contextmenu"},!f.site?{site:f}:f);var d=logmeonce.config.user;var e=g.site;var i=d.flags&4096;var h=e.privileges==null||logmeonce.allowed(e,"read");var b=e.login.inputs!=null?a.map(e.login.inputs,function(j){if(a.inArray(j.type,["radio","checkbox"])<0&&(h||j.mapping===3)){if(j.label==null&&j.flags&2){j.label=translate._("Username")}if(j.label==null&&j.flags&4){j.label=translate._("Password")}if(j.label==null&&j.flags&32){j.label=translate._("Totp code")}var l=j.flags&32;var k=j.label!=null&&j.label.length>0?j.label:(j.name!=null&&j.name.length>0?j.name:"("+translate._("Empty").toLowerCase()+")");return{text:translate._("Copy")+" "+k,icon:"far fa-copy",click:function(n){var m=logmeonce.decrypt(document,{text:j.value,site:e.id});var o=typeof m=="string"&&l?logmeonce.tools.totp(m):m;a.copyToClipboard({text:o,passwordViewed:j.type=="password"&&!l?e.id:null})}}}}):[];var c=[{text:translate._("Edit"),icon:"far fa-edit",click:function(){logmeonce.urlGoto("/dashboard/edit/"+e.id,{newtab:true});a(document).trigger("close")}},{text:translate._("Share"),allowed:d.license<=10&&e.user==null,disabled:i,title:i?translate._("This feature is available only in Cloud Mode"):null,icon:"far fa-share-alt",click:function(){logmeonce.urlGoto("/dashboard/edit/"+e.id+"/#share=true",{newtab:true});a(document).trigger("close")}},{text:translate._("Remove Share"),allowed:e.user!=null&&e.beneficiary===false,icon:"far fa-share-alt",click:function(){logmeonce.urlGoto("/dashboard/edit/"+e.id+"/#share=remove",{newtab:true});a(document).trigger("close")}},{text:translate._("Beneficiary")+" / "+translate._("Heir"),allowed:d.license<=10&&e.user==null,disabled:i,title:i?translate._("This feature is available only in Cloud Mode"):null,icon:"far fa-child fa-fw",click:function(){logmeonce.urlGoto("/dashboard/edit/"+e.id+"/#beneficiary=true",{newtab:true});a(document).trigger("close")}},{text:translate._("Remove Beneficiary"),allowed:e.user!=null&&e.beneficiary===true,icon:"far fa-child fa-fw",click:function(){logmeonce.urlGoto("/dashboard/edit/"+e.id+"/#share=remove",{newtab:true});a(document).trigger("close")}},{text:translate._("Delete"),allowed:logmeonce.allowed(e,"delete"),icon:"far fa-trash-alt",click:function(){a(this).sitedelete(e)}},{text:translate._("Scan totp code"),allowed:e.login.inputs!=null&&logmeonce.allowed(e,"update")&&typeof chrome!=="undefined"&&chrome.extension!=null,icon:"far fa-qrcode",click:function(){a(this).qrcode({site:e})}}].concat(b.length>0?[{separator:true}].concat(b):[]);switch(g.load){case"items":return c;default:return a(this).contextmenu({items:c})}};a.fn.qrcode=function(f){var e={cancel:{text:translate._("Cancel"),click:function(){a(this).dialog("close")}},close:{text:translate._("Close"),click:function(){a(this).dialog("close")}},scan:{text:translate._("Scan again"),click:function(){a(this).empty().append(a("<div class='loading-fa'>").append(a("<i class='fa fa-spinner fa-spin'>"),a("<span>").text(translate._("Scanning current page")+"...")));c.call(this)}},save:{text:translate._("Save"),click:function(i){var h=a(this);var g=a(i.target).is(".ui-button-text")?a(i.target).parent():a(i.target);if(g.is(".ui-state-disabled")){return}g.addClass("ui-state-disabled");logmeonce.saveSite(document,{site:{id:f.site.id,key:f.site.key,inputs:[{flags:32,value:logmeonce.qr("secret")}]}}).then(function(){h.dialog("close");a("#search-input").trigger("keyup",{debounce:0,forced:true})},function(j){j!=null&&j.exception!=null&&a.alert(j.exception.message);g.removeClass("ui-state-disabled")})}}};if(logmeonce.qr("site")==null){logmeonce.qr("site",f.site.id)}function d(){a(this).dialog("option","buttons",[e.cancel,e.scan]);a(this).empty().append(a("<div class='loading-fa'>").css({width:"80%"}).append(a("<i class='far fa-qrcode fa-3x'>"),a("<p>").text(translate._("Scan totp failed"))))}function b(g,i){var o=a(this).dialog("option","buttons",[e.close]);var l=a(this).empty().append(a("<h4>").text(g),a("<div class='input-opts'>").append(a("<div class='input-totp'>"),a("<i class='far fa-eye-slash password-toggle'>").attr("title",translate._("Show")),a("<svg class='circle-svg' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><g transform='translate(10, 10)'><circle class='outer' r='8'></circle><circle class='inner' r='8' transform='rotate(90) scale(-1 1)'></circle></g></svg>"),a("<i class='far fa-paste password-clipboard'>").clipboardtip({content:translate._("Copy to Clipboard")})));var n=logmeonce.tools.totp(i);var k=a(".input-totp",this).data("val",n).addClass("input-totp").attr("type","text");k.append(a.map(n.match(/.{1,3}/g),function(r){var q=k.attr("type")=="text"?r:r.replace(/./g,"&#9679;");return a("<span>").data("text",r).html(q)}));var m=j();function j(){var q=new Date();var r=q.getSeconds()*1000+q.getMilliseconds();var t=r>30000?r-30000:r;var s=t*(50/30000)+11;if(m>s){a("svg .inner",l).attr("class","inner nt").css({strokeDashoffset:0})}else{a("svg .inner",l).attr("class","inner").css({strokeDashoffset:s})}return s}var p=setInterval(function(){var q=j();if(m>q){var r=logmeonce.tools.totp(i);k.data("val",r).empty().append(a.map(r.match(/.{1,3}/g),function(t){var s=k.attr("type")=="text"?t:t.replace(/./g,"&#9679;");return a("<span>").data("text",t).html(s)}))}m=q;if(!jQuery.contains(document,l.get(0))){clearInterval(p)}},500);if(logmeonce.qr("name")!=g&&logmeonce.qr("secret")!=i){logmeonce.qr("name",g);logmeonce.qr("secret",i);var h=a("<div>").append(a("<i class='fa fa-spin fa-spinner'>"),a("<span class='info'>").text(translate._("Saving")+"...")).appendTo(l);logmeonce.saveSiteTotp(document,{site:f.site,code:i}).then(function(){a("#search-input").trigger("keyup",{debounce:0,forced:true});h.empty().append(a("<i class='fa fa-check color-success'>"),a("<span class='info'>").text(translate._("Totp saved")))},function(q){h.remove();o.dialog("option","buttons",[e.cancel,e.save])})}}function c(){var h=a(this),g="otpauth://totp/";chrome.tabs.captureVisibleTab({format:"jpeg"},function(i){QrScanner.WORKER_PATH="../components/qr-scanner-worker.min.js";QrScanner.scanImage(i).then(function(l){if(l.indexOf(g)===0&&l.indexOf("?")>g.length){var j=l.substr(g.length,l.indexOf("?")-g.length);var k=a.parseParams(l.substr(l.indexOf("?")+1));if(k.secret!=null){b.call(h,decodeURIComponent(j),k.secret);return}}d.call(h)},function(j){d.call(h)})})}return a("<div class='qrcode'>").append(a("<div class='loading-fa'>").append(a("<i class='fa fa-spinner fa-spin'>"),a("<span>").text(translate._("Scanning current page")+"..."))).dialog({resizable:false,modal:true,width:a(window).width()*0.8,height:"210",title:f.site.name,open:function(){if(logmeonce.qr("name")!=null&&logmeonce.qr("secret")!=null){b.call(this,logmeonce.qr("name"),logmeonce.qr("secret"))}else{c.call(this)}},close:function(){logmeonce.qr("clear")}}).on("click",".password-clipboard",function(){var g=a(this);var h=a(this).siblings(".input-totp").data("val");a.copyToClipboard({text:h}).then(function(){g.clipboardtip("copied")})}).on("click",".password-toggle",function(){a(this).siblings(".input-totp").passwordToggle({source:this})})}})(jQuery);