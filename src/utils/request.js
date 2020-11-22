// 封装发送请求
import config from './config'
import api from './api'
export default function(url,type='',data={},method="GET"){
    //传一个参数时
    if(!type){
        type=url
    }
    // 判断url的类型
    switch(type){ //一定记住break！！！
        /*=============首页==============*/
        case 'index-1':{ //礼物攻略
            url=api.INDEX.experienceIndex
        };break;
        case 'index-2':{ //体验官精选
            url=api.INDEX.recommendIndex
        };break;
        case 'index-3':{ //礼物社区
            url=api.INDEX.communityIndex
        };break;
        /*=============卡片详情==============*/
        case 'exp':{ //攻略
            url=api.DETAIL.detailExp.replace(/keywords/i,`${url}`)
        };break;
        case 'com':{ //社区
            url=api.DETAIL.detailCom.replace(/keywords/i,`${url}`)
        };break;
        case 'rec':{ //精选
            url=api.DETAIL.detailRec.replace(/keywords/i,`${url}`)
        };break;
        /*=============搜索==============*/
        case 'sways':{ //攻略
            url=api.SEARCH.searchWays.replace(/keywords/i,`${url}`)
        };break;
        case 'sgifts':{ //礼物
            url=api.SEARCH.searchGifts.replace(/keywords/i,`${url}`)
        };break;
        /*=============榜单==============*/
        case 'ranktype':{ //榜单类型
            url=api.RANK.rankType.replace(/keywords/i,`${url}`) 
        };break;
        case 'weekimg':{ //榜单小图
            url=api.RANK.weekImg.replace(/keywords/i,`${url}`) 
        };break;
        case 'weeks':{ //每周列表
            url=api.RANK.weeks.replace(/keywords/i,`${url}`)
        };break;
        case 'weeksl':{ //周榜列表
            url=api.RANK.weeksList.replace(/keywords/i,`${url}`) 
        };break;
        /*=============单页==============*/
        case 'about':{ //相关礼物
            url=api.about.replace(/keywords/i,`${url}`) 
        };break;
        case 'ways':{ //攻略 
            url=api.ways.replace(/keywords/i,`${url}`)
        };break;
        case 'rank':{ //榜单 
            url=api.rank.replace(/keywords/i,`${url}`)
        };break;
        case 'selection':{ //体验官精选
            url=api.selection.replace(/keywords/i,`${url}`) 
        };break;
        case 'community':{ //礼物社区
            url=api.community.replace(/keywords/i,`${url}`) 
        };break;
        default:url
    }
    // console.log('请求数据',type,url)
    // 发送请求，返回promise
    return new Promise((resolve,reject)=>{
        wx.request({
            url:config.host+url,
            data,
            header:config.header,
            method,
            success:res=>{
                resolve(res.data)
            },
            fail: err=>{
                reject(err)
            }
        })
    })
}

