<template>
  <div class="header">
    <div class="top_bg" :style="sty">
      <img @click="openMean" src="/static/tabs/menu.png" class="style_icon" />
      <div class="top_tip">
        <h1>{{ headerData.title }}</h1>
        <p>{{ headerData.tip }}</p>
      </div>
      <div class="search_wrapper">
        <div class="ipt">
          <input type="text" placeholder="搜攻略/礼物/测评" confirm-type="search" :value="searchInfo.value" @input="getVal" v-if="searchInfo.showIpt" />
        </div>
        <van-icon v-if="searchInfo.showCancel" @click="close(1)" name="close" size="20" class="cancel" />
        <span @click="search">
          <img src="/static/tabs/search.png" alt="" />
        </span>
      </div>
    </div>
    <div class="top_search" v-if="fixedSearch">
      <img @click="openMean" src="/static/tabs/menu2.png" alt="" />
      <div class="search_wrapper">
        <div class="ipt">
          <input type="text" placeholder="搜攻略/礼物/测评" confirm-type="search" :value="searchInfo.value" @input="getVal" v-if="searchInfo.showIpt" />
        </div>
        <van-icon v-if="searchInfo.showCancel" @click="close(-1)" name="close" size="20" class="cancel" />
        <span @click="search">
          <img src="/static/tabs/search.png" alt="" />
        </span>
      </div>
    </div>
    <van-popup :show="showMean" @close="closeMean" closeable position="left" custom-style="width:66%;height: 100%;">
      <div class="total_list">
        <div class="user" @click="toUser">
          <img :src="userData.avatarUrl" class="avatar" />
          <h1 class="name">{{ userData.nickName }}</h1>
        </div>
        <div class="present" v-for="(item, i) in leftNavData" :key="i" @click="toList(i, item.title)">
          <img :src="item.img" />
          <p>{{ item.title }}</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    headerData: Object,
  },
  data() {
    return {
      showMean: false,
      fixedSearch: false,
      sty: "",
      searchInfo: {
        vaule: "",
        showIpt: true,
        showCancel: false,
        close: false,
      },
      leftNavData: [
        {
          title: "礼物攻略",
          img: "/static/tabs/bar.png",
        },
        {
          title: "好物榜单",
          img: "/static/tabs/goods.png",
        },
        {
          title: "礼物社区",
          img: "/static/tabs/discuss.png",
        },
        {
          title: "体验官精选",
          img: "/static/tabs/love.png",
        },
        {
          title: "客户端",
          img: "/static/tabs/pone.png",
        },
        {
          title: "小程序",
          img: "/static/tabs/webapp.png",
        },
      ],
    };
  },
  created() {
    // 只有首页才显示榜单
    if (!this.headerData.showRank) {
      this.leftNavData.splice(1, 1);
    }
    // 处理传递过来的背景图片
    this.sty = `background:url(${this.headerData.bg});background-size:cover;`;
  },
  methods: {
    // 列表页
    toList(i, name) {
      let urlKey = ["ways", "", "community", "selecttion"];
      switch (name) {
        case "好物榜单":
          {
            //使用随机数解决watch监听为true时值不改变的问题
            this.rankSheetShow(Math.random());
          }
          break;
        case "客户端":
          {
            wx.redirectTo({
              url: "/pages/index/main",
            });
          }
          break;
        case "小程序":
          {
            wx.navigateTo({
              url: "/pages/user/main",
            });
          }
          break;
        default: {
          if (!this.headerData.showRank && i) ++i;
          wx.redirectTo({
            url: `/pages/${urlKey[i]}/main`,
          });
        }
      }
      this.showMean = false; //关闭导航
    },
    //个人中心
    toUser() {
      wx.navigateTo({
        url: `/pages/user/main`,
      });
    },
    //获取数据
    getVal(e) {
      let val = e.mp.detail.value.trim() || "";
      if (val) {
        this.searchInfo.value = val;
        this.searchInfo.showCancel = false;
      } else {
        this.searchInfo.showCancel = false;
      }
    },
    search() {
      this.setSearchVal(this.searchInfo.value);
      wx.navigateTo({
        url: `/pages/search/main`,
      });
    },
    openMean() {
      this.showMean = true;
    },
    closeMean() {
      this.showMean = false;
    },
    close(i) {
      //清除input按钮
      this.searchInfo.value = "";
      this.searchInfo.showCancel = false;
      this.searchInfo.showIpt = false;
      setTimeout(() => {
        this.searchInfo.showIpt = true;
      }, 1000);
    },
    ...mapMutations(["setSearchVal", "rankSheetShow"]),
  },
  computed: {
    ...mapState(["userData"]),
  },
  watch: {
    "headerData.topSearch"(newVal, oldVal) {
      this.fixedSearch = newVal;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 400px;
  position: relative;
  background: #f7f5f5;

  .top_bg {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .top_bg:after {
    position: absolute;
    content: "";
    top: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(247, 245, 245, 0), #f7f5f5);
  }

  .style_icon {
    width: 38px;
    height: 38px;
    position: absolute;
    top: 15px;
    left: 15px;
    border-radius: 50%;
    border: 2px solid #d92b51;
    z-index: 1;
  }

  .top_tip {
    color: #fff;
    position: absolute;
    top: 25%;
    left: 15px;

    h1 {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 3px;
    }

    p {
      font-size: 16px;
    }
  }

  .search_wrapper {
    position: absolute;
    top: 45%;
    left: 15px;
    right: 15px;
    display: flex;
    flex-direction: row;
    padding: 5px;
    background: #fff;

    .ipt {
      width: 100%;
      height: 35px;

      input {
        width: 98%;
        height: 35px;
        padding-left: 10px;
        padding-right: 15px;
        box-sizing: border-box;
        margin-right: 8px;
        border-right: 1px solid #e6e6e6;
      }
    }

    .cancel {
      position: absolute;
      right: 60px;
      top: 14px;
      z-index: 9;
    }

    span {
      width: 52px;
      height: 35px;
      background: #d92b51;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;

      img {
        display: inline-block;
        width: 25px;
        height: 25px;
      }
    }
  }

  .top_search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 51px;
    padding: 5px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 8;

    img {
      width: 45px;
      height: 45px;
      margin-left: 5px;
    }

    .search_wrapper {
      position: relative;
      top: 0;
      right: 0;
      left: 8px;
      width: 77.1%;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
    }
  }

  .total_list {
    margin: 25px auto 25px 25px;

    & > div {
      margin-top: 25px;
    }

    .user {
      display: flex;
      align-items: center;
      flex-direction: row;
      .avatar {
        width: 40px;
        height: 40px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
      .name {
        color: #333;
        width: 65%;
        font-size: 16px;
        font-weight: 500;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .present {
      display: flex;
      flex-direction: row;

      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }

      p {
        color: #333;
        font-size: 18px;
      }
    }
  }
}
</style>
