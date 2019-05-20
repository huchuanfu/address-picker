# address-picker
    一个jquery地址选择器，很简单。
    A jQuery plugin for picking districts of China,css and js files are only `8KB`,just try it.
## Files
    dist/
    ├── js
        ├── address-picker.js   (compressed)
    ├── css
        ├── address-picker-blue.css   (compressed)
        ├── address-picker-green.css   (compressed)
    └── data
        ├── pc-code.json   (省市两级json数据)
        ├── pca-code.json  (省市区三级json数据，默认使用这个)
        └── pcas-code.json (省市区乡镇四级json数据)
## Include files
### 将dist文件夹下的三个文件夹放进项目，注意不要改变css或js文件的位置
![image](https://github.com/huchuanfu/address-picker/blob/master/example/file-construct.jpg)
### 在html中引入js文件(如果项目有jquery就不需要引第一个js)
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>address-picker/js/address-picker.js" type="text/javascript"></script>
## 想让弹出地址面板展示在哪个页面元素下，就传入该元素的id，可以是任意元素(比如div/span/button...之类的)
    下方以一个span举例:
    <span id="address_picker_text">选择地址</span>
## Usage
### 精简方式使用quick start
    var addressPicker1 = new addressPicker("address_picker_text");//默认展示三级联动
### 自定义参数方式使用custom
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
    });                                               //支持传入json文件路径(数据类型为string)或是数据本身(数据类型为object)
### 事件方法method
    addressPicker1.on("click", function () {               //绑定地址选择面板事件
        //业务逻辑do whaterver you want ...
        console.log(addressPicker1.getCurrentObject());    //获取当前点击节点数据:{code: 1101, text: "市辖区", level: 2}
        console.log(addressPicker1.getTotalValueAsText()); //获取所有选择节点文本:北京市 / 市辖区
        console.log(addressPicker1.getTotalValueAsArray());//获取所有选择节点编码:{code:['11','1101'],text:['北京市','市辖区']}
        $('#address_picker_text').text(addressPicker1.getTotalValueAsText());
	});
    addressPicker1.show();  //显示面板
    addressPicker1.hide();  //隐藏面板
## config API
    if I have time to write.
## example(动图加载可能有点慢)
blue theme:<br>
![image](https://github.com/huchuanfu/address-picker/blob/master/example/blue-gif.gif)
<br>green theme:<br>
![image](https://github.com/huchuanfu/address-picker/blob/master/example/green-gif.gif)
## star it if helpful,thanks
