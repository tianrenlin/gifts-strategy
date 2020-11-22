<template>
  <!--这是榜弹出单列表的组件-->
  <div class="action_sheet">
    <van-action-sheet :show="showCard" @close="onClose">
      <div class="content">
        <div class="top">
          <div class="tag">
            <h1 @click="chooseRank(i)" v-for="(tag, i) in tagTitle" :key="i" :class="actived == i ? 'actived' : ''">
              {{ tag }}
            </h1>
          </div>
          <div class="canel" @click="onClose">✕</div>
          <div class="weeks">
            <Weeks :weekType="weekType" />
          </div>
        </div>
        <div class="crad_list">
          <scroll-view scroll-y="true" scroll-top="15px" style="height: 375px">
            <div class="list">
              <div class="header">
                <img :src="weeksInfo.img" alt="" />
                <h1>{{ weeksInfo.title }}</h1>
                <p>{{ weeksInfo.subTitle }}</p>
              </div>
              <div class="wrapper">
                <div class="item" @click="toDetail(item.id, item)" v-for="(item, i) in dataList" :key="i">
                  <img :src="item.mainImg" alt="" />
                  <p>{{ item.name }}</p>
                  <span>{{ item.title }}</span>
                  <i>￥{{ item.price }}</i>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Weeks from "./weeks";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      showCard: false,
      dataList: {},
      actived: 0,
      tagTitle: ["每周好物榜", "暖心定制榜", "独立原创榜"],
      weekType: 1,
    };
  },
  methods: {
    async getListData(tid) {
      let id = tid || this.weeksInfo.id || "";
      if (id) {
        wx.showLoading({
          title: "加载中……",
        });
        let res = await this.REQUEST(id, "weeksl");
        this.dataList = res.data.data;
        wx.hideLoading();
      }
    },
    toDetail(id, item) {
      this.setDetailId({
        id,
        type: "rec",
      });
      wx.reLaunch({
        url: "/pages/detail/main",
      });
    },
    //榜单类型
    chooseRank(i) {
      this.actived = i;
      //进行传递给weeks组件
      this.weekType = i + 1;
    },
    // 根据首页点击类型不同，展示的类型不同
    fromIndexRank(id) {
      let index = this.rankInfo.index;
      this.actived = index;
      this.chooseRank(index);
      this.getListData(id);
    },
    onClose() {
      this.showCard = false;
    },
    ...mapMutations(["setDetailId"]),
  },
  watch: {
    "weeksInfo.id"(n, o) {
      if (n) {
        this.getListData();
      }
    },
    "rankInfo.id"(n, o) {
      this.fromIndexRank(n);
    },
    "rankInfo.status"(n, o) {
      //监听weeksCard组件传递过来的状态值
      if (n) {
        this.showCard = n;
      }
    },
    rankSheetShow(n, o) {
      //监听header传递来的榜单列表显示
      if (n) {
        this.showCard = n;
      }
    },
  },
  computed: {
    ...mapState(["weeksInfo", "rankInfo", "rankSheetShow"]), //当前周次 所有周次、大图 榜单列表显示状态
  },
  components: {
    Weeks,
  },
};
</script>

<style lang="less" scoped>
.content {
  position: relative;
  min-height: 380px;
  .top {
    .canel {
      color: #333;
      font-size: 20px;
      font-weight: 600;
      position: absolute;
      top: 15px;
      right: 20px;
      z-index: 105;
    }

    .tag {
      padding: 30px 15px 18px 15px;
      display: flex;
      justify-items: center;
      flex-direction: row;
      h1 {
        color: #999;
        font-size: 16px;
        line-height: 15px;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
      .actived {
        color: #1a1a1a;
        font-size: 22px;
        font-weight: 600;
      }
    }
    .weeks {
      padding: 15px;
    }
  }
  .crad_list {
    width: 100%;
    min-height: 350px;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #f7f5f5;
    position: relative;
    .list {
      .header {
        position: relative;
        width: 100%;
        height: 160px;
        margin-bottom: 10px;
        z-index: 0;
        img {
          width: 100%;
          height: 100%;
          height: 160px;
          position: absolute;
          top: 0;
          border-radius: 8px;
        }
        h1,
        p {
          width: 100%;
          position: absolute;
          left: 15px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          z-index: 1;
        }
        h1 {
          font-size: 22px;
          font-weight: 600;
          bottom: 48px;
        }
        p {
          width: 75%;
          bottom: 12px;
          font-size: 16px;
        }
      }
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 48%;
          height: 238px;
          font-size: 16px;
          border-radius: 5px;
          background: #fff;
          overflow: hidden;
          margin-right: 4%;
          margin-bottom: 15px;
          &:nth-child(even) {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 156px;
          }
          p,
          span {
            width: 100%;
            color: #1a1a1a;
            padding-left: 15px;
            padding-right: 15px;
            margin: 3px 0;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            display: block;
            color: #999;
            font-size: 15px;
            padding: 2px auto;
          }
          i {
            color: #d92b51;
            padding-top: 5px;
            padding-left: 15px;
          }
        }
      }
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
}
</style>
