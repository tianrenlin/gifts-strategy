<template>
  <div class="detail">
    <div class="top">
      <img class="banner" :src="detailData.mainImg" alt="" />
    </div>
    <div class="title_content">
      <div>{{ detailData.title }}</div>
      <img src="/static/img/mosaic.png" alt="" />
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
  async beforeMount() {
    wx.showLoading({
      title: "加载中……",
    });
    let result = await this.REQUEST(this.detailId.id, "exp");
    if (result.code == 200) {
      this.detailData = result.data;
      // 处理标签内容
      let img = result.data.h5Content.replace(/\<img/g, '<img style="width:100%;height:auto;" ');
      let p = img.replace(/<p/g, '<p style="color#666;line-height:30px;letter-spacing:2px;padding-left:15px;padding-right:15px;"');
      let h1 = p.replace(/<h1/g, '<h1 style="text-align: center;color#333;font-size:18px;"');
      this.html = p;
      // 返回分享的数据 title,imageUrl
      this.$emit("shareData", {
        title: this.detailData.title,
        imageUrl: this.detailData.mainImg,
        path: this.detailData.shareUrl,
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
    width: 100%;
    height: 290px;
    .banner {
      width: 100%;
      height: 290px;
    }
  }

  .title_content {
    padding: 15px;
    overflow: hidden;

    div {
      color: #333;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 3px;
      padding-bottom: 30px;
      border-bottom: 1px solid #888;
    }

    img {
      margin-top: 5px;
      width: 22px;
      height: 50px;
      float: right;
    }
  }
}
</style>
