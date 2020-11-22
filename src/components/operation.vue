<template>
  <div class="operation">
    <van-goods-action>
      <div class="wrapper">
        <div class="item" @click="operation('like')">
          <van-icon :name="clickData.icon1[clickData.likeCount % 2]" :color="clickData.color" size="20px" class="icon" />
          <span>喜欢</span>
        </div>
        <div class="item" @click="operation('get')">
          <van-icon :name="clickData.icon2[clickData.getCount % 2]" :color="clickData.color" size="20px" class="icon" />
          <span>收藏</span>
        </div>
      </div>
      <van-goods-action-button text="立即购买" @click="buy" />
    </van-goods-action>
    
  </div>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      showOper: true,
      clickData: {
        likeCount: 0,
        getCount: 0,
        color: "#D92B51",
        icon1: ["like-o", "like"],
        icon2: ["star-o", "star"],
      },
    };
  },
  created() {},
  methods: {
    buy() {
      this.TOAST("none", "个人类型小程序不支持外部链接跳转哦！");
    },
    operation(arg) {
      let count = 0;
      if (arg == "like") {
        count = ++this.clickData.likeCount;
        count % 2 ? this.TOAST("none", "喜欢") : this.TOAST("none", "已取消喜欢");
      }
      if (arg == "get") {
        count = ++this.clickData.getCount;
        count % 2 ? this.TOAST("none", "收藏") : this.TOAST("none", "已取消收藏");
      }
    },
  },
  watch: {
    options(n, o) {
      this.showOper = false;
      wx.nextTick(() => {
        this.showOper = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.operation {
  .wrapper {
    padding-left: 5px;
    display: flex;
    flex-wrap: nowrap;

    .item {
      display: flex;
      align-items: center;
      padding-left: 5px;

      > span {
        color: #333;
        padding-left: 3px;
      }
    }
  }
}
</style>
