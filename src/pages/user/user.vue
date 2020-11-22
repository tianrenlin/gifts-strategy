<template>
  <div class="user">
    <div class="top_bg">
      <button class="header" open-type="getUserInfo" @getuserinfo="getUserInfo">
        <div class="avatar">
          <img :src="userInfo.avatarUrl" />
          <div>
            <h1 class="name">{{ userInfo.nickName }}</h1>
            <p v-if="userInfo.tips">点击登录账号</p>
          </div>
        </div>
      </button>
      <div class="out" @click="getOut" v-if="userInfo.tips == false">注销</div>
    </div>
    <div class="my_tag">
      <h1>我的记录</h1>
      <div class="tag">
        <div v-for="(item, i) in tagsData" :key="i">
          <span>{{ item.count }}</span>
          <p>{{ item.tag }}</p>
        </div>
      </div>
    </div>
    <div class="project">
      <div class="info" v-for="(item, i) in projectData" :key="i" @click="showProject(i)">
        <van-icon :name="item.icon" size="30" class="icon" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <van-popup :show="showPopup" closeable :position="popupData.position" :custom-style="popupData.style" @close="onClose" z-index="1000">
      <div class="popup" v-if="toggleContent">
        <img :src="popupData.icon" class="logo" />
        <h1 class="title">{{ popupData.title }}</h1>
        <div class="content" v-html="popupData.content"></div>
      </div>
    </van-popup>
    <button open-type="share" v-if="false">转发</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      tagsData: [
        { count: 23, tag: "喜欢" },
        { count: 20, tag: "收藏" },
        { count: 29, tag: "关注" },
        { count: 10, tag: "搜索次数" },
        { count: "0x", tag: "其它" },
      ],
      userInfo: {
        tips: true,
        nickName: "未登录",
        avatarUrl: "/static/img/user.jpg",
      },
      oldData: {},
      showPopup: false,
      popupData: {
        position: "",
        style: "",
        icon: "",
        title: "",
        conten: "",
      },
      projectData: [
        {
          icon: "/static/tabs/logo.png",
          title: "项目简介",
          content: `礼物预知与踩坑，精选礼品与测评。<br />
            项目主要使用mpvue + vant weapp + vuex开发，使用less编写样式，逻辑模块化，UI组件化，封装wx.request获取线上数据返回Promise对象，
            mpvue主要用来实现逻辑，vant-weapp用来布局，vuex实现组件之间数据交互。其中也使用到了Vue和微信小程序的一些API，
            如数据绑定、指令、$emit、wx.navigateTo、小程序配置等。`,
        },
        {
          icon: "http://mpvue.com/assets/img/logo.0aaccdfd.png",
          title: "mpvue",
          content: `
            基于Vue2.x核心修改，可以运行在小程序环境中，从而为小程序开发引入了整套Vue开发体验，会Vue几乎会mpvue。<br/>
            官网：http://mpvue.com/
          `,
        },
        {
          icon: "https://vuejs.org/images/logo.png",
          title: "Vuex",
          content: `
            专为 Vue.js 应用程序开发的状态管理模式，主要用来管理组件的状态。用来传递组件间的数据时方变快捷。<br/>
            当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余，使用辅助函数mapState,mapMutations可以解决这些问题。<br/>
            官网：https://vuex.vuejs.org/zh/
          `,
        },
        {
          icon: "http://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png",
          title: "Vant Weapp",
          content: `
            有赞前端团队开源的移动端组件库，小程序版本Vant Weapp。<br/>
            官网：http://vant-contrib.gitee.io/vant-weapp/#/intro<br/>
            在该项目中使用到的组件：<br/>
            加载：van-loading<br/>
            按钮：van-button<br/>
            图标：van-icon<br/>
            弹出层：van-popup<br/>
            上拉菜单：van-action-sheet<br/>
            商品导航：van-goods-action、van-goods-action-button
          `,
        },
        {
          icon: "/static/tabs/github.png",
          title: "GitHub",
          content: "",
        },
        {
          icon: "https://gitee.com/assets/favicon.ico",
          title: "Gitee",
          content: "",
        },
        {
          icon: "/static/tabs/nandian.png",
          title: "难点",
          content: `
            <b>1、榜单数据渲染。</b><br/>
              ①先获取不同类型的周次（组），每组不同类型的周次都存在id和背景大图等信息；<br/>
              ②小图是根据不同类型周次请求的3条数据，只有首页存在小图；<br/>
              ③首页展示榜单图是每个类型周次下标为0的图，榜单详情的大图一致则是取当前周次的大图；<br/>
              ④周次的id作为当前周次列表请求的依据。<br/>
            <b>2、页面初始化时分批次请求数据。</b><br/>
              如请求type=1、type=2、type=3时，需要每次返回的数据，但直接写3次请求显得不怎么好。
              此处使用for+setTimeout，在for里进行可以进行判断分段请求。<br/>
            <b>3、封装wx.request</b><br/>
              使用Promise对wx.request进行封装，传入对应参数并处理，接收数据时可用.then或者async/await。在main.js中全局引入添加到Vue原型上。
              再把对应的host、header等独立出来操作相对简便明了。<br/>
            <b>4、复用组件时数据不更新问题。</b><br/>
              方案一：在onLoad()中添加：Object.assign(this.$data, this.$options.data()); <br/>
              方案二：使用v-if+wx.nextTick+watch。页面默认显示，watch监听页面的值发生变化时把页面关闭，然后在wx.nextTick中再次把页面打开，实现了页面销毁到创建。input和组件销毁与创建可以用此方法（小程序input不支持双向绑定）。<br/>
          `,
        },
        {
          icon: "/static/tabs/youhua.png",
          title: "优化",
          content: `
            <b>1、图片压缩</b><br/>
              把图片进行压缩能够解决一半以上文件过大问题。<br/>
              压缩率50%~80%的网址：https://tinypng.com/<br/>
            <b>2、UglifyJs压缩解决vendor过大问题</b><br/>
              修改build目录下 的webpack.dev.conf.js配置文件：<br/>
              var UglifyJsPlugin = require('uglifyjs-webpack-plugin') <br/>
              new UglifyJsPlugin({ sourceMap: true })<br/>
            <b>3、移除无用的库、组件、文件</b><br/>
              这项目使用了vant weapp组件库，只需要引入必要的组件，过多的组件会变得卡顿。当然，若组件使用数量少还是使用小程序自带的较好。<br/>
            <b>4、开启Vue.config._mpTrace = true</b><br/>
              在src/main.js添加 Vue.config._mpTrace = true<br/>
              该属性会自动打印页面请求的数据、用户操作等500ms内产生的数据更新量。<br/>
            <b>5、精简data</b><br/>
              小程序的内存是很可贵的，页面间数据传递、请求与缓存的数据对性能影响较大，通过精简数据来进行优化。把一些不必要的数据处理后再setData，尽量减少数据冗余，提升性能。<br/>
          `,
        },
        {
          icon: "/static/tabs/zhuyi.png",
          title: "其它&注意",
          content: `
            1、路由跳转只能使用小程序提供的：wx.switchTab、wx.reLaunch、wx.redirectTo、wx.navigateTo、wx.navigateBack<br/>
            2、路由懒加载不能使用，如：const About = () => import('@/components/about')<br/>
            3、延迟操作：wx.nextTick，类似setTimeout<br/>
            4、富文本rich-text样式不生效解决方案：使用replace替换对应的html标签，再使用v-html绑定数据<br/>
            5、image的object-fit:cover没有效果，解决：在图片标签里加入属性 mode="aspectFill"<br/>
            6、安装less注意：npm install less --save、npm install less-loader@4.1.0 --save，并在webpack.base.conf.js 的rules节点下新增：
              {test: /\\.less$/,loader: "style-loader!css-loader!less-loader"}<br/>
            7、纵向滑动与横向滑动<br/>
              纵向：一定要设置scoll-y="true"和height为具体数值，百分比、min和max都不能用。<br/>
              横向：width可以使用百分比<br/>
              ①scroll-view 横向 中的需要滑动的元素不可以用 float 浮动；<br/>
              ②scroll-view 横向 该元素用 display:flex; 是没有作用的；<br/>
              ③scroll-view 横向 中的需要滑动的元素，即展示的小块排列元素要用 dislay:inline-block; 进行元素的横向编排；<br/>
              ④scroll-view 横向 该元素明确的宽和加上样式-->  overflow:hidden;white-space:nowrap;<br/>
              ⑤在scroll-view中设置flex样式可能失效或者发生一些变化。<br/>
            8、个人类型和海外类型的小程序不支持 web-view 标签，使用了页面只会显示提示内容。<br/>
          `,
        },
      ],
      toggleContent: true,
    };
  },
  created() {
    this.oldData = this.userInfo;
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      if (this.userInfo.tips) {
        //是否已登录
        wx.getUserInfo({
          success: (res) => {
            wx.showLoading({
              title: "登录中……",
            });
            let result = res.userInfo;
            this.userInfo = {
              tips: false,
              nickName: result.nickName,
              avatarUrl: result.avatarUrl,
            };
            this.userData(this.userInfo);
            this.loginFlag = false;
            wx.hideLoading();
          },
          fail: (err) => {
            setTimeout(() => {
              this.TOAST("none", "试试登录吧~");
            }, 2000);
          },
        });
      }
    },
    getOut() {
      this.userInfo = this.oldData;
      this.TOAST("none", "已退出登录！");
      this.userData(this.oldData);
    },
    showProject(i) {
      //随机位置展示效果
      let position = ["top", "bottom", "left", "right"];
      let style = ["height:45%;", "height:40%;", "width: 78%;height:100%;"];
      let num = Math.floor(Math.random() * 4 + 0); //0-3
      let sty;
      switch (position[num]) {
        case "top":
          {
            sty = style[0];
          }
          break;
        case "bottom":
          {
            sty = style[1];
          }
          break;
        case "left":
          {
            sty = style[2];
          }
          break;
        case "right":
          {
            sty = style[2];
          }
          break;
        default:
          sty = style[num];
      }
      let { icon, title, content } = this.projectData[i];
      this.popupData = {
        position: position[num],
        style: sty,
        icon,
        title,
        content,
      };
      this.toggleContent = false;
      wx.nextTick(() => {
        this.toggleContent = true;
      });
      this.showPopup = true;
    },
    onClose() {
      this.showPopup = false;
    },
    ...mapMutations(["userData"]),
  },
  onShareAppMessage() {
    let name = this.userInfo.nickName;
    if (name == "未登录") {
      name = "小礼君";
    }
    return {
      title: `来自-礼物说-${name} 的分享~~`,
      imageUrl: this.userInfo.avatarUrl,
    };
  },
  onShareTimeline() {
    let name = this.userInfo.nickName;
    if (name == "未登录") {
      name = "小礼君";
    }
    return {
      title: `来自-礼物说-${name} 的分享~~`,
      imageUrl: this.userInfo.avatarUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100%;
  color: #333;

  .top_bg {
    width: 100%;
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: url("http://qjm6jf150.hn-bkt.clouddn.com/top_bg%20%282%29.jpg");
    // background-size: cover;
    .header {
      width: 58%;
      height: 75px;
      margin: 0;
      background: none;
      display: flex;
      align-items: center;
      &:after {
        border: none;
      }
      .avatar {
        display: flex;
        align-items: center;
        flex-direction: row;
        letter-spacing: 2px;
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          border-radius: 50%;
          border: 1px solid #d92b51;
        }
        h1 {
          color: #d92b51;
          height: 30px;
          font-size: 16px;
          font-weight: 500;
        }
        p {
          font-size: 14px;
        }
      }
    }
    .out {
      color: #666;
      width: 50px;
      letter-spacing: 2px;
    }
  }
  .my_tag {
    width: 100%;
    padding: 15px 15px 0 15px;
    h1 {
      width: 100%;
      font-size: 16px;
      padding-bottom: 16px;
      box-sizing: border-box;
      position: relative;
      &:after {
        position: absolute;
        content: "";
        width: 90%;
        top: 35px;
        left: 0;
        border-bottom: 1rpx solid #d9d9d9;
      }
    }
    .tag {
      display: flex;
      align-items: center;
      flex-direction: row;
      text-align: center;
      padding: 25px 0;
      div {
        width: 16.66%;
        span {
          font-size: 16px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  .project {
    width: 100%;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    &:after {
      position: absolute;
      content: "技术与方案";
      font-size: 50px;
      top: 42%;
      color: #ededed;
      letter-spacing: 12px;
      transform: rotate(40deg);
      z-index: -1;
    }
    .info {
      width: 33.33%;
      height: 100px;
      padding: 15px auto;
      box-sizing: border-box;
      border: 1rpx solid #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-right: none;
      border-bottom: none;
      &:nth-child(3n + 3) {
        border-right: 1rpx solid #d9d9d9;
      }
      &:nth-child(n + 7) {
        border-bottom: 1rpx solid #d9d9d9;
      }
      .icon {
        padding-bottom: 5px;
      }
      p {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .popup {
    color: #333;
    font-size: 16px;
    padding: 15px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .logo {
      width: 50px;
      height: 50px;
    }
    .title {
      font-weight: 600;
      margin: 15px auto;
    }
    .content {
      line-height: 30px;
    }
  }
}
</style>
