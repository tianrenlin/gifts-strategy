<template>
  <!--礼物社区-->
  <div class="index">
    <scroll-view @scroll="scroll" @scrolltolower="scrollBottom" scroll-y="true" style="height: 670px">
      <Headers :headerData="headerData" />
      <div class="card_list">
        <Community :dataList="dataList" />
        <div class="loading" v-if="loading.show">
          <van-loading type="spinner" color="#D92B51" />
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import Headers from "../../components/header";
import Community from "../../components/community";
import Tag from "../../components/tag";
export default {
  data() {
    return {
      dataList: [],
      showMean: false,
      // 传递给header
      headerData: {
        title: "礼物社区",
        tip: "分享有趣的送礼小故事",
        topSearch: false, //滑动时头部搜索框导航
        bg: "http://qjm6jf150.hn-bkt.clouddn.com/top_bg%20%285%29.jpg",
      },
      // Tag
      tagData: {
        title: "体验官精选",
        tag: "精选好礼，选礼不踩雷",
      },
      // 上拉加载框
      loading: {
        count: 1,
        show: false,
      },
    };
  },
  async created() {
    wx.showLoading({
      title: "加载中……",
    });
    let result = await this.REQUEST(this.loading.count, "community");
    if (result.code == 200) {
      this.dataList = result.data.data;
      wx.hideLoading();
    } else {
      this.TOAST("fail", "获取数据失败！");
    }
  },
  methods: {
    scroll(e) {
      //页面滑动
      if (e.target.scrollTop > 200) this.headerData.topSearch = true;
      else this.headerData.topSearch = false;
    },
    scrollBottom(e) {
      //滑动到底部
      if (e.mp.detail.direction == "bottom") {
        this.loading.show = true;
        this.REQUEST(++this.loading.count, "community")
          .then((res) => {
            if (res.code == 200) {
              this.dataList = [...this.dataList, ...res.data.data];
              this.loading.show = false;
            }
          })
          .catch((err) => {
            this.loading.show = false;
            this.TOAST("fail", "获取数据失败！");
          });
      }
    },
  },
  watch: {},
  components: {
    Community,
    Headers,
    Tag,
  },
};
</script>

<style lang="less" scoped>
.index {
  position: relative;
  background: #f7f5f5;

  .card_list {
    padding: 0 15px;
    transform: translateY(-145px);
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
