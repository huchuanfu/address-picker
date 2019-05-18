# address-picker
    A jQuery plugin for picking districts of China,css and js files are only `8KB`,just try it.
## Files
    dist/
    ├── js
        ├── address-picker.js   (compressed)
    ├── css
        ├── address-picker-blue.css   (compressed)
        ├── address-picker-green.css   (compressed)
    └── data
        ├── pc-code.json
        ├── pca-code.json
        └── pcas-code.json
## Include files:
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>address-picker/js/address-picker.js" type="text/javascript"></script>
## Usage
### quick start
    var addressPicker1 = new addressPicker("address_picker_text");
### custom
    var addressPicker1 = new addressPicker({
        id:"address_picker_text",                     //想要展示在哪个页面元素下
        level:3,                                      //设置几级联动，默认3，可支持1-5
        levelDesc:["省份","城市","区县","乡镇","社区"], //每级联动标题展示文字,默认如左显示
        index:"996",                                  //浮动面板的z-index，默认`996`
        separator:" / ",                              //选择后返回的文字值分隔符，例如`四川省 / 成都市 / 武侯区`,默认` / `
        isInitClick:true,                             //是否为元素id自动绑定点击事件,默认`true`
        isWithMouse:false,                            //浮动面板是否跟随鼠标点击时坐标展示(而不是根据元素id的坐标).默认`false`
        offsetX:0,                                    //浮动面板x坐标偏移量，默认`0`
        offsetY:0,                                    //浮动面板y坐标偏移量,默认`0`
        emptyText:"暂无数据",                          //数据为空时展示文字,默认'暂无数据'
        theme:"blue",                                 //主题，目前有`blue`和'green'两种,默认`blue`
        data:""                                       //可不传,默认使用`data`文件夹下的三级数据json文件
    });                                               //支持传入json文件路径(数据类型为string)，或是数据本身(数据类型为object)
    
## config API
    if I have time to write.
## example
    if I have time.
