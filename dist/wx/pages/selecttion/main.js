require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([6],{"64x3":function(t,a,e){"use strict";var o=e("zD5x"),n=e("x813");var i=function(t){e("kQoj")},s=e("ybqe")(o.a,n.a,i,"data-v-5a047425",null);a.a=s.exports},kQoj:function(t,a){},vavV:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("5nAL"),n=e.n(o),i=e("64x3");new n.a(i.a).$mount()},x813:function(t,a,e){"use strict";var o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"index"},[e("scroll-view",{staticStyle:{height:"670px"},attrs:{"scroll-y":"true",eventid:"0"},on:{scroll:t.scroll,scrolltolower:t.scrollBottom}},[e("Headers",{attrs:{headerData:t.headerData,mpcomid:"0"}}),t._v(" "),e("div",{staticClass:"card_list"},[e("Recommend",{attrs:{dataList:t.dataList,mpcomid:"1"}}),t._v(" "),t.loading.show?e("div",{staticClass:"loading"},[e("van-loading",{attrs:{type:"spinner",color:"#D92B51",mpcomid:"2"}})],1):t._e()],1)],1)],1)},staticRenderFns:[]};a.a=o},zD5x:function(t,a,e){"use strict";var o=e("Gu7T"),n=e.n(o),i=e("Xxa5"),s=e.n(i),c=e("exGp"),r=e.n(c),d=e("Cz8s"),l=e("oMBN"),u=e("BgHB");a.a={data:function(){return{dataList:[],headerData:{title:"礼物精选",tip:"精选好礼，选礼不踩雷",topSearch:!1,bg:"http://qjm6jf150.hn-bkt.clouddn.com/top_bg%20%286%29.jpg"},tagData:{title:"体验官精选",tag:"精选好礼，选礼不踩雷"},loading:{count:1,show:!1}}},created:function(){var t=this;return r()(s.a.mark(function a(){var e;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return wx.showLoading({title:"加载中……"}),a.next=3,t.REQUEST(t.loading.count,"selection");case 3:200==(e=a.sent).code?(t.dataList=e.data.data,wx.hideLoading()):t.TOAST("fail","获取数据失败！");case 5:case"end":return a.stop()}},a,t)}))()},methods:{scroll:function(t){t.target.scrollTop>245?this.headerData.topSearch=!0:this.headerData.topSearch=!1},scrollBottom:function(t){var a=this;"bottom"==t.mp.detail.direction&&(this.loading.show=!0,this.REQUEST(++this.loading.count,"selection").then(function(t){200==t.code&&(a.dataList=[].concat(n()(a.dataList),n()(t.data.data)),a.loading.show=!1)}).catch(function(t){a.loading.show=!1,a.TOAST("fail","获取数据失败！")}))}},watch:{},components:{Recommend:l.a,Headers:d.a,Tag:u.a}}}},["vavV"]);