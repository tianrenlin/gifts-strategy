<template>
  <div class="detail">
    <!--分享按钮-->
    <div class="share">
      <div class="top">
        <button open-type="share" class="share_btn">
          <img src="/static/tabs/share.png" class="share_img" />
        </button>
      </div>
    </div>
    <!--攻略的详情页-->
    <detailExp v-if="detailId.type == 'exp'" @shareData="getShareData" />
    <!--社区的详情页-->
    <detailCom v-if="detailId.type == 'com'" @shareData="getShareData" />
    <!--榜单的详情页-->
    <detailRec v-if="detailId.type == 'rec'" @shareData="getShareData" />
  </div>
</template>

<script>
/*
    1、要跳转的页面 → detail → detailExp/detailCom/detailRec
    2、此页面再根据标识(exp、com、rec)跳到对应的组件详情页
    3、标识页面：攻略-exp:detailExp 社区-com:detailCom 精选-rec:detailRec
*/
import detailExp from "../../components/detailExp";
import detailCom from "../../components/detailCom";
import detailRec from "../../components/detailRec";
import { mapState } from "vuex";
export default {
  data() {
    return {
      sharePopup: false,
      shareData: {},
    };
  },
  onShareAppMessage() {
    return this.shareData;
  },
  onShareTimeline() {
    return this.shareData;
  },
  methods: {
    getShareData(e) {
      this.shareData = e;
    },
    toShow() {
      // this.sharePopup = true;
    },
    toClose() {
      this.sharePopup = false;
    },
  },
  computed: {
    ...mapState(["detailId"]),
  },
  components: {
    detailExp,
    detailCom,
    detailRec,
  },
  // 监听页面卸载，清空data数据
  onUnload() {
    Object.assign(this, this.$options.data());
  },
};
</script>

<style lang="less" scoped>
.share {
  position: fixed;
  top: 15px;
  right: 15px;
  width: 38px;
  height: 38px;
  z-index: 9;
  .top {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.555);
    display: flex;
    justify-content: center;
    align-items: center;
    .share_btn {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        border: none;
      }
      .share_img {
        width: 24px;
        height: 24px;
        margin-right: 1px;
      }
    }
  }
  .share_to {
    width: 100%;
    display: flex;
    justify-content: space-around;
    button {
      width: 150px;
      height: 132px;
      margin: 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &:after {
        border: none;
      }
      img {
        width: 50px;
        height: 50px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
</style>
