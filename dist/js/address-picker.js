var _$_b4b0=["use strict","%","","\u7701\u4efd","\u57ce\u5e02","\u533a\u53bf","\u4e61\u9547","\u793e\u533a","996"," / ","\u6682\u65e0\u6570\u636e","blue","<div id=\"adp-wraper-","\" class=\"adp-wraper\" style=\"z-index: ","\"><p>","<div style=\"display: block\"><ul></ul></div>","<span class=\"adp-head-active\">","</span><span>","</span>","<span>","<div><ul><span class=\"adp-empty-text\">","</span></ul></div>","</p>","</div><div class=\"adp-wraper-backshadow\" style=\"z-index: ","\"></div>","body","string","data_level_","green","#","ul","div","#adp-wraper-","<span class=\"adp-empty-text\">","div.adp-wraper","<li data-code=\"","\" title=\"","\">","</li>","span","p","span.adp-head-active","left","-1px","li","click","code","adp-active","div.adp-wraper-backshadow"," div ul","adp-head-active"," p span","top",".adp-wraper-backshadow","head script","/js/address-picker.js","head","script","link","/css/address-picker-",".css","stylesheet","text/css","/data/pc-code.json","/data/pcas-code.json","/data/pca-code.json","object"];;;(function(){_$_b4b0[0];Number.prototype.toPercent= function(){return (Math.round(this* 10000)/ 100).toFixed(2)+ _$_b4b0[1]};var addressPicker=function(user_config){if(!(this instanceof  addressPicker)){return  new addressPicker(user_config)};var _this=this;var data_map={};var address_ret=[];var current_object={};var address_origin_data;var address_ret_desc=[];var current_id= new Date().getTime();var default_config={id:_$_b4b0[2],level:3,levelDesc:[_$_b4b0[3],_$_b4b0[4],_$_b4b0[5],_$_b4b0[6],_$_b4b0[7]],index:_$_b4b0[8],separator:_$_b4b0[9],isInitClick:true,isWithMouse:false,offsetX:0,offsetY:0,emptyText:_$_b4b0[10],theme:_$_b4b0[11],data:_$_b4b0[2]};var config=default_config;_this._init= function(){if(!_this._validateConfig()){return};_this._loadResource();var $init_title_html=_$_b4b0[12]+ current_id+ _$_b4b0[13]+ config.index+ _$_b4b0[14];var $init_content_html=_$_b4b0[15];$init_title_html+= _$_b4b0[16]+ config.levelDesc[0]+ _$_b4b0[17]+ config.levelDesc[0]+ _$_b4b0[18];for(var i=1;i< config.level;i++){$init_title_html+= _$_b4b0[19]+ config.levelDesc[i]+ _$_b4b0[18];$init_content_html+= _$_b4b0[20]+ config.emptyText+ _$_b4b0[21]};$init_title_html+= _$_b4b0[22];$(_$_b4b0[25]).append($init_title_html+ $init_content_html+ _$_b4b0[23]+ (config.index- 1)+ _$_b4b0[24]);if( typeof config.data== _$_b4b0[26]&&  !_this._isJSON(config.data)){$.ajax({url:config.data,async:false,success:function(data){address_origin_data= data;_this._getEachLevelData(0,config.level,address_origin_data);_this._initFirstLevelData()}})}else {address_origin_data= config.data;if( typeof config.data== _$_b4b0[26]){address_origin_data= JSON.parse(address_origin_data)};_this._getEachLevelData(0,config.level,address_origin_data);_this._initFirstLevelData()};_this._bindEvent()};_this._getEachLevelData= function(index,total_level,data){var temp_list=[];var temp_children_list=[];if(index>= total_level){return};for(var i=0;i< data.length;i++){temp_list.push(data[i]);if(index== total_level- 1){continue};if(data[i].children== undefined){continue};for(var j=0;j< data[i].children.length;j++){temp_children_list.push(data[i].children[j])}};if(temp_children_list.length== 0){return};data_map[_$_b4b0[27]+ index]= temp_list;_this._getEachLevelData(index+ 1,total_level,temp_children_list)};_this._validateConfig= function(){var is_valid=true;if(user_config instanceof  Object){config= $.extend({},default_config,user_config)}else {if( typeof (user_config)== _$_b4b0[26]){config.id= user_config}else {is_valid= false}};if(config.level> config.levelDesc.length){config.levelDesc= default_config.levelDesc};if(config.theme!= _$_b4b0[11]&& config.theme!= _$_b4b0[28]){config.theme= _$_b4b0[11]};if(config.id== _$_b4b0[2]|| config.id== undefined){is_valid= false}else {if($(_$_b4b0[29]+ config.id).length== 0){is_valid= false}};return is_valid};_this._initFirstLevelData= function(){for(var i=0;i< config.level;i++){$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(i).children(_$_b4b0[30]).empty();$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(i).children(_$_b4b0[30]).append(_$_b4b0[33]+ config.emptyText+ _$_b4b0[18])};if(address_origin_data.length> 0){$(_$_b4b0[34]).children(_$_b4b0[31]).eq(0).children().empty()};for(var i=0;i< address_origin_data.length;i++){var li=_$_b4b0[35]+ address_origin_data[i].code+ _$_b4b0[36]+ address_origin_data[i].name+ _$_b4b0[37]+ address_origin_data[i].name+ _$_b4b0[38];$(_$_b4b0[34]).children(_$_b4b0[31]).eq(0).children().append(li)};var head_text=$(_$_b4b0[32]+ current_id).children(_$_b4b0[40]).children(_$_b4b0[39]).eq(1).text();var head_active=$(_$_b4b0[32]+ current_id).children(_$_b4b0[40]).children(_$_b4b0[41]);head_active.css(_$_b4b0[42],_$_b4b0[43]);head_active.text(head_text);$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(0).show().siblings(_$_b4b0[31]).hide()};_this._bindEvent= function(){$(_$_b4b0[32]+ current_id+ _$_b4b0[49]).delegate(_$_b4b0[44],_$_b4b0[45],function(){var div_index=$(this).parent().parent().index();current_object.code= $(this).data(_$_b4b0[46]);current_object.text= $(this).text();current_object.level= div_index;var address_origin_data_copy=address_origin_data;address_ret[div_index- 1]= $(this).data(_$_b4b0[46]);address_ret_desc[div_index- 1]= $(this).text();var max_level=$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).length;if(div_index< max_level){for(var temp=div_index;temp< config.level;temp++){$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(temp).children(_$_b4b0[30]).empty();$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(temp).children(_$_b4b0[30]).append(_$_b4b0[33]+ config.emptyText+ _$_b4b0[18])};$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(div_index).children().empty();if(div_index> 1){address_origin_data_copy= data_map[_$_b4b0[27]+ (div_index- 1)]};if(address_origin_data_copy!= undefined){for(var i=0;i< address_origin_data_copy.length;i++){var o=address_origin_data_copy[i];if(o.name== $(this).text()&& o.code== $(this).data(_$_b4b0[46])){if(o.children!= null&& o.children.length> 0){for(var j=0;j< o.children.length;j++){var k=o.children[j];var li1=_$_b4b0[35]+ k.code+ _$_b4b0[36]+ k.name+ _$_b4b0[37]+ k.name+ _$_b4b0[38];$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(div_index).children().append(li1)}}else {$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(div_index).children().append(_$_b4b0[33]+ config.emptyText+ _$_b4b0[18])};break}}}else {$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(div_index).children().append(_$_b4b0[33]+ config.emptyText+ _$_b4b0[18])};$(this).addClass(_$_b4b0[47]).siblings().removeClass(_$_b4b0[47]);var head_text=$(_$_b4b0[32]+ current_id).children(_$_b4b0[40]).children(_$_b4b0[39]).eq(div_index+ 1).text();var head_active=$(_$_b4b0[32]+ current_id).children(_$_b4b0[40]).children(_$_b4b0[41]);head_active.css(_$_b4b0[42],(0.2* (div_index)).toPercent());$(this).parent().parent().next().show().siblings(_$_b4b0[31]).hide();setTimeout(function(){head_active.text(head_text)},200)}else {$(this).addClass(_$_b4b0[47]).siblings().removeClass(_$_b4b0[47]);$(_$_b4b0[32]+ current_id).fadeOut();$(_$_b4b0[48]).hide()}});$(_$_b4b0[32]+ current_id+ _$_b4b0[51]).click(function(){if($(this).hasClass(_$_b4b0[50])){return};var i=$(this).index()- 1;var text=$(this).text();var head_active=$(_$_b4b0[32]+ current_id).children(_$_b4b0[40]).children(_$_b4b0[41]);head_active.css(_$_b4b0[42],i== 0?-1:(0.2* i).toPercent());setTimeout(function(){head_active.text(text)},200);$(_$_b4b0[32]+ current_id).children(_$_b4b0[31]).eq(i).show().siblings(_$_b4b0[31]).hide()});$(_$_b4b0[48]).on(_$_b4b0[45],function(){$(_$_b4b0[48]).hide();$(_$_b4b0[32]+ current_id).fadeOut()});if(config.isInitClick){$(_$_b4b0[29]+ config.id).on(_$_b4b0[45],function(){var offset=_this._getOffset(event);$(_$_b4b0[32]+ current_id).css(_$_b4b0[42],offset.x);$(_$_b4b0[32]+ current_id).css(_$_b4b0[52],offset.y);$(_$_b4b0[32]+ current_id).fadeIn();$(_$_b4b0[53]).show()})}};_this._loadResource= function(){var contex_path=_$_b4b0[2];var script_list=$(_$_b4b0[54]);if(script_list.length> 0){for(var i=0;i< script_list.length;i++){if(script_list[i].src.indexOf(_$_b4b0[55])!=  -1){contex_path= script_list[i].src.substring(0,script_list[i].src.indexOf(_$_b4b0[55]));break}}};if(contex_path!= _$_b4b0[2]){var head=document.getElementsByTagName(_$_b4b0[56])[0];var script=document.createElement(_$_b4b0[57]);var link=document.createElement(_$_b4b0[58]);link.href= contex_path+ _$_b4b0[59]+ config.theme+ _$_b4b0[60];link.rel= _$_b4b0[61];link.type= _$_b4b0[62];head.appendChild(link);if(config.data== _$_b4b0[2]){if(config.level== 1|| config.level== 2){config.data= contex_path+ _$_b4b0[63]}else {if(config.level== 4|| config.level== 5){config.data= contex_path+ _$_b4b0[64]}else {config.data= contex_path+ _$_b4b0[65]}}}}};_this._getOffset= function(event){var x=$(_$_b4b0[29]+ config.id).offset().left- 10;var y=$(_$_b4b0[29]+ config.id).offset().top+ $(_$_b4b0[29]+ config.id).height()+ 5;if(config.isWithMouse){var e=event|| window.event;var scrollX=document.documentElement.scrollLeft|| document.body.scrollLeft;var scrollY=document.documentElement.scrollTop|| document.body.scrollTop;x= e.pageX|| e.clientX+ scrollX;y= e.pageY|| e.clientY+ scrollY};x+= config.offsetX;y+= config.offsetY;return {"x":x,"y":y}};_this._isJSON= function(str){if( typeof str== _$_b4b0[26]){try{var obj=JSON.parse(str);if( typeof obj== _$_b4b0[66]&& obj){return true}else {return false}}catch(e){return false}}};_this._refreshData= function(new_data){if( typeof new_data== _$_b4b0[26]&& _this._isJSON(new_data)){new_data= JSON.parse(new_data)};address_origin_data= new_data;if(address_origin_data.length> 0){_this._getEachLevelData(0,config.level,address_origin_data)};_this._initFirstLevelData()};_this._getTotalValueAsArray= function(){return {"code":address_ret,"text":address_ret_desc}};_this._getTotalValueAsText= function(){var text_desc=_$_b4b0[2];for(var i=0;i< current_object.level;i++){text_desc+= (i< current_object.level- 1?address_ret_desc[i]+ config.separator:address_ret_desc[i])};return text_desc};_this._getCurrentObject= function(){return current_object};_this._show= function(){var offset=_this._getOffset(event);$(_$_b4b0[32]+ current_id).css(_$_b4b0[42],offset.x);$(_$_b4b0[32]+ current_id).css(_$_b4b0[52],offset.y);$(_$_b4b0[32]+ current_id).fadeIn();$(_$_b4b0[53]).show()};_this._hide= function(){$(_$_b4b0[32]+ current_id).fadeOut();$(_$_b4b0[48]).hide()};_this._on= function(type,func){$(_$_b4b0[32]+ current_id+ _$_b4b0[49]).delegate(_$_b4b0[44],type,func)};_this._init();return {on:_this._on,show:_this._show,hide:_this._hide,refreshData:_this._refreshData,getCurrentObject:_this._getCurrentObject,getTotalValueAsArray:_this._getTotalValueAsArray,getTotalValueAsText:_this._getTotalValueAsText}};window.addressPicker= addressPicker}())
