<template>
  <!--礼物社区列表-->
  <div class="community">
    <div @click="toDetail(item.id)" class="card_wrapper" v-for="(item, index) in dataList" :key="index">
      <div class="card_content">
        <img :src="item.mainImg || item.coverUrl" alt="" class="bg" />
        <div class="user">
          <img :src="item.userImg || item.headImageUrl" alt="" />
          <p class="name">{{ item.nick }}</p>
        </div>
        <p class="txt">{{ item.recommendCause || item.title }}</p>
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
        type: "com",
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
.community {
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
        padding: 0 8px 8px 8px;
        margin-top: -9px;

        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
        }

        p {
          color: #666;
          font-size: 15px;
          padding-left: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .txt {
        color: #1a1a1a;
        height: 38px;
        font-size: 14px;
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
