<template>
  <!--这是首页榜单大图+小图组件-->
  <div class="weeks_card">
    <scroll-view scroll-x="true" style="width: 100%" class="scroll">
      <div class="list_wrapper">
        <div class="item" v-for="i in type" :key="i" @click="handleCard(i - 1)">
          <img mode="aspectFill" :src="webImg[i]" class="bg" />
          <h1>{{ title[i] }}</h1>
          <div class="small_list">
            <img v-for="(item1, index1) in smallImg[i]" :key="index1" :src="item1" />
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      type: 3,
      title: ["每周好物榜", "暖心定制榜", "独立原创榜"],
      weekCountId: [],
      typeInfo: [],
      webImg: [],
      smallImg: [],
      getDataStuts: true,
    };
  },
  created() {},
  methods: {
    async getTypeInfo(k) {
      //获取榜单类型数据：每个类型的周次、大图
      let typeInfo = [];
      for (let i = k; i < k + 1; i++) {
        let res = await this.REQUEST(i + 1, "ranktype");
        if (res.code == 200) {
          let data = res.data;
          typeInfo.push(data);
        } else {
          this.TOAST("fail", "获取周榜失败！");
        }
      }
      if (typeInfo) {
        //周次、大图所有信息
        this.typeInfo = this.typeInfo.concat(typeInfo);
        this.rankInfo({
          //数据储存传给列表rankSheet
          rankData: this.typeInfo,
        });
      }
    },
    async getSmallImg(judeg) {
      //获取小图-分别以周次的id做请求，每个类型获得3小图
      //点击第一周，则获取第一周三个不同类型的数据（id 大图）
      let { id, index } = this.weeksInfo;
      // 取出id、大图
      let Id = [],
        Img = [];
      this.typeInfo.forEach((item, i) => {
        Id.push(item[index].id);
        Img.push(item[index].webImg);
      });
      this.webImg = Img;
      // 根据id请求小图
      let imgInfo = [];
      for (let j = 0; j < Img.length; j++) {
        let res = await this.REQUEST(Id[j], "weekimg");
        if (res.code == 200) {
          let imgArr = [];
          for (let k = 0; k < Img.length; k++) {
            //三个放一组
            imgArr.push(res.data.data[k].mainImg);
          }
          imgInfo.push(imgArr);
        } else {
          this.TOAST("fail", "获取小图失败！");
        }
      }
      if (imgInfo) {
        //进行赋值，减少性能消耗
        this.smallImg = imgInfo;
      }
    },
    handleCard(i) {
      // 拿到id
      let idArr = [];
      this.typeInfo.forEach((item) => {
        idArr.push(item[0].id);
      });
      //上弹列表状态
      this.rankInfo({
        index: i,
        id: idArr[i], //展示列表的类型
        status: Math.random(), //解决再次传值为true时watch不改变问题
      });
    },
    ...mapMutations(["rankInfo"]),
  },
  watch: {
    weeksInfo(n, o) {
      // 载入时获取数据
      if (this.getDataStuts) {
        for (let i = 0; i < this.type; i++) {
          if (i < 2) {
            setTimeout(() => {
              this.getTypeInfo(i);
            }, 300);
          } else {
            setTimeout(() => {
              this.getTypeInfo(i);
            }, 500);
          }
        }
        this.getDataStuts = false;
      } else {
        //第一次后的点击
        this.getSmallImg(1);
      }
    },
    "typeInfo.length"(n, o) {
      //监听周次数据加载完毕
      if (n == 3) {
        this.getSmallImg();
      }
    },
  },
  computed: {
    ...mapState(["weeksInfo"]),
  },
};
</script>

<style lang="less" scoped>
.weeks_card {
  margin-top: 10px;

  .scroll {
    overflow: hidden;
    white-space: nowrap;
  }

  .list_wrapper {
    width: 100%;
    height: 270px;

    .item {
      display: inline-block;
      position: relative;
      width: 220px;
      height: 100%;
      padding: 10px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      .bg {
        position: absolute;
        width: 220px;
        height: 260px;
        border-radius: 5px;
        z-index: -1;
      }

      h1 {
        position: absolute;
        bottom: 90px;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        margin: 15px;
      }

      .small_list {
        position: absolute;
        bottom: 35px;
        margin-top: 10px;
        margin-left: 15px;

        img {
          float: left;
          margin-right: 10px;
          border: 1px solid #fff;
          border-radius: 5px;
          width: 56px;
          height: 56px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
