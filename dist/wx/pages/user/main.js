require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([5],{"2AnY":function(t,n,e){"use strict";var a=e("feqo"),s=e("L6as");var i=function(t){e("E8cf")},o=e("ybqe")(a.a,s.a,i,"data-v-6642fee7",null);n.a=o.exports},E8cf:function(t,n){},L6as:function(t,n,e){"use strict";var a={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"user"},[e("div",{staticClass:"top_bg"},[e("button",{staticClass:"header",attrs:{"open-type":"getUserInfo",eventid:"0"},on:{getuserinfo:t.getUserInfo}},[e("div",{staticClass:"avatar"},[e("img",{attrs:{src:t.userInfo.avatarUrl}}),t._v(" "),e("div",[e("h1",{staticClass:"name"},[t._v(t._s(t.userInfo.nickName))]),t._v(" "),t.userInfo.tips?e("p",[t._v("点击登录账号")]):t._e()],1)])]),t._v(" "),0==t.userInfo.tips?e("div",{staticClass:"out",attrs:{eventid:"1"},on:{click:t.getOut}},[t._v("注销")]):t._e()],1),t._v(" "),e("div",{staticClass:"my_tag"},[e("h1",[t._v("我的记录")]),t._v(" "),e("div",{staticClass:"tag"},t._l(t.tagsData,function(n,a){return e("div",{key:a},[e("span",[t._v(t._s(n.count))]),t._v(" "),e("p",[t._v(t._s(n.tag))])],1)}))],1),t._v(" "),e("div",{staticClass:"project"},t._l(t.projectData,function(n,a){return e("div",{key:a,staticClass:"info",attrs:{eventid:"2_"+a},on:{click:function(n){t.showProject(a)}}},[e("van-icon",{staticClass:"icon",attrs:{name:n.icon,size:"30",mpcomid:"0_"+a}}),t._v(" "),e("p",[t._v(t._s(n.title))])],1)})),t._v(" "),e("van-popup",{attrs:{show:t.showPopup,closeable:"",position:t.popupData.position,"custom-style":t.popupData.style,"z-index":"1000",eventid:"3",mpcomid:"1"},on:{close:t.onClose}},[t.toggleContent?e("div",{staticClass:"popup"},[e("img",{staticClass:"logo",attrs:{src:t.popupData.icon}}),t._v(" "),e("h1",{staticClass:"title"},[t._v(t._s(t.popupData.title))]),t._v(" "),e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.popupData.content)}})],1):t._e()]),t._v(" "),t._e()],1)},staticRenderFns:[]};n.a=a},N0En:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("5nAL"),s=e.n(a),i=e("2AnY");new s.a(i.a).$mount()},feqo:function(t,n,e){"use strict";var a=e("Dd8w"),s=e.n(a),i=e("NYxO");n.a={data:function(){return{tagsData:[{count:23,tag:"喜欢"},{count:20,tag:"收藏"},{count:29,tag:"关注"},{count:10,tag:"搜索次数"},{count:"0x",tag:"其它"}],userInfo:{tips:!0,nickName:"未登录",avatarUrl:"/static/img/user.jpg"},oldData:{},showPopup:!1,popupData:{position:"",style:"",icon:"",title:"",conten:""},projectData:[{icon:"/static/tabs/logo.png",title:"项目简介",content:"礼物预知与踩坑，精选礼品与测评。<br />\n            项目主要使用mpvue + vant weapp + vuex开发，使用less编写样式，逻辑模块化，UI组件化，封装wx.request获取线上数据返回Promise对象，\n            mpvue主要用来实现逻辑，vant-weapp用来布局，vuex实现组件之间数据交互。其中也使用到了Vue和微信小程序的一些API，\n            如数据绑定、指令、$emit、wx.navigateTo、小程序配置等。"},{icon:"http://mpvue.com/assets/img/logo.0aaccdfd.png",title:"mpvue",content:"\n            基于Vue2.x核心修改，可以运行在小程序环境中，从而为小程序开发引入了整套Vue开发体验，会Vue几乎会mpvue。<br/>\n            官网：http://mpvue.com/\n          "},{icon:"https://vuejs.org/images/logo.png",title:"Vuex",content:"\n            专为 Vue.js 应用程序开发的状态管理模式，主要用来管理组件的状态。用来传递组件间的数据时方变快捷。<br/>\n            当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余，使用辅助函数mapState,mapMutations可以解决这些问题。<br/>\n            官网：https://vuex.vuejs.org/zh/\n          "},{icon:"http://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png",title:"Vant Weapp",content:"\n            有赞前端团队开源的移动端组件库，小程序版本Vant Weapp。<br/>\n            官网：http://vant-contrib.gitee.io/vant-weapp/#/intro<br/>\n            在该项目中使用到的组件：<br/>\n            加载：van-loading<br/>\n            按钮：van-button<br/>\n            图标：van-icon<br/>\n            弹出层：van-popup<br/>\n            上拉菜单：van-action-sheet<br/>\n            商品导航：van-goods-action、van-goods-action-button\n          "},{icon:"/static/tabs/github.png",title:"GitHub",content:""},{icon:"https://gitee.com/assets/favicon.ico",title:"Gitee",content:""},{icon:"/static/tabs/nandian.png",title:"难点",content:"\n            <b>1、榜单数据渲染。</b><br/>\n              ①先获取不同类型的周次（组），每组不同类型的周次都存在id和背景大图等信息；<br/>\n              ②小图是根据不同类型周次请求的3条数据，只有首页存在小图；<br/>\n              ③首页展示榜单图是每个类型周次下标为0的图，榜单详情的大图一致则是取当前周次的大图；<br/>\n              ④周次的id作为当前周次列表请求的依据。<br/>\n            <b>2、页面初始化时分批次请求数据。</b><br/>\n              如请求type=1、type=2、type=3时，需要每次返回的数据，但直接写3次请求显得不怎么好。\n              此处使用for+setTimeout，在for里进行可以进行判断分段请求。<br/>\n            <b>3、封装wx.request</b><br/>\n              使用Promise对wx.request进行封装，传入对应参数并处理，接收数据时可用.then或者async/await。在main.js中全局引入添加到Vue原型上。\n              再把对应的host、header等独立出来操作相对简便明了。<br/>\n            <b>4、复用组件时数据不更新问题。</b><br/>\n              方案一：在onLoad()中添加：Object.assign(this.$data, this.$options.data()); <br/>\n              方案二：使用v-if+wx.nextTick+watch。页面默认显示，watch监听页面的值发生变化时把页面关闭，然后在wx.nextTick中再次把页面打开，实现了页面销毁到创建。input和组件销毁与创建可以用此方法（小程序input不支持双向绑定）。<br/>\n          "},{icon:"/static/tabs/youhua.png",title:"优化",content:"\n            <b>1、图片压缩</b><br/>\n              把图片进行压缩能够解决一半以上文件过大问题。<br/>\n              压缩率50%~80%的网址：https://tinypng.com/<br/>\n            <b>2、UglifyJs压缩解决vendor过大问题</b><br/>\n              修改build目录下 的webpack.dev.conf.js配置文件：<br/>\n              var UglifyJsPlugin = require('uglifyjs-webpack-plugin') <br/>\n              new UglifyJsPlugin({ sourceMap: true })<br/>\n            <b>3、移除无用的库、组件、文件</b><br/>\n              这项目使用了vant weapp组件库，只需要引入必要的组件，过多的组件会变得卡顿。当然，若组件使用数量少还是使用小程序自带的较好。<br/>\n            <b>4、开启Vue.config._mpTrace = true</b><br/>\n              在src/main.js添加 Vue.config._mpTrace = true<br/>\n              该属性会自动打印页面请求的数据、用户操作等500ms内产生的数据更新量。<br/>\n            <b>5、精简data</b><br/>\n              小程序的内存是很可贵的，页面间数据传递、请求与缓存的数据对性能影响较大，通过精简数据来进行优化。把一些不必要的数据处理后再setData，尽量减少数据冗余，提升性能。<br/>\n          "},{icon:"/static/tabs/zhuyi.png",title:"其它&注意",content:'\n            1、路由跳转只能使用小程序提供的：wx.switchTab、wx.reLaunch、wx.redirectTo、wx.navigateTo、wx.navigateBack<br/>\n            2、路由懒加载不能使用，如：const About = () => import(\'@/components/about\')<br/>\n            3、延迟操作：wx.nextTick，类似setTimeout<br/>\n            4、富文本rich-text样式不生效解决方案：使用replace替换对应的html标签，再使用v-html绑定数据<br/>\n            5、image的object-fit:cover没有效果，解决：在图片标签里加入属性 mode="aspectFill"<br/>\n            6、安装less注意：npm install less --save、npm install less-loader@4.1.0 --save，并在webpack.base.conf.js 的rules节点下新增：\n              {test: /\\.less$/,loader: "style-loader!css-loader!less-loader"}<br/>\n            7、纵向滑动与横向滑动<br/>\n              纵向：一定要设置scoll-y="true"和height为具体数值，百分比、min和max都不能用。<br/>\n              横向：width可以使用百分比<br/>\n              ①scroll-view 横向 中的需要滑动的元素不可以用 float 浮动；<br/>\n              ②scroll-view 横向 该元素用 display:flex; 是没有作用的；<br/>\n              ③scroll-view 横向 中的需要滑动的元素，即展示的小块排列元素要用 dislay:inline-block; 进行元素的横向编排；<br/>\n              ④scroll-view 横向 该元素明确的宽和加上样式--\x3e  overflow:hidden;white-space:nowrap;<br/>\n              ⑤在scroll-view中设置flex样式可能失效或者发生一些变化。<br/>\n            8、个人类型和海外类型的小程序不支持 web-view 标签，使用了页面只会显示提示内容。<br/>\n          '}],toggleContent:!0}},created:function(){this.oldData=this.userInfo,this.getUserInfo()},methods:s()({getUserInfo:function(){var t=this;this.userInfo.tips&&wx.getUserInfo({success:function(n){wx.showLoading({title:"登录中……"});var e=n.userInfo;t.userInfo={tips:!1,nickName:e.nickName,avatarUrl:e.avatarUrl},t.userData(t.userInfo),t.loginFlag=!1,wx.hideLoading()},fail:function(n){setTimeout(function(){t.TOAST("none","试试登录吧~")},2e3)}})},getOut:function(){this.userInfo=this.oldData,this.TOAST("none","已退出登录！"),this.userData(this.oldData)},showProject:function(t){var n=this,e=["top","bottom","left","right"],a=["height:45%;","height:40%;","width: 78%;height:100%;"],s=Math.floor(4*Math.random()+0),i=void 0;switch(e[s]){case"top":i=a[0];break;case"bottom":i=a[1];break;case"left":case"right":i=a[2];break;default:i=a[s]}var o=this.projectData[t],r=o.icon,c=o.title,u=o.content;this.popupData={position:e[s],style:i,icon:r,title:c,content:u},this.toggleContent=!1,wx.nextTick(function(){n.toggleContent=!0}),this.showPopup=!0},onClose:function(){this.showPopup=!1}},Object(i.b)(["userData"])),onShareAppMessage:function(){var t=this.userInfo.nickName;return"未登录"==t&&(t="小礼君"),{title:"来自-礼物说-"+t+" 的分享~~",imageUrl:this.userInfo.avatarUrl}},onShareTimeline:function(){var t=this.userInfo.nickName;return"未登录"==t&&(t="小礼君"),{title:"来自-礼物说-"+t+" 的分享~~",imageUrl:this.userInfo.avatarUrl}}}}},["N0En"]);