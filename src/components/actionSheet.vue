<template>
  <!--这是首页点击查看更多时弹出的列表组件（不包括榜单列表）-->
  <div class="action_sheet">
    <van-action-sheet :show="showCard" @close="onClose">
      <div class="content">
        <div class="tag">
          <Tag :tagData="sheetData.tagData" />
        </div>
        <div class="canel" @click="onClose">✕</div>
        <div class="crad_list">
          <scroll-view @scrolltolower="scrollBottom" scroll-y="true" scroll-top="15px" style="height: 450px">
            <Experience :dataList="dataList" v-if="sheetData.index == 0 || sheetData.index == 4" />
            <Community :dataList="dataList" v-if="sheetData.index == 2" />
            <Recommend :dataList="dataList" v-if="sheetData.index == 3 || sheetData.index == 5" />
            <div class="loading" v-if="loading.show">
              <van-loading type="spinner" color="#D92B51" />
            </div>
          </scroll-view>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Tag from "./tag";
import Experience from "./experience";
import Community from "./community";
import Recommend from "./recommend";
export default {
  props: {
    sheetData: Object,
  },
  data() {
    return {
      showCard: false,
      dataList: {},
      // 上拉加载框
      loading: {
        count: 1,
        show: false,
      },
      reqArg: ["ways", "", "community", "selection", "sways", "sgifts"],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      wx.showLoading({
        title: "加载中……",
      });
      let res = await this.REQUEST(1, this.reqArg[this.sheetData.index]);
      if (res.code == 200) {
        this.dataList = res.data.data;
        wx.hideLoading();
      } else {
        this.TOAST("fail", "获取数据失败！");
      }
    },
    onClose() {
      this.showCard = false;
      this.$emit("sheetSatus", this.showCard);
    },
    scrollBottom(e) {
      //滑动到底部
      if (e.mp.detail.direction == "bottom") {
        this.loading.show = true;
        this.REQUEST(++this.loading.count, this.reqArg[this.sheetData.index])
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
  watch: {
    // 监听sheet状态-开：true 关：false
    "sheetData.showSheet"(newVal, oldVal) {
      this.showCard = newVal;
    },
    // 清空数据，避免之前请求的其他数据混合
    "sheetData.index"(n, o) {
      this.dataList = {};
      this.getData();
    },
  },
  components: {
    Tag,
    Experience,
    Community,
    Recommend,
  },
};
</script>

<style lang="less" scoped>
.content {
  position: relative;
  min-height: 380px;

  .canel {
    color: #333;
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    top: 12px;
    right: 20px;
    z-index: 105;
  }

  .tag {
    padding-top: 18px;
    padding-left: 15px;
  }

  .crad_list {
    width: 100%;
    min-height: 350px;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #f7f5f5;
    position: relative;

    .loading {
      width: 100%;
      height: auto;
      margin: 8px auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
