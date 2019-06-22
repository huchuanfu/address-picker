# address-picker
    一个jquery地址选择器，使用很简单。
    A jQuery plugin for picking districts of China,css and js files are only 8KB,just try it.
## 文件结构
    dist/
    ├── js
        ├── address-picker.js   (compressed)
    ├── css
        ├── address-picker.css   (compressed)
    └── data
        ├── pc-code.json   (省市两级json数据)
        ├── pca-code.json  (省市区三级json数据，默认使用这个)
        └── pcas-code.json (省市区乡镇四级json数据)
##  引入文件
### 将dist文件夹下的三个文件夹放进项目（注意不要改变css或js文件的相对位置）
![image](https://github.com/huchuanfu/address-picker/blob/master/example/file-construct.jpg)
### 在html中引入js文件
```javascript
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>address-picker/js/address-picker.js" type="text/javascript"></script>
```
### 想让弹出地址面板展示在哪个页面元素下，就传入该元素的id，可以是任意元素(比如div/span/button...之类的)
下方以一个`span`举例:
```html
    <span id="address_picker_text">选择地址</span>
```
##  使用方式
### 精简方式
```javascript
    var addressPicker1 = new addressPicker("address_picker_text");//默认展示三级联动
```
### 自定义参数方式
```javascript
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
        color:"#56b4f8",                              //主题颜色，默认#56b4f8
        fontSize:'14px',                              //字体大小，默认14px
        isAsync:false,                                //是否异步加载数据，默认false，如果设置true的话asyncUrl必传
        asyncUrl:"",                                  //异步加载url，data数据将无效
        btnConfig:[],                                 //面板下方展示的自定义按钮组，格式见后面说明。默认不传
        data:""                                       //┌──未指定isAsync的时候以data为准，一次性加载所有数据
                                                      //├──可不传,默认使用`data`文件夹下的三级数据json文件
    });                                               //└──支持传入json文件路径(数据类型为string)或是数据本身(数据类型为object)
```
### 事件方法
* show()显示面板
* hide()隐藏面板
* refreshData(data) 重新载入地址data
* on(type,function) 绑定地址选择面板事件
* getCurrentObject() 获取当前点击节点数据
* getTotalValueAsText() 获取所有选择节点的文本字符串
* getTotalValueAsArray() 获取所有选择节点的数组结构
* clearSelectedData() 清除所有选中值
* setSelectedData(arr) 设置选中值
* 下方是一些代码示例:
```javascript
addressPicker1.show();  //显示面板
addressPicker1.hide();  //隐藏面板
addressPicker1.on("click", function () {
    //业务逻辑do whaterver you want ...
    console.log(addressPicker1.getCurrentObject());    //{code: 1101, text: "市辖区", level: 2}
    console.log(addressPicker1.getTotalValueAsText()); //北京市 / 市辖区
    console.log(addressPicker1.getTotalValueAsArray());//{code:['11','1101'],text:['北京市','市辖区']}
    $('#address_picker_text').text(addressPicker1.getTotalValueAsText());
});

//重新载入地址data
var new_data = [{name:'名字1',code:'110',children:[{name:'名字1的儿子',code:'1101'}]},
    {name:'名字2',code:'111'}];
address_picker.refreshData(new_data);
address_picker.show();

//设置选中值
address_picker.setSelectedData([11,1101,110105]);//注意此处要传完整路径
$("#address_picker_text").text(address_picker.getTotalValueAsText());

//清除所有选中
address_picker.clearSelectedData();
$("#address_picker_text").text("选择地区");
```
## config 详解
### 初始化`data`数据格式
* 为空或不传，默认使用本插件自带的data文件夹下的json数据(来源于民政部和国家统计局公开的全国地址数据)
* 字符串，自己项目的json文件路径，格式要求参考data文件夹下的json文件
* object，要有name、code、children三个节点，形如[{name:'',code:'',children:[{name:'',code:''}]}]

### asyncUrl返回数据格式
* 当isAsync为true且asyncUrl不为空时，切换为异步模式
* 初始化(new addressPicker)的时候会发起第一层数据的请求，以后点击每层里面的数据会发起下一层的请求
* 请求数据格式示例{"code":"11", "name":"北京市", "level":1},第一次请求的时候code和name为空
* 返回下一层数据的格式示例{code:"1101",name:"市辖区"}

### 按钮组'btnConfig'数据格式
* 可不传，默认无按钮
* 传参格式[{text:'按钮名称',click:按钮点击事件function}]，最多传3个按钮
```javascript
function fnTest(){
    alert("按钮2点击事件");
}
var btnConfig = [{text:'清除数据', click:function(){
                   address_picker.clearSelectedData();
                   $("#address_picker_text").text("选择地区");}},
                 {text:'按钮2',click:fnTest}];
```

## example(动图加载可能有点慢)
精简方式:<br>
![image](https://github.com/huchuanfu/address-picker/blob/master/example/blue-gif.gif)
<br>自定义方式(color为#29ccd7，level为5，且自定义两个按钮):<br>
![image](https://github.com/huchuanfu/address-picker/blob/master/example/green-gif.gif)
### star it if helpful and contact me if any question by QQ604712572
