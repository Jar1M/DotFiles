(function(a){a.translate={company:"LogMeOnce",_:function(d,c){var g=this.translate(d);if(g!=null&&g.length>0){g=g.replace(new RegExp("%COMPANY%","g"),this.company);if(typeof c==="number"&&g.indexOf(",")>0){g=g.split(",");var f=this.plurals(c);var e=g.length;d=g[f<e?f:e-1]}else{d=g}}return d},translate:function(c){return c},sprintf:function(){if(!arguments||arguments.length<1||!RegExp){return}var k=arguments[0];var i=/([^%]*)%('.|0| )?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;var s=b=[],c=0,g=0;while(s=i.exec(k)){var j=s[1],p=s[2],t=s[3],o=s[4];var l=s[5],h=s[6],e=s[7];g++;if(h=="%"){d="%"}else{c++;if(c>=arguments.length){alert("Error! Not enough function arguments ("+(arguments.length-1)+", excluding the string)\nfor the number of substitution parameters in string ("+c+" so far).")}var f=arguments[c];var q="";if(p&&p.substr(0,1)=="'"){q=j.substr(1,1)}else{if(p){q=p}}var m=true;if(t&&t==="-"){m=false}var r=-1;if(o){r=parseInt(o)}var n=-1;if(l&&h=="f"){n=parseInt(l.substring(1))}var d=f;if(h=="b"){d=parseInt(f).toString(2)}else{if(h=="c"){d=String.fromCharCode(parseInt(f))}else{if(h=="d"){d=parseInt(f)?parseInt(f):0}else{if(h=="u"){d=Math.abs(f)}else{if(h=="f"){d=(n>-1)?Math.round(parseFloat(f)*Math.pow(10,n))/Math.pow(10,n):parseFloat(f)}else{if(h=="o"){d=parseInt(f).toString(8)}else{if(h=="s"){d=f}else{if(h=="x"){d=(""+parseInt(f).toString(16)).toLowerCase()}else{if(h=="X"){d=(""+parseInt(f).toString(16)).toUpperCase()}}}}}}}}}}k=j+d+e}return k},plurals:function(c){try{switch(this._("lang")){case"bo":case"dz":case"id":case"ja":case"jv":case"ka":case"km":case"kn":case"ko":case"ms":case"th":case"tr":case"vi":case"zh":return 0;case"af":case"az":case"bn":case"bg":case"ca":case"da":case"de":case"el":case"en":case"eo":case"es":case"et":case"eu":case"fa":case"fi":case"fo":case"fur":case"fy":case"gl":case"gu":case"ha":case"he":case"hu":case"is":case"it":case"ku":case"lb":case"ml":case"mn":case"mr":case"nah":case"nb":case"ne":case"nl":case"nn":case"no":case"om":case"or":case"pa":case"pap":case"ps":case"pt":case"so":case"sq":case"sv":case"sw":case"ta":case"te":case"tk":case"ur":case"zu":return(c==1)?0:1;case"am":case"bh":case"fil":case"fr":case"gun":case"hi":case"ln":case"mg":case"nso":case"xbr":case"ti":case"wa":return((c==0)||(c==1))?0:1;case"be":case"bs":case"hr":case"ru":case"sr":case"uk":return((c%10==1)&&(c%100!=11))?0:(((c%10>=2)&&(c%10<=4)&&((c%100<10)||(c%100>=20)))?1:2);case"cs":case"sk":return(c==1)?0:(((c>=2)&&(c<=4))?1:2);case"ga":return(c==1)?0:((c==2)?1:2);case"lt":return((c%10==1)&&(c%100!=11))?0:(((c%10>=2)&&((c%100<10)||(c%100>=20)))?1:2);case"sl":return(c%100==1)?0:((c%100==2)?1:(((c%100==3)||(c%100==4))?2:3));case"mk":return(c%10==1)?0:1;case"mt":return(c==1)?0:(((c==0)||((c%100>1)&&(c%100<11)))?1:(((c%100>10)&&(c%100<20))?2:3));case"lv":return(c==0)?0:(((c%10==1)&&(c%100!=11))?1:2);case"pl":return(c==1)?0:(((c%10>=2)&&(c%10<=4)&&((c%100<12)||(c%100>14)))?1:2);case"cy":return(c==1)?0:((c==2)?1:(((c==8)||(c==11))?2:3));case"ro":return(c==1)?0:(((c==0)||((c%100>0)&&(c%100<20)))?1:2);case"ar":return(c==0)?0:((c==1)?1:((c==2)?2:(((c>=3)&&(c<=10))?3:(((c>=11)&&(c<=99))?4:5))));default:throw"Not Supported"}}catch(d){return(c==1)?0:1}},getUnit:function(e,d){if(this._(e)!=null&&this._(e).indexOf(",")>0){var e=this._(e).split(",");var c=this.plurals(d);return c<e.length?e[c]:e[0]}else{return e}},duration:function(f,g){var d={year:0,month:0,week:0,day:0,hour:0,minute:0,second:0};d.year=Math.floor(f/(60*60*24*365));f%=60*60*24*365;d.month=Math.floor(f/(60*60*24*(365/12)));if(d.month>0){d.week=0;f%=(60*60*24*(365/12))}else{d.week=Math.floor(f/(60*60*24*7));f%=60*60*24*7}d.day=Math.floor(f/(60*60*24));f%=60*60*24;d.hour=Math.floor(f/(60*60));f%=60*60;d.minute=Math.floor(f/60);d.second=Math.floor(f%60);var c=[];for(var e in d){if(!isNaN(g)&&c.length>=g){break}if(d[e]>=1){c.push(d[e]+" "+this.getUnit(e,d[e]))}}if(c.length<=0){return"0 "+this.getUnit("second",0)}return c.join(" ")}}})(typeof logmeonce==="object"?logmeonce:window);