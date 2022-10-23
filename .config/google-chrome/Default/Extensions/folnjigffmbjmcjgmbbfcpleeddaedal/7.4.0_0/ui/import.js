$(document).on("ui",function(a,b){if(typeof b.items==="undefined"){$(document).instructions(b)}else{$(document).importing(b)}});(function(a){a.fn.importItems=function(d){var f=a.extend({checked:function(){}},d);var c=f.items;var g=[],b={};var h=a.grep(c,function(j){if(g.indexOf(j.adapter)<0){g.push(j.adapter);b[j.adapter]=0}b[j.adapter]++;return typeof j.type==="undefined"});var e=this.off().empty().addClass(h.length>0?"sites":"nosites").append(g.length>1?a("<div class='import-sources'>").append(a.map(g,function(j){function k(l){switch(l){case"chrome":return"Chrome";case"ie":return"Edge / Internet Explorer";case"mozilla":return"Firefox";case"safari":return"Safari";default:return l}}return a("<label>").append(a("<input type='checkbox' class='adapter' checked>").val(j),a("<span>").text(k(j)+" ("+b[j]+")"))})):"",a("<table class='import-table' cellspacing='0' cellpadding='0'>").append(a("<thead>").append(a("<tr>").append(a("<th>").append(a("<input type='checkbox' name='all'>").prop("checked",true)),a("<th class='name'>").text(translate._(h.length==c.length?"Site":"Name")),a("<th class='password'>").text(translate._("Username")),a("<th class='password password-toggle'>").text(translate._("Password")).hide(),a("<th class='password'>").text(translate._("Password Strength")),a("<th class='password'>").append(a("<a id='toggle' class='orange'>").attr("href","#show").text(translate._("Show Passwords")))))),a("<div class='content'>").append(a("<table class='import-table' cellspacing='0' cellpadding='0'>").on("render",function(j){a(this).append(a.map(c.slice(j.start,j.end),function(r,n){var s=a("<tr>").append(a("<td>").append(a("<input type='checkbox' class='item' checked>").attr("adapter",r.adapter).data("item",r).val(n+j.start)));if(r.type==="note"){return s.append(a("<td>").attr("colspan",4).append(a("<i class='far fa-sticky-note fa-fw'>"),a("<span>").text(r.title||r.body||"")))}if(r.type==="credit-card"){return s.append(a("<td>").attr("colspan",4).append(a("<i class='far fa-credit-card fa-fw'>"),a("<span>").text(r.title||r.body||"")))}if(r.type==="group"){return s.append(a("<td>").attr("colspan",4).append(a("<i class='far fa-folder fa-fw'>"),a("<span>").text(r.name||"")))}if(r.image==null&&r.url!=null){var l=window.parseUri||logmeonce.tools.parseUri;var k=l(r.url);r.image=f.favicons+"?domain="+k.host}var m=a.grep(r.inputs,function(t){return t.type!=="password"&&t.type!=="checkbox"}).shift();var q=a.grep(r.inputs,function(t){return t.type==="password"}).shift();var o=a("<div>").attr("id","strength-"+n);var p=a("<div>").passwordStrength({password:q!=null?q.value||"":"",width:"100%",height:"12px",strengthElement:o});r.score=p.passwordStrength("score");return s.append(a("<td>").addClass("name").append(a("<img>").addClass("icon-left").attr("src",r.image),a("<span>").attr("title",r.url||"").text(r.name||r.url||"")),a("<td>").append(a("<span>").addClass("label").attr("title",m!=null?m.value||"":"").text(m!=null?m.value||"":"")),a("<td>").addClass("password-toggle").hide().append(a("<span>").addClass("label").attr("title",q!=null?q.value||"":"").text(q!=null?q.value||"":"")),a("<td>").append(p),a("<td>").append(o))}))})),a("<div id='status' class='status'>").append(a("<span>").text(translate._("Loading")+"... "+translate._("Please Wait")+"."),a("<span class='progress-bar' class='animated'>").progressbar({value:0,change:function(){a(this).siblings(".progress-label").text(a(this).progressbar("value")+"%")}}),a("<span class='progress-label'>").text("0%"))).on("render",".status",function(o){var p=0;var m=a(":checkbox.item",e);var l=m.filter(":checked");var n=l.filter(function(){return typeof a(this).data("item")==="object"&&a(this).data("item").score!=null}).each(function(){p+=a(this).data("item").score});var k=l.filter(function(){return typeof a(this).data("item").type==="string"});var j=[];n.length>0&&j.push(translate.sprintf(translate._("%s sites"),n.length));k.length>0&&j.push(translate.sprintf(translate._("%s other items"),k.length));f.checked({checked:l.length,sites:n.length,others:k.length});a(".text",this).text((j.length>0?translate.sprintf(translate._("Importing %s"),j.join(" "+translate._("And").toLowerCase()+" ")):translate._("Nothing to import"))+". ");a(".password-strength",this).passwordStrength({score:n.length>0?parseInt(p/n.length):0});a(":checkbox.adapter",e).each(function(){var r=a(":checkbox.item[adapter="+this.value+"]",e);var q=r.filter(":checked");a(this).prop("checked",q.length>0&&q.length==r.length).prop("disabled",r.length<=0)});a(":checkbox[name=all]",e).prop("checked",l.length>0&&l.length==m.length).prop("disabled",m.length<=0)}).on("click",":checkbox.item",function(){a(".status",e).trigger("render")}).on("click",":checkbox[name=all]",function(){a(":checkbox.item",e).prop("checked",a(this).is(":checked"));a(".status",e).trigger("render")}).on("click",":checkbox.adapter",function(){a(":checkbox[adapter="+this.value+"]",e).prop("checked",a(this).is(":checked"));a(".status",e).trigger("render")}).on("click","#toggle",function(j){j.preventDefault();a(".password-toggle").toggle(this.hash=="#show");a("td[colspan]").attr("colspan",a("th:visible").length-1);a(this).text(translate._(this.hash=="#show"?"Hide Passwords":"Show Passwords")).attr("href",this.hash=="#show"?"#hide":"#show")});i();function i(){var k=a.when(),j;if(c.length>0){for(j=0;j<c.length;j+=100){k=k.then(function(l){return function(){var m=a.Deferred();j<=0?m.resolve():setTimeout(m.resolve,0);return m.then(function(){a(".progress-bar",e).progressbar({value:Math.round(((l+1)/c.length)*100)});a(".content table",e).trigger({type:"render",start:l,end:l+100})}).promise()}}(j))}}k.then(function(){a(".status",e).empty().append(a("<span class='text'>"),a("<span class='password'>").text(translate.sprintf(translate._("Overall password strength is %s"),"")),a("<span class='password-strength'>")).trigger("render")})}return this};a.fn.importing=function(g){var c=g.items;var b=g.name;var d=-1;var f={cancel:{text:translate._("Cancel"),click:function(){a(this).dialog("close")}},ok:{text:"OK",click:function(){a(this).dialog("close")}},"import":{text:translate._("Import"),click:function(){if(a(this).closest(".ui-dialog").find(".ui-dialog-buttonpane button:last-child").hasClass("ui-state-disabled")){return}var k=a(":checkbox.item:checked",this).sort(function(m,l){var o=a(m).data("item");var n=a(l).data("item");if(o.type!==n.type){return o.type!=="group"?1:-1}return 0});a(this).children().hide();var h=a("<p>").append(progressbar=a("<div>").progressbar({value:0}),progressvalue=a("<span>"),progressstatus=a("<p>")).appendTo(this);var j=a(this).css({height:"auto"}).dialog("option","buttons",[f.cancel]);var i=a.Deferred().resolve({success:0,failed:0,skipped:0,ignored:0});k.each(function(m,l){i=i.then(function(q){var p=Math.round((m/k.length)*100);progressstatus.text(translate.sprintf(translate._("Importing %s of %s items"),m+1,k.length)+". ");progressbar.progressbar({value:p}).show();progressvalue.text(p+"%");var o={form:a(l).data("item"),progress:p,adapter:b};var n=a.Deferred();a.logmeonce.fireEvent("importEvent",o,{deferred:{reject:"notify"}}).then(function(r){if(r.status=="error"){return n.reject()}if(r.status=="skipped"){q.skipped++}else{if(r.status=="ignored"){q.ignored++}else{q.success++}}n.resolve(q)},function(r){n.reject(r)},function(r){if(r!=null&&r.exception!=null&&r.exception.ui){return n.reject()}q.failed++;n.resolve(q)});return n.promise()})});i.then(function(l){progressbar.hide();progressstatus.hide();progressvalue.empty().append(a("<p>").text(translate._("Import is complete")),a("<p>").text(translate.sprintf(translate._("%s items imported"),l.success)),l.failed>0?a("<p>").text(translate.sprintf(translate._("%s items import failed"),l.failed)):"",l.skipped>0?a("<p>").text(translate.sprintf(translate._("%s items already exists"),l.skipped)):"",l.ignored>0?a("<p>").text(translate.sprintf(translate._("%s sites ignored"),l.ignored)):"");a(j).dialog("option","buttons",[f.ok])},function(l){a(j).dialog("close")})}}};var e=a("<div class='import-ui'>").dialog({title:translate._("Import Sites"),width:"80%",resizable:false,modal:true,dialogClass:"ui-logmeonce",buttons:[f.cancel,f["import"]],open:function(){var h=a(this).closest(".ui-dialog").find(".ui-dialog-buttonpane button");h.last().toggleClass("ui-state-disabled",true);if(c.length<=0){a(this).empty().append(a("<p>").text(translate._("Nothing to import")));h.last().remove();return}a(this).importItems({checked:function(i){h.last().toggleClass("ui-state-disabled",i.checked<=0)},favicons:logmeonce.server+"favicons",items:c}).dialog("option","position",{my:"center",at:"center",of:window})},close:function(){if(d>=0&&d<100){a.logmeonce.fireEvent("importEvent",{cancelled:true,progress:d});d=-1}}})};a.fn.instructions=function(d){var b=a.grep(a.fn.instructions.adapters,function(e){return d.name==e.name}).shift();var c=b!=null?b.label:d.name.charAt(0).toUpperCase();return a("<div class='import-instructions'>").append(a("<p>").html(function(){return translate.sprintf(translate._("Importing from %s"),"").trim()+": <span>"+c+"</span>"}),a("<div class='content'>").append(a("<span>").html(function(){return translate._(d.name.charAt(0).toUpperCase()+d.name.substr(1)+" Import Instructions").replace(/\n/g,"<br>")})),d.name==="logmeonce"?a("<div class='verification'>").append(a("<p>").text(translate._("Secure passphrase")),a("<div class='info'>").text(translate._("Secure passphrase for import")),a("<div class='body'>").css({display:"block"}).append(a("<span>").text(translate._("Passphrase")+":"),a("<input type='password' name='passphrase'>"))):null).dialog({title:translate.company,width:"600px",height:"auto",minHeight:"auto",resizable:false,modal:true,buttons:[{text:translate._("Cancel"),click:function(){a(this).dialog("close")}},{text:translate._("Click to open"),click:function(){if(a("input[name=passphrase]",this).length>0&&a("input[name=passphrase]",this).val().length<=0){alert(translate.sprintf(translate._("%s is empty"),translate._("Passphrase"))+".");return}var e=a(this);var f=a("input[name=passphrase]",this).length>0?a("input[name=passphrase]",this).val():null;a(this).dialog("option","buttons",null).empty().addClass("progress").append(a("<span>").text(translate._("Please Wait")+"..."),a("<div class='animated'>").progressbar({value:100}));a.logmeonce.fireEvent("importing",{name:d.name,passphrase:f,errorDelay:120*1000,}).then(function(g){e.dialog("close");a(document).importing(a.extend(d,{items:g}))},function(g){g!=null&&g.message!=null&&alert(g.message);e.dialog("close")})}}],open:function(){var e=this;a("input[type=password]",this).keypress(function(f){if(f.which==13){a(e).parent().find("button:last").trigger("click")}})}})};a.fn.instructions.adapters=[{name:"logmeonce",label:translate.company},{name:"onepassword",label:"1Password"},{name:"clipperz",label:"Clipperz"},{name:"dashlane",label:"Dashlane"},{name:"darnPassword",label:"Darn! Passwords!"},{name:"ewallet",label:"eWallet"},{name:"fireForm",label:"Fireform"},{name:"keepass",label:"KeePass"},{name:"keeper",label:"Keeper Security"},{name:"lastpass",label:"LastPass"},{name:"norton",label:"Norton Identity Safe"},{name:"passpack",label:"Passpack"},{name:"passwordAgent",label:"Password Agent"},{name:"passwordBoss",label:"Password Boss"},{name:"passwordCoral",label:"Password Corral"},{name:"passwordDragon",label:"Password Dragon"},{name:"passsafe",label:"Password Safe"},{name:"passwordMax",label:"Passwords Max"},{name:"pinPasswordManager",label:"PINs Password Manager"},{name:"roboform",label:"Roboform"},{name:"stickyPassword",label:"Sticky Password"},{name:"truekey",label:"True Key"},{name:"zoho",label:"Zoho Vault"}]})(jQuery);