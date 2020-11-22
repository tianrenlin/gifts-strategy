<template>
  <div class="index">
    <scroll-view @scroll="scroll" @scrolltolower="scrollBottom" scroll-y="true" style="height: 700px">
      <!--头部-->
      <Headers :headerData="headerData" />
      <div class="card_list" v-for="(item, index) in tagData" :key="index">
        <Tag :tagData="item" />
        <!--攻略-->
        <Experience :dataList="dataList[index]" v-if="index == 0" />
        <!--榜单-->
        <Weeks v-if="index == 1" />
        <weeksCard v-if="index == 1" />
        <!--精选-->
        <Recommend :dataList="dataList[index - 1]" v-if="index == 3" />
        <!--社区-->
        <Community :dataList="dataList[index - 1]" v-if="index == 2" />
        <!--更多-->
        <div @click="actionSheet(index)" v-if="index != 1">
          <More :more="more[index]" />
        </div>
      </div>
    </scroll-view>
    <!--弹出列表-->
    <actionSheet :sheetData="sheetData" @sheetSatus="getSheetSatus" />
    <rankSheet />
    <!--设置分享-->
    <button open-type="share" v-if="false">分享</button>
  </div>
</template>

<script>
import Headers from "../../components/header";
import Recommend from "../../components/recommend";
import Experience from "../../components/experience";
import Community from "../../components/community";
import Tag from "../../components/tag";
import More from "../../components/more";
import Weeks from "../../components/weeks";
import weeksCard from "../../components/weeksCard";
import actionSheet from "../../components/actionSheet";
import rankSheet from "../../components/rankSheet";
export default {
  data() {
    return {
      // 存放数据-json数组
      dataList: [],
      dataCache: [],
      // 传递给header
      headerData: {
        showRank: true, // 首页显示榜单
        title: "礼物攻略说",
        tip: "礼物预知与踩坑，精选礼品与测评",
        topSearch: false, //滑动时头部搜索框导航
        bg: "http://qjm6jf150.hn-bkt.clouddn.com/top_bg.jpg",
      },
      // Tag
      tagData: [
        {
          title: "礼物攻略",
          tag: "原创礼物攻略，送礼选礼不踩坑",
        },
        {
          title: "礼物榜单",
          tag: "独家礼物榜单，每周更新",
        },
        {
          title: "礼物社区",
          tag: "分享有趣的送礼小故事",
        },
        {
          title: "体验馆精选",
          tag: "精选好礼，选礼不踩雷",
        },
      ],
      // more
      more: ["查看更多礼物攻略", "", "查看更多礼物故事", "查看更多精选好礼"],
      // actionSheet
      sheetData: {
        showSheet: false,
        index: 0,
        tagData: {
          title: "体验馆精选",
          tag: "精选好礼，选礼不踩雷",
        },
        dataList: [],
      },
    };
  },
  async created() {
    // 分批获取数据，避免数据加载失败
    let len = this.tagData.length - 1;
    wx.showLoading({
      title: "加载中……",
    });
    for (let i = 0; i < len; i++) {
      if (i < 2) {
        setTimeout(() => {
          this.getIndexData(i, len);
        }, 500);
      } else {
        setTimeout(() => {
          this.getIndexData(i, len);
        }, 500);
      }
    }
  },
  methods: {
    getIndexData(i, l) {
      wx.nextTick(() => {
        this.REQUEST("index-" + ++i)
          .then((result) => {
            if (result.code == 200) {
              let getData = result.data.data || result.data;
              this.dataCache.push(getData);
              if (i == --l) {
                this.dataList = this.dataCache;
                wx.hideLoading();
              }
            }
          })
          .catch((err) => {
            setTimeout(() => {
              if (!this.dataCache) {
                this.TOAST("fail", "获取数据失败！");
              }
            }, 3200);
          });
      });
    },
    actionSheet(index) {
      this.sheetData = {
        index,
        showSheet: true,
        tagData: this.tagData[index],
      };
    },
    //获得子组件的状态，动态更改sheet状态-显示/隐藏
    getSheetSatus(status) {
      this.sheetData.showSheet = status;
    },
    //页面滑动
    scroll(e) {
      if (e.target.scrollTop > 200) this.headerData.topSearch = true;
      else this.headerData.topSearch = false;
    },
  },
  components: {
    Recommend,
    Experience,
    Community,
    Headers,
    Tag,
    More,
    Weeks,
    weeksCard,
    actionSheet,
    rankSheet,
  },
  // 设置分享
  onShareAppMessage() {
    return {
      title: "礼物攻略说-礼物预知与踩坑，精选礼品评与测评~",
    };
  },
  onShareTimeline() {
    return {
      title: "礼物攻略说-礼物预知与踩坑，精选礼品评与测评~",
    };
  },
};
</script>

<style lang="less" scoped>
.index {
  margin-bottom: 30px;
  background: #f7f5f5;

  .card_list {
    padding: 0 15px;
    transform: translateY(-190px);
    margin-top: 30px;
  }

  .loading {
    width: 100%;
    height: auto;
    margin: 8px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
