<template>
  <!--这是周次组件-->
  <div class="weeks">
    <scroll-view scroll-x="true" style="width: 100%" class="scroll">
      <div class="weeks_list">
        <div @click="handleWeek(i, item)" v-for="(item, i) in dataList" :key="i" :class="actived == i ? 'actived' : ''">
          {{ item.name }}
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    //获取rankSheet传递来的当前周次
    weekType: Number,
  },
  data() {
    return {
      dataList: [],
      actived: 0,
      firstReq: true,
    };
  },
  created() {
    this.getWeekData();
  },
  methods: {
    async getWeekData(i = 1) {
      wx.showLoading({
        title: "加载中……",
      });
      let res = await this.REQUEST(i, "weeks");
      if (res.code == 200) {
        this.dataList = res.data;
        this.handleWeek(0, res.data[0]);
        wx.hideLoading();
      } else {
        this.TOAST("fail", "获取周次失败！");
      }
    },
    handleWeek(i, obj) {
      this.actived = i;
      this.weeksInfo({
        index: i,
        id: obj.id,
        img: obj.webImg,
        title: obj.title,
        subTitle: obj.subtitle,
      });
    },
    ...mapMutations(["weeksInfo"]), //当前周次的数据
  },
  watch: {
    weekType(n, o) {
      this.getWeekData(n);
    },
  },
};
</script>

<style lang="less" scoped>
.weeks {
  .scroll {
    overflow: hidden;
    white-space: nowrap;
  }

  .weeks_list {
    color: #333;
    height: 54px;
    .actived {
      color: #fff;
      background: #d92b51 !important;
    }

    div {
      display: inline-block;
      width: 115px;
      height: 50px;
      margin-right: 8px;
      font-size: 16px;
      text-align: center;
      background: #fff;
      line-height: 50px;
      border-radius: 5px;
      box-shadow: 0px 1px 5px rgba(104, 85, 71, 0.24);
    }
  }
}
</style>
