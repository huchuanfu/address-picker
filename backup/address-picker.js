/**
 * Created by hucf on 2019/5/17.
 */
;
(function () {
    'use strict';
    Number.prototype.toPercent = function() {
        return (Math.round(this * 10000) / 100).toFixed(2) + '%';
    };
    var addressPicker = function (user_config) {
        if (!(this instanceof addressPicker)) return new addressPicker(user_config);
        var _this = this;
        var data_map = {};
        var address_ret = [];
        var current_object= {};
        var address_origin_data;
        var address_ret_desc = [];
        var current_id = new Date().getTime();
        var default_config = {
            id:"",
            level:3,
            levelDesc:["省份","城市","区县","乡镇","社区"],
            index:"996",
            separator:" / ",
            isInitClick:true,
            isWithMouse:false,
            offsetX:0,
            offsetY:0,
            emptyText:"暂无数据",
            color:'#56b4f8',//#56debc
            fontSize:'14px',
            isAsync:false,
            asyncUrl:"",
            isShowBtn:true,
            btnConfig:[],
            data:""
        };
        var config = default_config;
        var async_first_data;
        var default_liheight = 20;
        var is_first_click = true;

        _this._init = function () {
            //校验基本参数
            if (!ValidateConfig()) {
                return;
            }
            fnLoadResource();
            //生成基础html
            var $init_title_html = '<div id="adp-wraper-'+current_id+'" class="adp-wraper" style="z-index: '+config.index+'"><p>';
            var $init_content_html = '<div class="ul-div" style="display: block"><ul></ul></div>';
            $init_title_html += '<span class="adp-head-active">'+config.levelDesc[0]+'</span><span>'+config.levelDesc[0]+'</span>';
            for (var i=1; i<config.level; i++) {
                $init_title_html += '<span>'+config.levelDesc[i]+'</span>';
                $init_content_html += '<div class="ul-div"><ul><span class="adp-empty-text">'+config.emptyText+'</span></ul></div>';
            }
            $init_title_html += '</p>';
            var btn_area = fnGenerateBtnHtml();
            $('body').append($init_title_html+$init_content_html+btn_area+'</div><div class="adp-wraper-backshadow" style="z-index: '+(config.index-1)+'"></div>');

            if (config.isAsync) {
                //异步加载每一层
                address_origin_data = fnGetAsyncData(null);
                _this._initFirstLevelData();
            } else {//一步加载所有层
                //如果传了个json文件路径
                if (typeof config.data == "string" && !fnIsJSON(config.data)) {
                    $.ajax({
                        url: config.data,
                        async: false,
                        success: function (data) {
                            address_origin_data = data;
                            _this._getEachLevelData(0, config.level, address_origin_data);
                            _this._initFirstLevelData();
                        }
                    });
                } else {//如果直接传data数据过来
                    address_origin_data = config.data;
                    if (typeof config.data == "string") {
                        address_origin_data = JSON.parse(address_origin_data);
                    }
                    _this._getEachLevelData(0, config.level, address_origin_data);
                    _this._initFirstLevelData();
                }
            }
            //绑定事件
            _this._bindEvent();
        };

        _this._getEachLevelData = function(index,total_level,data){
            //拆分每一层数据，减少点击事件开销
            var temp_list = [];
            var temp_children_list = [];
            if (index >= total_level) return;
            for (var i=0; i<data.length; i++) {
                temp_list.push(data[i]);
                if (index == total_level-1) {
                    continue;
                }
                if (data[i].children == undefined) {
                    continue;
                }
                for (var j=0; j<data[i].children.length; j++) {
                    temp_children_list.push(data[i].children[j]);
                }
            }
            if (temp_children_list.length == 0) return;
            data_map['data_level_'+index] = temp_list;
            _this._getEachLevelData(index+1,total_level,temp_children_list)
        };

        _this._initFirstLevelData = function () {
            for (var i=0; i<config.level; i++) {
                $("#adp-wraper-" +current_id).children("div").eq(i).children("ul").empty();
                $("#adp-wraper-" +current_id).children("div").eq(i).children("ul").append('<span class="adp-empty-text">' + config.emptyText + "</span>");
            }
            if (address_origin_data.length>0) {
                $("#adp-wraper-" +current_id).children('div').eq(0).children("ul").empty();
            }
            for (var i = 0; i < address_origin_data.length; i++) {
                var li = '<li data-code="'+address_origin_data[i].code+'" title="'+address_origin_data[i].name+'">' + address_origin_data[i].name + '</li>';
                $("#adp-wraper-" +current_id).children('div').eq(0).children("ul").append(li);
            }
            var head_text = $("#adp-wraper-"+current_id).children("p").children("span").eq(1).text();
            var head_active = $('#adp-wraper-'+current_id).children('p').children('span.adp-head-active');
            head_active.css("left","-1px");
            head_active.text(head_text);
            $("#adp-wraper-"+current_id).children("div.ul-div").eq(0).show().siblings("div.ul-div").hide();
            if (config.isShowBtn) {
                fnAdjustUlHeight(0);
            }
        };

        _this._bindEvent = function () {
            $("#adp-wraper-"+current_id+" div ul").delegate("li" ,"click", function () {
                var div_index = $(this).parent().parent().index();
                current_object.code = $(this).data("code");
                current_object.text = $(this).text();
                current_object.level = div_index;
                address_ret[div_index-1] = $(this).data("code");
                address_ret_desc[div_index-1] = $(this).text();
                address_ret.splice(div_index, address_ret.length-div_index);
                address_ret_desc.splice(div_index, address_ret_desc.length-div_index);
                var max_level = $("#adp-wraper-"+current_id).children("div.ul-div").length;
                if (div_index < max_level) {
                    for (var temp=div_index; temp<config.level; temp++) {
                        $("#adp-wraper-" +current_id).children("div.ul-div").eq(temp).children("ul").empty().append('<span class="adp-empty-text">' + config.emptyText + "</span>");
                        if (config.isShowBtn) {
                            fnAdjustUlHeight(temp);
                        }
                    }
                    $("#adp-wraper-"+current_id).children("div.ul-div").eq(div_index).children("ul").empty();
                    var address_origin_data_copy = config.isAsync?fnGetAsyncData(current_object, div_index):address_origin_data;
                    if (div_index>1 && !config.isAsync) {
                        address_origin_data_copy = data_map["data_level_"+(div_index-1)];
                    }
                    if (address_origin_data_copy != undefined) {
                        for (var i = 0; i < address_origin_data_copy.length; i++) {
                            var o = address_origin_data_copy[i];
                            if (config.isAsync) {
                                var li1 = '<li data-code="'+o.code+'" title="'+o.name+'">' + o.name + '</li>';
                                $("#adp-wraper-"+current_id).children("div").eq(div_index).children("ul").append(li1);
                            } else {
                                if (o.name == $(this).text() && o.code==$(this).data("code")) {
                                    if (o.children!=null && o.children.length>0) {
                                        for (var j = 0; j < o.children.length; j++) {
                                            var k = o.children[j];
                                            var li1 = '<li data-code="'+k.code+'" title="'+k.name+'">' + k.name + '</li>';
                                            $("#adp-wraper-"+current_id).children("div.ul-div").eq(div_index).children("ul").append(li1);
                                        }
                                    }  else {
                                        $("#adp-wraper-"+current_id).children("div.ul-div").eq(div_index).children("ul").append('<span class="adp-empty-text">'+config.emptyText+'</span>');
                                    }
                                    break;
                                }
                            }
                        }
                        if (config.isShowBtn) {
                            fnAdjustUlHeight(div_index);
                        }
                    } else {
                        $("#adp-wraper-"+current_id).children("div.ul-div").eq(div_index).children("ul").append('<span class="adp-empty-text">'+config.emptyText+'</span>');
                    }
                    $(this).addClass("adp-active").siblings().removeClass("adp-active");
                    var head_text = $("#adp-wraper-"+current_id).children("p").children("span").eq(div_index+1).text();
                    var head_active = $('#adp-wraper-'+current_id).children('p').children('span.adp-head-active');
                    head_active.css("left",(0.2*(div_index)).toPercent());
                    $(this).parent().parent().next().show().siblings("div.ul-div").hide();
                    setTimeout(function() {
                        head_active.text(head_text);
                    }, 200);
                } else {
                    $(this).addClass("adp-active").siblings().removeClass("adp-active");
                    $("#adp-wraper-"+current_id).fadeOut();
                    $("div.adp-wraper-backshadow").hide();
                }
            });

            $("#adp-wraper-"+current_id+" p span").click(function() {
                if ($(this).hasClass("adp-head-active")) {
                    return;
                }
                var i = $(this).index()-1;
                var text = $(this).text();
                var head_active = $('#adp-wraper-'+current_id).children('p').children('span.adp-head-active');
                head_active.css("left",i==0?-1:(0.2*i).toPercent());
                setTimeout(function() {
                    head_active.text(text);
                }, 200);
                $("#adp-wraper-"+current_id).children("div").eq(i).show().siblings("div.ul-div").hide();
            });

            $("div.adp-wraper-backshadow").on("click", function () {
                $("div.adp-wraper-backshadow").hide();
                $("#adp-wraper-"+current_id).fadeOut();
            });

            if (config.isInitClick) {
                $("#"+config.id).on("click", function () {
                    var offset = fnGetOffset(event);
                    var first_div = $("#adp-wraper-"+current_id+" div.ul-div").eq(0);
                    $("#adp-wraper-"+current_id).css("left", offset.x);
                    $("#adp-wraper-"+current_id).css("top", offset.y);
                    $("#adp-wraper-"+current_id).fadeIn();
                    if ((current_object.level==undefined || is_first_click) && config.isShowBtn) {
                        if (first_div.children("ul").children("li").height() != 0) {
                            default_liheight = first_div.children("ul").children("li").height();
                        }
                        fnAdjustUlHeight(0);
                        is_first_click = false;
                    }
                    $(".adp-wraper-backshadow").show();
                });
            }

            if (config.isShowBtn) {
                var btnParam = config.btnConfig;
                for (var i=0; i<btnParam.length; i++) {
                    if (typeof (btnParam[i].click) == "function") {
                        $('#adp_btn_'+i).on("click", btnParam[i].click);
                    }
                }
            }
        };

        _this._clearSelectedData = function () {
            address_ret = [];
            address_ret_desc = [];
            current_object = {};
            var head_active = $('#adp-wraper-'+current_id).children('p').children('span.adp-head-active');
            head_active.css("left", "-1px");
            setTimeout(function() {
                head_active.text(config.levelDesc[0]);
            }, 200);
            for (var i=1; i<config.level; i++) {
                $('#adp-wraper-'+current_id).children("div.ul-div").eq(i).children("ul").empty().append('<span class="adp-empty-text">' + config.emptyText + "</span>");;
                if (config.isShowBtn) {
                    fnAdjustUlHeight(i);
                }
            }
            var temp;
            if ((temp=$('#adp-wraper-'+current_id).children("div.ul-div").eq(0).children("ul").children("li.adp-active")).length>0){
                temp.removeClass("adp-active");
            }
            $("#adp-wraper-"+current_id).children("div").eq(0).show().siblings("div.ul-div").hide();
        };

        _this._setSelectedData = function (arr) {
            if (typeof (arr)!="object" || arr==null) {
                return;
            }
            if (arr.length>config.level || arr.length==0) {
                return;
            }
            var address_origin_data_copy = config.isAsync?fnGetAsyncData(null):address_origin_data;
            //万事开头难，先单独处理第一层
            if (typeof (address_origin_data_copy)!="object" || address_origin_data_copy==null) {
                return;
            }
            var o,match_o,cur_ul,cur_lis,mcur_ul,temp_lis="",is_exist=false,cur_index;
            cur_ul = $("#adp-wraper-"+current_id).children("div.ul-div").eq(0).children("ul");
            for (var k=0; k<(cur_lis=cur_ul.children("li")).length; k++) {
                o = address_origin_data_copy[k];
                if (o.code == arr[0]) {
                    current_object.code = o.code;
                    current_object.text = o.name;
                    current_object.level = 1;
                    address_ret[0] = o.code;
                    address_ret_desc[0] = o.name;
                    address_ret.splice(1, address_ret.length-1);
                    address_ret_desc.splice(1, address_ret_desc.length-1);
                    match_o = o;
                    cur_index = 0;
                    is_exist = true;
                    cur_ul.children("li").removeClass("adp-active");
                    $(cur_lis[k]).addClass("adp-active");
                    continue;
                }
            }
            //如果第一个都不对，那就维持原样，界面没有任何变发
            if (!is_exist) {
                return;
            }
            //开始处理第二三四五个
            for (var i=1; i<arr.length; i++) {
                if (arr[i]==null || arr[i]=="") {
                    break;
                }
                var children = config.isAsync?fnGetAsyncData(match_o, current_object.level):match_o.children;
                if (typeof (children)!="object" || children==null) {
                    break;
                }
                temp_lis = "";
                is_exist = false;
                match_o = {};
                for (var j=0; j<children.length; j++) {
                    if (children[j].code == arr[i]) {
                        temp_lis += '<li data-code="'+children[j].code+'" title="'+children[j].name+'" class="adp-active">' + children[j].name + '</li>';
                        current_object.code = children[j].code;
                        current_object.text = children[j].name;
                        current_object.level = (i+1);
                        address_ret[i] = children[j].code;
                        address_ret_desc[i] = children[j].name;
                        address_ret.splice(i+1, address_ret.length-i-1);
                        address_ret_desc.splice(i+1, address_ret_desc.length-i-1);
                        match_o = children[j];
                        is_exist = true;
                        cur_index = i;
                        continue;
                    }
                    temp_lis += '<li data-code="'+children[j].code+'" title="'+children[j].name+'">' + children[j].name + '</li>';
                }
                if (!is_exist) {
                    break;
                }
                $("#adp-wraper-"+current_id).children("div.ul-div").eq(i).children("ul").empty().append(temp_lis);
                if (config.isShowBtn) {
                    fnAdjustUlHeight(i);
                }
            }

            if (typeof (cur_index) == "number") {
                $("#adp-wraper-"+current_id).children("div.ul-div").eq(cur_index).show().siblings("div.ul-div").hide();
                var head_text = $("#adp-wraper-"+current_id).children("p").children("span").eq(cur_index+1).text();
                var head_active = $('#adp-wraper-'+current_id).children('p').children('span.adp-head-active');
                head_active.css("left",(0.2*(cur_index)).toPercent());
                setTimeout(function() {
                    head_active.text(head_text);
                }, 200);
                for (var m=cur_index+1; m<config.level; m++) {
                    $("#adp-wraper-"+current_id).children("div.ul-div").eq(m).children("ul").empty().append('<span class="adp-empty-text">' + config.emptyText + "</span>");;
                    if (config.isShowBtn) {
                        fnAdjustUlHeight(m);
                    }
                }
            }
        };

        _this._refreshData = function (new_data) {
            if (typeof new_data == "string" && fnIsJSON(new_data)) {
                new_data = JSON.parse(new_data);
            }
            address_origin_data = new_data;
            if (address_origin_data.length > 0) {
                _this._getEachLevelData(0, config.level, address_origin_data);
            }
            _this._initFirstLevelData();
        };

        _this._getTotalValueAsArray = function () {
            return {"code":address_ret,"text":address_ret_desc};
        };

        _this._getTotalValueAsText = function () {
            var text_desc = "";
            for (var i=0; i<current_object.level; i++) {
                text_desc += (i<current_object.level-1?address_ret_desc[i]+config.separator:address_ret_desc[i]);
            }
            return text_desc;
        };

        _this._getCurrentObject = function () {
            return current_object;
        };

        _this._show = function () {
            var offset = fnGetOffset(event);
            $("#adp-wraper-"+current_id).css("left", offset.x);
            $("#adp-wraper-"+current_id).css("top", offset.y);
            $("#adp-wraper-"+current_id).fadeIn();
            $(".adp-wraper-backshadow").show();
        };

        _this._hide = function () {
            $("#adp-wraper-"+current_id).fadeOut();
            $("div.adp-wraper-backshadow").hide();
        };

        _this._on = function (type,func) {
            $("#adp-wraper-"+current_id+" div ul").delegate("li" ,type, func);
        };

        function fnIsJSON (str) {
            if (typeof str == 'string') {
                try {
                    var obj=JSON.parse(str);
                    if(typeof obj == 'object' && obj ){
                        return true;
                    }else{
                        return false;
                    }
                } catch(e) {
                    return false;
                }
            }
        }

        function fnGetOffset(event) {
            var x = $('#'+config.id).offset().left-10;
            var y = $('#'+config.id).offset().top+$('#'+config.id).height()+5;
            if (config.isWithMouse) {
                var e = event || window.event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                x = e.pageX || e.clientX + scrollX;
                y = e.pageY || e.clientY + scrollY;
            }
            x += config.offsetX;
            y += config.offsetY;
            return {"x":x,"y":y};
        }

        function fnLoadResource() {
            var contex_path = "";
            var script_list = $('head script');
            if (script_list.length>0) {
                for (var i=0; i<script_list.length; i++) {
                    if (script_list[i].src.indexOf("/js/address-picker.js") != -1) {
                        contex_path = script_list[i].src.substring(0, script_list[i].src.indexOf("/js/address-picker.js"));
                        break;
                    }
                }
            }
            if (contex_path != "") {
                var root = document.querySelector(':root');
                root.style.setProperty("--theme-color", config.color);
                root.style.setProperty("--font-size", config.fontSize);
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                var link = document.createElement('link');
                link.href = contex_path+"/css/address-picker.css";
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
                if (config.data == "") {
                    if (config.level == 1 || config.level == 2) {
                        config.data = contex_path + "/data/pc-code.json"
                    } else if (config.level == 4 || config.level == 5) {
                        config.data = contex_path + "/data/pcas-code.json"
                    } else {
                        config.data = contex_path + "/data/pca-code.json"
                    }
                }
            }
        }

        function ValidateConfig() {
            var is_valid = true;
            if (user_config instanceof Object) {
                config = $.extend({}, default_config, user_config);
            } else if (typeof(user_config)=='string'){
                config.id = user_config;
            } else {
                is_valid = false;
            }
            if (config.level > config.levelDesc.length) {
                config.levelDesc = default_config.levelDesc;
            }
            if (config.color=="") {
                config.color = default_config.color;
            }
            if (config.fontSize=="") {
                config.fontSize = default_config.fontSize;
            }
            if (config.id==""||config.id==undefined) {
                is_valid = false;
            } else {
                if ($('#'+config.id).length == 0) {
                    is_valid = false;
                }
            }
            if (config.isAsync && (typeof (config.asyncUrl)!="string" || config.asyncUrl=="")){
                config.isAsync = default_config.isAsync;
            }
            if (typeof (config.btnConfig)!="object" || config.btnConfig==null) {
                config.isShowBtn = false;
                config.btnConfig = default_config.btnConfig;
            }
            return is_valid;
        }

        function fnAdjustUlHeight(ul_index) {
            var $target = $("#adp-wraper-" +current_id).children("div.ul-div").eq(ul_index);
            var $lis = $target.find("ul li");
            var height = Math.ceil($lis.length/5)*(default_liheight+16)+10;
            $target.css("height", height > 65 ? height : 65 + "px")
        }

        function fnGenerateBtnHtml() {
            var btnParam,$html = '';
            if (config.isShowBtn && (btnParam=config.btnConfig).length>0) {
                $html = '<div class="adp-btn-area">';
                for (var i=0; i<btnParam.length; i++) {
                    $html += '<div id="adp_btn_'+i+'" class="adp-btn">'+btnParam[i].text+'</div>';
                }
                $html += '</div>';
            }
            return $html;
        }

        function fnGetAsyncData(o, cur_level) {
            var result = [];
            if (config.isAsync) {
                var code="",name="",level=1;
                if (o==null) {
                    if ((typeof (async_first_data)!="undefined" && async_first_data!=null)) {
                        return async_first_data;
                    }
                } else {
                    code = o.code;
                    name = o.name?o.name:o.text;
                    level = cur_level;
                }
                $.ajax({
                    data:{"code":code, "name":name, "level":level},
                    url: config.asyncUrl,
                    async: false,
                    success: function (data) {
                        if (typeof (data)=="string" && fnIsJSON(data)) {
                            data = JSON.parse(data);
                        }
                        result = data;
                        if (o==null && typeof (async_first_data)=="undefined") {
                            async_first_data = data;
                        }
                    }
                });
            }
            return result;
        }

        _this._init();

        return {
            on:_this._on,
            show:_this._show,
            hide:_this._hide,
            refreshData:_this._refreshData,
            getCurrentObject:_this._getCurrentObject,
            getTotalValueAsArray:_this._getTotalValueAsArray,
            getTotalValueAsText:_this._getTotalValueAsText,
            clearSelectedData:_this._clearSelectedData,
            setSelectedData:_this._setSelectedData
        };
    };
    window.addressPicker = addressPicker;
}());
