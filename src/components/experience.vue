<template>
  <div class="experience">
    <div @click="toDetail(item.itemId || item.id)" class="card_wrapper" v-for="(item, index) in dataList" :key="index">
      <div class="card_content">
        <p class="tag">{{ item.columnName }}</p>
        <h1 class="title">{{ item.cardTitle }}</h1>
        <img :src="item.mainImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    dataList: Array,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {},
  methods: {
    toDetail(id) {
      this.setDetailId({
        id,
        type: "exp",
      });
      wx.navigateTo({
        url: "/pages/detail/main",
      });
    },
    ...mapMutations(["setDetailId"]),
  },
  watch: {
    // dataList(n, o) {
    //   if (n) {
    //     this.list = this.dataList;
    //   }
    // },
  },
};
</script>

<style lang="less">
.experience {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .card_wrapper {
    width: 47%;
    height: 228px;
    padding: 5px 8px 5px 8px;
    margin-bottom: 18px;
    border-radius: 15px 0 0 15px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px #eee8e5;

    .card_content {
      display: flex;
      flex-direction: column;

      .tag {
        color: #888;
        font-size: 14px;
        padding: 5px;
      }

      .title {
        color: #333;
        font-size: 16px;
        font-weight: 500;
        padding-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      img {
        width: 150px;
        height: 155px;
      }
    }

    &:nth-child(even) {
      border-radius: 0 15px 15px 0;
      margin-left: 5%;
    }
  }
}
</style>
