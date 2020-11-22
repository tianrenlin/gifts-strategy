function weeksImgData(state,data){ //存放首页榜单小图
    state.weeksImgData=data
}
function setDetailId(state,id){ //详情页id信息
    // id类型:{id,type}
    state.detailId=id
}

function setSearchVal(state,val){ // 搜索的值
    state.searchVal=val
}
function rankInfo(state,val){ // 榜单信息
    state.rankInfo=val
}
function rankSheetShow(state,obj){ // 榜单列表显示状态
    state.rankSheetShow=obj
}
function weeksInfo(state,obj){ // 周次数据
    state.weeksInfo=obj
}
function userData(state,obj){ // 用户信息
    state.userData=obj
}
function backupDetail(state,arr){ // 关于详情页数据备份
    if(state.backupDetail){
        let flag= state.backupDetail.some(item=>{
            return item.id==arr.id
        })
        if(!flag){
            state.backupDetail.push(arr)
        }
    }else{
        state.backupDetail=arr
    }
}
export default {
    weeksImgData,
    setDetailId,
    setSearchVal,
    rankInfo,
    rankSheetShow,
    weeksInfo,
    userData
}