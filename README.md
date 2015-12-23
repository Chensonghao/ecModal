# ecModal
> 一款弹出模态窗体的Jquery插件

## 使用
### 1.引入css
```
  <link rel="stylesheet" href="css/ecModal.css">
```
### 2.引入脚本
```
  <script src="js/jquery.min.js"></script>
  <script src="js/ecModal.js"></script>
```

### 3.页面结构
```
  /*模态窗体*/
  <div class="md-modal md-effect-1" id="modal">
        <div class="md-content">
            <div class="md-header">
                <h3>Modal Dialog</h3>
            </div>
            <div class="md-body">
            </div>
            <div class="md-footer">
                <button class="md-close">关闭</button>
            </div>
        </div>
  </div>
    /*页面主体内容*/
  <div class="md-container">
        页面主体内容
  </div>
```
##### 总共19种动态弹出效果，分别对应19种class：md-effect-1 ~ md-effect-19

### 4.事件调用
```
  //为元素绑定点击弹出模态窗体事件
  $(selector).ecModal({
        target: 'id',                   //模板id
        blur: false,                    //模糊背景
        overlayClose: true,             //点击其它区域关闭
        closeCallback: function() {
            //md-close类触发的关闭回调函数
        }
  })
```
##### 或者
```
  //在其他事件中即时触发弹出窗体
  $.ecModal.open({
        target: 'id',                   //模板id
        beforeOpen: function() {
                //打开前执行

        },
        afterOpen: function() {
                //打开后执行
        },
        blur: false,                    //模糊背景
        overlayClose: true,             //点击其它区域关闭
        closeCallback: function() {
            //md-close类触发的关闭回调函数
        }
  })
```
关闭
```
  $.ecModal.close(function() {
      //关闭后后回调函数
  });
```
