<template>
  <!--精选礼物列表-->
  <div class="recommend">
    <div @click="toDetail(item.id)" class="card_wrapper" v-for="(item, i) in dataList" :key="i">
      <div class="card_content">
        <img :src="item.coverUrl || item.mainImg" alt="" class="bg" />
        <p class="txt">{{ item.title || item.recommendCause }}</p>
        <div class="user">
          <img :src="item.uerImg || item.headImageUrl" alt="" />
          <p class="name">{{ item.name || item.nick }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    dataList: Object,
  },
  methods: {
    toDetail(id) {
      this.setDetailId({
        id,
        type: "rec",
      });
      wx.navigateTo({
        url: "/pages/detail/main",
      });
    },
    ...mapMutations(["setDetailId"]),
  },
};
</script>

<style lang="less">
.recommend {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .card_wrapper {
    width: 48%;
    height: 240px;
    margin-bottom: 18px;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px #eee8e5;
    overflow: hidden;

    &:nth-child(even) {
      margin-left: 3%;
    }

    .card_content {
      display: flex;
      flex-direction: column;

      .bg {
        top: 0;
        left: 0;
        width: 100%;
        height: 155px;
      }

      .user {
        display: flex;
        align-items: center;
        padding: 8px;

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
        }

        p {
          color: #666;
          font-size: 15px;
          padding: 6px 0 0 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .txt {
        color: #1a1a1a;
        height: 28px;
        font-size: 14px;
        padding: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
