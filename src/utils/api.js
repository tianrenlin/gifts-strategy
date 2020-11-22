/*
    在要传参数处已加入keywords进行替换，如原先的id=123换为id=keywords，
    方便在request.js中进行参数查找与替换。
*/

/*==========首页==========*/
// 礼物攻略-截取4条数据
const experienceIndex=`https://rpc.liwushuo.com/giftstory-api/api/cross/homerecommemd/beforeList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=1&pageSize=4`
// 体验官精选
const recommendIndex=`https://rpc.liwushuo.com/giftstory-api/api/goodssku/web/findRandomRecommendCause?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&num=4`
// 礼物社区
const communityIndex=`https://rpc.liwushuo.com/giftstory-api/api/note/web/findRandomRecommendNoteDtoList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&num=4`
const INDEX={
    experienceIndex,recommendIndex,communityIndex
}
/*==========详情==========*/
// 详情页-攻略
const detailExp=`https://rpc.liwushuo.com/giftstory-api/api/article/web/articleView?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&articleId=keywords&version=5.0.2`
// 详情页-社区
const detailCom=`https://rpc.liwushuo.com/giftstory-api/api/note/web/detail?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&id=keywords`
// 详情页-精选
const detailRec=`https://rpc.liwushuo.com/giftstory-api/api/goodssku/web/goodsView?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&goodsSkuId=keywords`
const DETAIL={
    detailExp,detailCom,detailRec
}

/*==========搜索==========*/
// 相关攻略
const searchWays=`https://rpc.liwushuo.com/giftstory-api/api/cross/web/homerecommemd/articleList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=1&pageSize=10&title=keywords`
// 相关礼物
const searchGifts=`https://rpc.liwushuo.com/giftstory-api/api/goodssku/searchGoodsByName?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=1&pageSize=10&goodsName=keywords`
const SEARCH={
    searchWays,searchGifts
}
/*==========榜单==========*/
// 榜单类型
const rankType=`https://rpc.liwushuo.com/giftstory-api/api/giftrank/findGiftRankPeriodicalList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&type=keywords`
// 每周榜单小图-以每个不同类型的周次id进行请求
const weekImg=`https://rpc.liwushuo.com/giftstory-api/api/giftrank/findGiftRankItemDtoByPage?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&id=keywords&pageNum=1&pageSize=3`
// 周次列表-id、大图
const weeks=`https://rpc.liwushuo.com/giftstory-api/api/giftrank/findGiftRankPeriodicalList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&type=keywords`
// 周榜列表
const weeksList=`https://rpc.liwushuo.com/giftstory-api/api/giftrank/findGiftRankItemDtoByPage?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&id=keywords&pageNum=1&pageSize=20`
const RANK={
    rankType,weekImg,weeks,weeksList
}
/*==========单页==========*/
// 礼物攻略
const ways=`https://rpc.liwushuo.com/giftstory-api/api/cross/homerecommemd/beforeList?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=keywords&pageSize=10`
// 礼物社区
const community=`https://rpc.liwushuo.com/giftstory-api/api/note/list?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=keywords&pageSize=10`
// 体验官精选
const selection=`https://rpc.liwushuo.com/giftstory-api/api/goodssku/list?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&pageNum=keywords&pageSize=10`

// 相关礼物
const about=`https://rpc.liwushuo.com/giftstory-api/api/goodssku/recommend?clientId=web&accountSecToken=b282571b5ac047d6b42889fbdf04dcec&deviceId=123&model=iPhone&clientVersion=5.0.0&timeStamp=1581561415877&nonceStr=32FEECD1-D823-4E76-B897-F8B8A08E8F99&os=13.1.1&tadId=236&id=keywords&count=4&hotRecommend=4`
export default {
    INDEX,
    DETAIL,
    SEARCH,
    RANK,
    ways,
    community,
    selection,
    about
}


