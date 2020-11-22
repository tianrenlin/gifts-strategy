<template>
  <div class="search">
    <!--搜索框-->
    <div class="top_search">
      <div class="search_wrapper">
        <div class="search_box">
          <div class="ipt">
            <input type="text" placeholder="搜攻略/礼物/测评" :value="value" confirm-type="search" @input="getVal" v-if="showIpt" />
          </div>
          <van-icon v-if="showCancel" @click="close(-1)" name="close" size="20" class="cancel" />
          <span>
            <img src="/static/tabs/search.png" alt="" />
          </span>
        </div>
        <p @click="back">取消</p>
      </div>
    </div>
    <!--撑起头部高度-->
    <div class="top_height"></div>
    <!--历史记录-->
    <div class="history" v-if="history.length">
      <div class="title_wrapper">
        <div class="title">历史搜索</div>
        <van-icon name="delete" size="20" class="delete" @click="delHistory" />
      </div>
      <div class="history_list">
        <span @click="search(i)" v-for="(item, i) in history" :key="i">{{ item }}</span>
      </div>
    </div>
    <!--搜索结果-->
    <div class="result" v-if="searchData[0].show == false && searchData[1].show == false">
      <div class="title">全部相关礼物</div>
    </div>
    <div class="result" v-for="(item, i) in searchData" :key="i">
      <div v-if="item.show" class="title">{{ item.title }}</div>
      <div class="result_list" v-if="i == 0">
        <Experience :dataList="item.dataList" />
        <div @click="showSheet(i)">
          <More :more="item.txt" v-if="item.more" />
        </div>
      </div>
      <div class="result_list" v-if="i == 1">
        <Recommend :dataList="item.dataList" />
        <div @click="showSheet(i)">
          <More :more="item.txt" v-if="item.more" />
        </div>
      </div>
    </div>
    <actionSheet :sheetData="sheetData[0]" @sheetSatus="getSheetSatus" />
    <actionSheet :sheetData="sheetData[1]" @sheetSatus="getSheetSatus" />
  </div>
</template>

