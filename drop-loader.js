'use strict';
(function() {
  /*
  {
    id:'',              //滚动容器id
    more:true,         //默认是否有更多数据 true-有数据;false-没有更多数据
    callback:function(onsuccess){
      onsuccess({
        more: true
      });
    } //松开加载回调中需要传入加载完成后的回调,在其中传入more为true或false以标识当前是否有更多数据
  }
  */
  function DropLoader(opts) {
    if (!opts) return;
    this.status = opts.more ? 0 : 3;
    this.labels = ['上拉加载', '松开立即加载', '正在加载...', '暂无更多数据'];
    this.render(opts);
  }
  DropLoader.prototype = {
    render: function(opts) {
      var scrollerDOM = document.getElementById(opts.id);
      if (!scrollerDOM) return;
      var mainDOM = document.createElement('div'),
        iconDOM = document.createElement('i'),
        textDOM = document.createElement('div');

      mainDOM.style.cssText = 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center;background: #efefef;height: 40px;font-size: 0.736842em;'
      textDOM.style.marginLeft = '3px';
      iconDOM.className = 'icon iconfont';
      iconDOM.style.display = 'block';

      this.mainDOM = mainDOM;
      this.iconDOM = iconDOM;
      this.textDOM = textDOM;
      this.changeState();
      mainDOM.appendChild(iconDOM);
      mainDOM.appendChild(textDOM);
      this.scrollerDOM = scrollerDOM;
      var wrapper = document.getElementById('wrapper');
      wrapper && (wrapper.style.height = 'auto');
      var inner = scrollerDOM.querySelector('.inner');
      if(inner){
        inner.appendChild(mainDOM);
      }else{
        this.scrollerDOM.appendChild(mainDOM);
      }
      this.bindEvents(opts.callback);
    },
    bindEvents: function(callback) {
      var startY = 0,
        lastY = 0,
        perY = 0.3; //向上一动距离/手指滑动距离
      //开始
      this.scrollerDOM.addEventListener('touchstart', function(e) {
        if (this.status === 3) {
          return;
        }
        startY = e.touches[0].pageY;
        lastY = startY;
      });
      //手指滑动
      this.scrollerDOM.addEventListener('touchmove', function(e) {
        var scrollTop = this.scrollerDOM.scrollTop,
          clientHeight = this.scrollerDOM.clientHeight,
          scrollHeight = this.scrollerDOM.scrollHeight;
        var body = document.body;
        var bt = body.scrollTop,
          ch = body.clientHeight,
          sh = body.scrollHeight;
        if ((sh - bt - ch > 1) || (scrollHeight - scrollTop - clientHeight > 1) || this.status === 3) {
          return;
        }
        console.dir(sh - bt - ch);
        //当前Y坐标
        var currentY = e.targetTouches[0].pageY;
        //是否上拉
        var isDropUp = lastY - currentY > 0;
        lastY = currentY;
        //当前Y坐标轴位移
        var offsetY = startY - currentY;
        var transitionY = offsetY * perY;
        if (isDropUp || (!isDropUp && offsetY > 0)) {
          e.preventDefault();
        }
        this.scrollerDOM.style.webkitTransition = '-webkit-transform 0s ease-out';
        this.scrollerDOM.style.webkitTransform = 'translate3d(0,' + (-transitionY) + 'px,0)';

        if (transitionY > 40 && this.status === 0) {
          this.status = 1;
          this.changeState();
        }
        if (transitionY <= 40 && this.status === 1) {
          this.status = 0;
          this.changeState();
        }
      }.bind(this));
      //触摸结束
      this.scrollerDOM.addEventListener('touchend', function(e) {
        this.scrollerDOM.style.webkitTransition = '-webkit-transform 0.2s ease-out';
        this.scrollerDOM.style.webkitTransform = 'translate3d(0,0,0)';
        if (this.status === 3) {
          return;
        }
        //如果状态是‘松开立即加载，则执行回掉’
        if (this.status === 1 && callback && typeof callback === 'function') {
          this.status = 2;
          this.changeState();
          return callback(function(params) {
            this.status = params.more ? 0 : 3;
            this.changeState();
          }.bind(this));
        }
      }.bind(this));
    },
    changeState: function() {
      //切换显示文字
      this.textDOM.innerText = this.labels[this.status];
      switch (this.status) {
        case 0:
          changeStyle.bind(this)(0);
          break;
        case 1:
          changeStyle.bind(this)(180);
          break;
        case 2:
          this.iconDOM.innerHTML = '';
          this.iconDOM.classList.add('spinner');
          break;
        case 3:
          this.iconDOM.style.display = 'none';
          break;
      }

      function changeStyle(angle) {
        this.iconDOM.innerHTML = '&#xe609;';
        this.iconDOM.classList.remove('spinner');
        this.iconDOM.style.webkitTransition = '-webkit-transform 0.2s ease-out';
        this.iconDOM.style.webkitTransform = 'rotate(' + angle + 'deg)';
      };
    }
  };
  module.exports = DropLoader;
})();
