<template>
  <div class="detail">
    <div class="top">
      <div class="swiper">
        <swiper indicator-dots="true" autoplay="true" interval="2300" indicator-color="#fff" indicator-active-color="rgb(217,43,81)">
          <swiper-item v-for="(item, i) in detailData.imgList" :key="i">
            <img class="banner" :src="item" alt="" />
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div class="title_content">
      <div class="user">
        <img :src="detailData.headImageUrl" alt="" />
        <span class="name">{{ detailData.nick }}</span>
      </div>
      <div class="careful">关注</div>
    </div>
    <div class="detail_content" v-html="html"></div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      detailData: {},
      html: "",
    };
  },
  async created() {
    wx.showLoading({
      title: "加载中……",
    });
    let res = await this.REQUEST(this.detailId.id, "com");
    if (res.code == 200) {
      this.detailData = res.data;
      // 处理标签内的内容
      let p = res.data.content.replace(/\n/g, "<br />");
      this.html = '<div style="padding-left:15px;padding-right:15px;letter-spacing:2px;line-height:25px;">' + p + "</div>";
      // 返回分享的数据 title,imageUrl
      this.$emit("shareData", {
        title: this.detailData.title,
        imageUrl: this.detailData.coverUrl,
      });
      wx.hideLoading();
    } else {
      this.TOAST("fail", "获取数据失败！");
    }
  },
  computed: {
    ...mapState(["detailId"]),
  },
};
</script>

<style lang="less" scoped>
.detail {
  .top {
    position: relative;
    width: 100%;
    height: 450px;

    .share {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 38px;
      height: 38px;
      z-index: 9;
    }

    .swiper {
      width: 100%;
      height: 100%;

      swiper {
        height: 450px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .title_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    .user {
      display: flex;
      align-items: center;

      img {
        width: 44px;
        height: 44px;
        margin-right: 10px;
        border-radius: 50%;
      }

      .name {
        color: #666;
        font-size: 15px;
      }
    }

    .careful {
      width: 60px;
      height: 30px;
      color: #cc294c;
      text-align: center;
      line-height: 30px;
      border: 1px solid #cc294c;
      border-radius: 5px;
    }
  }

  .detail_content {
    color: #666;
    font-size: 16px;
    padding: 15px;
  }
}
</style>
