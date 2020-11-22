/*
    一些公共的数据
*/
// 分享
export const share=[
    [{
            name: '微信',
            icon: 'wechat'
        },
        {
            name: '微博',
            icon: 'weibo'
        },
        {
            name: 'QQ',
            icon: 'qq'
        }, {
            name: '复制链接',
            icon: 'link'
        },
        {
            name: '二维码',
            icon: 'qrcode'
        }, {
            name: '分享海报',
            icon: 'poster'
        }
    ],
]
export const toast=function(icon='success',title='成功！',duration=1500){
    let image=''
    if(icon=='fail'){
        image='/static/tabs/fail.png'
    }
    wx.showToast({
        title,
        icon,
        image,
        duration
      })
}