<script>
import Headers from "../../components/header";
import More from "../../components/more";
import Experience from "../../components/experience";
import Recommend from "../../components/recommend";
import actionSheet from "../../components/actionSheet";
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      index: 0,
      history: [],
      showCancel: false,
      showIpt: true,
      searchData: [
        {
          show: false,
          more: false,
          txt: "",
          title: "相关攻略",
          dataList: [],
        },
        {
          show: false,
          more: false,
          txt: "",
          title: "相关礼物",
          dataList: [],
        },
      ],
      searchKey: ["sways", "sgifts"],
      sheetData: [
        {
          showSheet: false,
          index: 4, //sways
          tagData: {
            title: "全部相关攻略",
            tag: "",
          },
        },
        {
          showSheet: false,
          index: 5, //sgifts
          tagData: {
            title: "全部相关礼物",
            tag: "",
          },
        },
      ],
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getVal(e) {
      //获取数据
      let val = e.mp.detail.value;
      this.value = val;
      if (val) {
        this.showCancel = true;
        this.search();
      } else {
        this.showCancel = false;
      }
    },
    close(i) {
      //清除input按钮
      if (i > -1) {
        //接受i作为判断依据：-1：清理，>-1：历史快速搜索传过来的数据。这样后this.vaule才不出现对象的未知问题，若以this.vaule作为判断则会把this.value赋值为对象未知问题
        this.value = this.history[i];
      } else {
        this.value = "";
      }
      this.showCancel = false;
      this.showIpt = false;
      wx.nextTick(() => {
        this.showIpt = true;
      });
    },
    getHistory() {
      try {
        let history = wx.getStorageSync("history");
        if (history) {
          //存在记录
          let arr = history.split(",");
          this.history = arr.slice(0, arr.length - 1); //去掉最后一个空数组
        }
      } catch (e) {
        //不存在记录
      }
    },
    delHistory() {
      //清除历史记录
      try {
        wx.removeStorageSync("history");
        this.history = [];
      } catch (e) {
        this.TOAST("none", "清除失败！");
      }
    },
    setHistory(val) {
      //保存历史记录-字符串转数组方式
      try {
        // 获取记录
        let history = wx.getStorageSync("history");
        if (history) {
          // 有记录，进行判断相同的是否已存在
          let arr = history.split(",");
          let flag = arr.some((item) => item == val); //查找是否存在-存在：true
          if (!flag) {
            history += val + ",";
            wx.setStorage({
              // 保存记录
              key: "history",
              data: history,
            });
          }
        } else {
          // 无记录，保存
          wx.setStorage({
            // 保存记录
            key: "history",
            data: val + ",",
          });
        }
        this.getHistory();
      } catch (e) {
        this.TOAST("fail", "获取历史记录失败！");
      }
    },
    async search(i) {
      if (i > -1) {
        //点击历史记录快速查询
        this.close(i); // 注意：最好传i作为判断已经，若是this.value可能出错
        this.showCancel = true;
      }
      this.value = this.value.trim();
      if (this.value) {
        this.setHistory(this.value); //保存历史记录
        wx.showLoading({
          title: "加载中……",
        });
        for (let i = 0; i < this.searchData.length; i++) {
          let res = await this.REQUEST(this.value, this.searchKey[i]);
          let sum = res.data.totalNum;
          this.searchData[i].dataList = []; //清空数据
          if (res.code == 200) {
            if (sum) {
              //判断数据数目，没有则不显示
              this.searchData[i].show = true; //搜索结果的数据
              if (sum > 1) {
                //显示more组件
                this.searchData[i].more = true;
                if (i == 0) this.searchData[i].txt = `查看全部${sum}条攻略`;
                if (i == 1) this.searchData[i].txt = `查看全部${sum}件商品`;
              } else {
                //否则关闭more组件
                this.searchData[i].more = false;
              }
              let reslut = res.data.data;
              this.searchData[i].dataList = reslut.slice(0, 2); //截取2条数据
              wx.hideLoading();
              this.TOAST("none", "已加载全部数据");
            } else {
              //没有数据，都关闭
              this.searchData[i].show = false;
              this.searchData[i].more = false;
            }
          } else {
            this.TOAST("fail", "获取数据失败！");
          }
        }
      }
    },
    showSheet(i) {
      //显示下弹出列表框
      this.sheetData[i].showSheet = true;
      this.index = i;
    },
    getSheetSatus(status) {
      //获得子组件的状态，动态更改sheet状态-显示/隐藏
      this.sheetData[this.index].showSheet = status;
    },
    back() {
      //返回上一页
      wx.navigateBack({
        delta: 1,
      });
    },
  },
  watch: {
    searchVal(n, o) {
      //监听其它页面传递过来的搜索框数据
      this.value = this.searchVal;
      this.showCancel = true;
      this.showIpt = false;
      wx.nextTick(() => {
        this.showIpt = true;
      });
      this.search();
    },
  },
  computed: {
    ...mapState(["searchVal"]),
  },
  components: {
    Headers,
    More,
    Experience,
    Recommend,
    actionSheet,
  },
};
</script>

<style lang="less" scoped>
.search {
  min-height: 650px;
  background: #f7f5f5;

  .top_search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;
    box-sizing: border-box;
    background: #fff;
    z-index: 8;

    .search_wrapper {
      width: 100%;
      height: 50px;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .search_box {
        width: 85%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        .ipt {
          width: 100%;
          height: 35px;

          input {
            width: 100%;
            height: 100%;
            font-size: 18px;
            padding-left: 10px;
            padding-right: 40px;
            box-sizing: border-box;
            margin-right: 8px;
            border-right: 1px solid #e6e6e6;
          }
        }

        .cancel {
          position: absolute;
          right: 60px;
          top: 9px;
        }

        span {
          width: 52px;
          height: 35px;
          background: #d92b51;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 2px;

          img {
            width: 25px;
            height: 25px;
          }
        }
      }

      p {
        width: 15%;
        padding: auto 2.5%;
        color: #666;
        font-size: 16px;
        text-align: center;
      }
    }
  }

  .top_height {
    height: 60px;
  }

  .history {
    padding: 15px 15px 5px 15px;

    .title_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      .title {
        font-size: 22px;
        font-weight: 600;
      }

      .delete {
        padding-right: 8px;
      }
    }

    .history_list {
      max-height: 71px;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      span {
        max-width: 40%;
        height: 50px;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 2px 5px #d4d0cf;
        border-radius: 5px;
        margin: 8px 8px 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .result {
    padding: 15px 15px 5px 15px;
    margin-top: 15px;

    .title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }
}
</style>
