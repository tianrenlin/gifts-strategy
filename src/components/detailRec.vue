<template>
  <div class="detail">
    <div class="top">
      <div class="swiper">
        <swiper indicator-dots="true" autoplay="true" interval="2300" indicator-color="#fff" indicator-active-color="rgb(217,43,81)">
          <swiper-item v-for="(item, i) in detailData.goodsSkuImgDtoList" :key="i">
            <img class="banner" :src="item.url" alt="" />
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div class="title_content">
      <div class="wrapper">
        <span class="pirce"><span>￥</span>{{ detailData.price }}</span>
        <div class="title">{{ detailData.name }}</div>
      </div>
      <div class="content">{{ html }}</div>
    </div>
    <div class="about">
      <div class="title">相关礼物</div>
      <div class="list">
        <div class="item" @click="about(item.id)" v-for="(item, index) in aboutData" :key="index">
          <img :src="item.mainImg" alt="" />
          <h3>{{ item.name }}</h3>
          <span>{{ item.name }}</span>
          <p class="price">￥ {{ item.price }}</p>
        </div>
      </div>
    </div>
    <Operation />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Operation from "./operation";
export default {
  data() {
    return {
      detailData: {},
      aboutData: {},
      html: "",
    };
  },
  async created() {
    wx.showLoading({
      title: "加载中……",
    });
    let res1 = await this.REQUEST(this.detailId.id, "rec");
    if (res1.code == 200) {
      this.detailData = res1.data;
      // 处理recommendCause报错
      this.html = res1.data.experienceNoteDto.recommendCause;
      // 返回分享的数据 title,imageUrl
      this.$emit("shareData", {
        title: this.detailData.name,
        imageUrl: this.detailData.goodsSkuImgDtoList[0].url,
        path: this.detailData.shareUrl,
      });
      wx.hideLoading();
    } else {
      this.TOAST("fail", "获取数据失败！");
    }
    let res2 = await this.REQUEST(this.detailId.id, "about");
    if (res2.code == 200) {
      // 处理数据-图片
      res2.data.forEach((item) => {
        item.mainImg = item.mainImg.replace(/-w720/i, "");
      });
      this.aboutData = res2.data;
    } else {
      this.TOAST("fail", "获取数据失败！");
    }
  },
  methods: {
    about(id) {
      //相关礼物id
      this.setDetailId({
        id,
        type: "rec",
      });
      wx.reLaunch({
        url: "/pages/detail/main",
      });
    },
    ...mapMutations(["setDetailId"]),
  },
  computed: {
    ...mapState(["detailId"]),
  },
  components: {
    Operation,
  },
};
</script>

<style lang="less" scoped>
.detail {
  .top {
    position: relative;
    width: 100%;
    height: 298px;
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
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .title_content {
    padding: 15px;

    .wrapper {
      font-size: 20px;
      color: #cc294c;
      font-weight: 600;

      .pirce {
        padding: 15px 0 10px 0;

        span {
          font-size: 18px;
        }
      }

      .title {
        color: #333;
        padding: 8px 0 15px 0;
      }
    }

    .content {
      color: #666;
      font-size: 16px;
      letter-spacing: 2px;
      line-height: 25px;
    }
  }

  .about {
    padding: 15px;

    .title {
      color: #333;
      font-size: 20px;
      font-weight: 600;

      margin: 15px auto;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;

      .item {
        width: 48%;
        height: 237px;
        font-size: 16px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #f7f3f1;
        margin-top: 15px;
        overflow: hidden;

        &:nth-child(even) {
          margin-left: 3%;
        }

        img {
          width: 100%;
          height: 156px;
        }

        h3 {
          color: #1a1a1a;
          padding: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          color: #999;
          font-size: 14px;
          padding-left: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .price {
          color: #cc294c;
          display: block;
          padding-top: 8px;
        }
      }
    }
  }
}
</style>
