var OUT = {};
OUT.userInfo = {};
var actId = '532666';
var urlPathName = window.location.pathname;
var isDoing = false;
milo.ready(function () {
    // 页面，弹窗使用
    window.alert = function (msg, callback, callback1) {
        need("util.modalDialog", function (Dialog) {
            Dialog.alert(msg, {
                onConfirm: function () {
                    typeof callback == "function" ? callback() : console.log("no callback")
                },
                onClose: function () {
                    typeof callback1 == "function" ? callback1() : console.log("no callback1")
                }
            });
        })
    };
    window.confirm = function (msg, callback, callback1, callback2) {
        need("util.modalDialog", function (Dialog) {
            Dialog.confirm(msg, {
                onConfirm: function () {
                    typeof callback == "function" ? callback() : console.log("no callback")
                },
                onCancel: function () {
                    typeof callback1 == "function" ? callback1() : console.log("no callback1")
                }
            });
        })
    };
});
OUT.site = {
    urlPathName: urlPathName.substring(urlPathName.lastIndexOf('/') + 1, urlPathName.length),
    shareUrl: 'https://act.daoju.qq.com/cp/a20230201qnlan/index.html',
};
OUT.login = {
    logoutFun: function () {
        Milo.logout({
            // 退出回调
            callback: function () {
                location.reload();
            }
        });
    },
    qqlogin: function () {
        if (Milo.isMobile()) {
            Milo.mobileLoginByQQ();
        } else {
            Milo.loginByQQ();
        }
        closeDialog();
    }
};
function loginOut() {
    OUT.login.logoutFun();
}
$('#tunlogin a').attr('href', 'javascript:OUT.login.qqlogin()');
OUT.Role = {
    isBind: false,
    // 提交绑定大区
    bindArea: function () {
        flowFun('7357c7', {}, function (res) {
            var roleInfo = res.details.jData.bindarea;
            if(roleInfo){
                location.reload();
            }
        }, 'fail', false);
    },
    // 查询绑定大区
    queryBindArea: function () {
        flowFun('a27c5b', {sData:{query: true}}, function (res) {
            console.log('查询绑定大区=======》',res)
            isDoing = false;
            if(res.data){
                OUT.Role.isBind = true;
                $("#spanNotBind").hide();
                $("#spanBind").show();
                OUT.userInfo = res.data;
                $("#area_info").text(decodeURIComponent(res.details.jData.bindarea.FareaName));
                try{
                    $("#role_info").text(decodeURIComponent(res.details.jData.bindarea.FroleName));
                }catch (error){
                    $("#role_info").text(res.details.jData.bindarea.FroleName);
                }
            }
        }, 'fail', false);
    }
};

OUT.user = {
    share: {
        title: '',
        desc: '',
        link: OUT.site.shareUrl,
        imgUrl: '',
    },
    initStatus: function () {
        //检查是否登录
        Milo.checkLogin({
            iUseQQConnect: false, //如果当前活动使用的互联登录,请将改参数设置true
            success: function (user) {
                console.log(user);

                var userInfo = user && user.userInfo;
                $("#logined,#tlogined").show();
                $("#unlogin,#tunlogin").hide();
                $("#login_qq_span,#tlogin_qq_span,#userinfo").text(userInfo.userUin);
                OUT.Role.queryBindArea();
                OUT.user.init();
            },
            fail: function (res) {
                if (!isDJCApp()) {
                    OUT.login.qqlogin();
                }
            }
        });
    },
    lotteryPoint: 0,// 抽奖钥匙
    exchangePoint: 0,// 积分
    exchangeConf: 0,// 兑换配置
    tmp: [],
    teamBoxQual: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0},
    teamStatus: 999,
    init: function () {
        flowFun('0fdeeb', {}, function (res) {
            isDoing = false;
            OUT.user.exchangeConf = res.details.jData.exchangeData;
            OUT.user.tmp = res.details.jData.tmp;
            // 抽奖钥匙
            OUT.user.lotteryPoint = parseInt(res.details.jData.pointData[1953]['ticket']);
            $('.lotteryPoint').text(OUT.user.lotteryPoint);
            // 积分
            OUT.user.exchangePoint = parseInt(res.details.jData.pointData[1947]['ticket']);
            $('.exchangePoint').text(OUT.user.exchangePoint);


            if (typeof(res.details.jData.dbTeamData['status']) != 'undefined') {
                OUT.user.teamStatus = res.details.jData.dbTeamData['status'];
                if (res.details.jData.dbTeamData['status'] == 0) {
                    $('.teamStatus').text('待开团');
                    $('.teamTime').html('等待开团：<span></span>');

                    var teamDate = parseInt(new Date(res.details.jData.dbTeamData.cTime.replace(/-/g, "/")).getTime() / 1000) + 10800;
                    var nowDate = parseInt(new Date().getTime() / 1000);
                    if (isStart == 0) {
                        isStart = 1;
                        TimeDown(teamDate - nowDate);
                    }
                    $('.myTeamId').val(res.details.jData.myTeamId);
                    $('.teamGift').text('');
                } else if (res.details.jData.dbTeamData['status'] == 1) {
                    isStart = 0;
                    $('.teamStatus').text('已开团');
                    $('.teamTime').text('开团成功');
                    $('.myTeamId').val(res.details.jData.myTeamId);
                    $('.teamGift').text(res.details.jData.myTeamGift);
                } else {
                    isStart = 0;
                    $('.teamStatus').text('未开团');
                    $('.teamTime').html('等待开团：<span></span>');
                    $('.myTeamId').val('');
                    $('.teamGift').text('');
                }
            } else {
                $('.myTeamId').val('');
                $('.teamGift').text('');
            }

            // 我的团
            var html = '';
            if (typeof(res.details.jData.dbTeamData['status']) != 'undefined' && res.details.jData.dbTeamData['status'] != 2) {
                for (var i = 1; i <= 6; i++) {
                    if (typeof(res.details.jData.dbTeamData['openid' + i]) != 'undefined' && res.details.jData.dbTeamData['openid' + i] != '0') {
                        html += '<tr><td>' + res.details.jData.dbTeamData['openid' + i] + '</td>';
                        html += '<td>' + res.details.jData.dbTeamData['roleName' + i] + '</td>';
                        if (res.details.jData.dbTeamData['sPackageName' + i] == 0) {
                            html += '<td></td></tr>';
                        } else {
                            html += '<td>' + res.details.jData.dbTeamData['sPackageName' + i] + '</td></tr>';
                        }
                    }
                }
            }
            $('.boxtable').html(html);

            // 团队ID
            // if (typeof(res.details.jData.teamId[0]) != 'undefined' && res.details.jData.teamId[0]['teamId'] != 0) {
            //     $('#teamId').val(res.details.jData.teamId[0]['teamId']);
            // } else {
            //     $('#teamId').val('');
            // }
            // 代金券
            OUT.user.getJfNum();
            OUT.user.getSupporTeam();
        });
    },

    // 查询礼包记录
    pageNow: 1,
    pageTotal: 1,
    getLotteryInfo: function (page, isOpen) {
        flowFun('4c2cf9', {sData:{page: page, type: 1}}, function (res) {
            isDoing = false;
            var data = res.details.jData.datas.myGiftList;
            var htmlData = '';
            for (var key = 0; key < data.length; key++) {
                htmlData += '<tr>';
                htmlData += '<td>' + data[key]['dtGetPackageTime'] +'</td>';
                htmlData += '<td>' + data[key]['sAreaName'] +'</td>';
                htmlData += '<td>' + data[key]['sPackageName'] +'</td>';
                htmlData += '</tr>';
            }

            $('#getGiftContent_all').html(htmlData);
            OUT.user.pageNow = page;
            OUT.user.pageTotal = Math.ceil(res.details.jData.datas.result.nTotalInALL / 8);
            OUT.user.pageTotal = OUT.user.pageTotal > 0 ? OUT.user.pageTotal : 1;
            $('.pageNow').text(OUT.user.pageNow)
            $('.pageTotal').text(OUT.user.pageTotal)
            // $('.pageNum').text(OUT.user.pageNow + '/' + OUT.user.pageTotal)
            if (isOpen == 1) {
                TGDialogS('pop7');
            }
        });
    },
    lastPage: function () {
        if (OUT.user.pageNow == 1) {
            return;
        }
        OUT.user.getLotteryInfo(OUT.user.pageNow - 1, 2);
    },
    nextPage: function () {
        if (OUT.user.pageNow == OUT.user.pageTotal) {
            return;
        }
        OUT.user.getLotteryInfo(parseInt(OUT.user.pageNow) + 1, 2);
    },

    // 查询拼团记录
    pageNow3: 1,
    pageTotal3: 1,
    getLotteryInfo3: function (page, isOpen) {
        flowFun('4c2cf9', {sData:{page: page, type: 3}}, function (res) {
            isDoing = false;
            var data = res.details.jData.datas.myGiftList;
            var htmlData = '';
            var tmp = '';
            for (var key = 0; key < data.length; key++) {
                tmp = data[key]['sExtend4'].split('_');
                htmlData += '<tr>';
                htmlData += '<td>' + decodeURIComponent(tmp[1]) +'</td>';
                htmlData += '<td>' + tmp[0] +'</td>';
                htmlData += '<td>' + data[key]['sPackageName'] +'</td>';
                htmlData += '</tr>';
            }

            $('#getGiftContent_all2').html(htmlData);
            OUT.user.pageNow3 = page;
            OUT.user.pageTotal3 = Math.ceil(res.details.jData.datas.result.nTotalInALL / 8);
            OUT.user.pageTotal3 = OUT.user.pageTotal3 > 0 ? OUT.user.pageTotal3 : 1;
            $('.pageNow3').text(OUT.user.pageNow3)
            $('.pageTotal3').text(OUT.user.pageTotal3)
            // $('.pageNum').text(OUT.user.pageNow + '/' + OUT.user.pageTotal)
            if (isOpen == 1) {
                TGDialogS('pop8');
            }
        });
    },
    lastPage3: function () {
        if (OUT.user.pageNow == 1) {
            return;
        }
        OUT.user.getLotteryInfo(OUT.user.pageNow - 1, 2);
    },
    nextPage3: function () {
        if (OUT.user.pageNow == OUT.user.pageTotal) {
            return;
        }
        OUT.user.getLotteryInfo(parseInt(OUT.user.pageNow) + 1, 2);
    },


    pageNow2: 1,
    pageTotal2: 1,
    temporary: function (page, isOpen) {
        flowFun('4c2cf9', {sData:{page: page, type: 2}}, function (res) {
            isDoing = false;
            var data = res.details.jData.datas.myGiftList;
            var html = '';
            if (!$.isEmptyObject(data)) {
                $.each(data, function (i, v) {

                    html += '<tr>'
                    html += '<td>' + v.sPackageName + '</td>'
                    if (parseInt(v.iStatus) == 3) {
                        html += '<td><a href="javascript:OUT.user.tmpDeliverGoods(2, ' + v.id + ', ' + v.iPackageId + ', \'' + v.sPackageName + '\');">' + '领取' + '</a></td>'
                        html += '<td><a href="javascript:OUT.user.tmpDeliverGoods(1, ' + v.id + ', ' + v.iPackageId + ', \'' + v.sPackageName + '\');">' + '分解' + '</a></td>'
                    } else if (parseInt(v.sExtend2) == 2) {
                        html += '<td>已领取</td>'
                        html += '<td></td>'
                    } else if (parseInt(v.sExtend2) == 3) {
                        html += '<td></td>'
                        html += '<td>已分解</td>'
                    }

                    html += '</tr>'
                });
                $('#getGiftContent').empty().append(html);
            }

            OUT.user.pageNow2 = page;
            OUT.user.pageTotal2 = Math.ceil(res.details.jData.datas.result.nTotalInALL / 8);
            OUT.user.pageTotal2 = OUT.user.pageTotal2 > 0 ? OUT.user.pageTotal2 : 1;
            $('.pageNumNow2').text(OUT.user.pageNow2)
            $('.pageNumTotal2').text(OUT.user.pageTotal2)
            // $('#pageNum2').text(OUT.user.pageNow2 + '/' + OUT.user.pageTotal2)
            if (isOpen == 1) {
                TGDialogS('pop1');
            }
        });
    },
    lastPage2: function () {
        if (OUT.user.pageNow2 == 1) {
            return;
        }
        OUT.user.temporary(OUT.user.pageNow2 - 1, 2);
    },
    nextPage2: function () {
        if (OUT.user.pageNow2 == OUT.user.pageTotal2) {
            return;
        }
        OUT.user.temporary(parseInt(OUT.user.pageNow2) + 1, 2);
    },
    tmpDeliverGoods: function (type, iId, iPackageId, sPackageName) {
        var content;
        if (type == 1) {
            content = '确认分解道具 ' + sPackageName + ' 吗？分解后您将获得' + OUT.user.tmp[iPackageId] + '个钥匙';
        } else {
            content = '确认领取道具 ' + sPackageName + ' 到游戏仓库吗？（当前领取的大区是：' + decodeURIComponent(OUT.userInfo.areaName) + '）(唯一性道具和角色不可重复到账)';
        }
        confirm(content, function(){
            flowFun('419da3', {sData:{'type': type, 'iId': iId, 'iPackageId': iPackageId}}, function (res) {
                isDoing = false;
                alert(res.sMsg, function () {
                    OUT.user.temporary(OUT.user.pageNow2, 2);
                });
                OUT.user.init();
            });
        })
    },

    // 抽奖
    doLottery: function (from, type) {
        flowFun('6929f9', {sData:{'from': from, 'type': type}}, function (res) {
            isDoing = false;
            if (type != 1) {
                var html = '';
                $(res.details.jData.data).each(function(k, v){
                    html += '<p>' + v + '</p>';
                });
                $('#pop3 .zj_info').html(html);
                TGDialogS('pop3');
            } else {
                $('#pop4 .pop_list p').text(res.details.jData.data.giftName);
                TGDialogS('pop4');
            }
            OUT.user.init();
        });
    },
    // 支付购买
    pay: function (type, jifen_dikou) {
        flowFun('7b01c2', {
                sData:{
                    type: type,
                    paytype: 2,
                    jifen_amount: 0,
                    jifen_dikou: jifen_dikou,
                    gameId: 'cf',
                    djcActId: '28009',
                },
                onPayClose: function() {
                    isDoing = false;
                }
            },
            function (res) {
                isDoing = false;
                alert(res.sMsg, function () {
                    OUT.user.init();
                });
            }
        );
    },

    // 积分兑换道具
    exchange: function (type) {
        if (typeof(OUT.user.exchangeConf[type]) == 'undefined') {
            OUT.login.qqlogin();
            return;
        }
        confirm("是否使用 " + OUT.user.exchangeConf[type]['point'] + ' 个积分兑换道具 ' + OUT.user.exchangeConf[type]['giftName'] + '(唯一性道具和角色不可重复到账)', function(){
            flowFun('291fd0', {sData:{'type': type}}, function (res) {
                isDoing = false;
                alert(res.sMsg, function () {
                    OUT.user.init();
                });
            });
        });
    },

    // 创建团队
    buildTeam: function () {
        // flowFun('8d727f', {}, function (res) {
        flowFun('f0a29e', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    // 加入团队
    joinTeam: function (teamId) {
        if (typeof(teamId) == 'undefined') {
            teamId = $('#joinTeamId').val();
        }
        if (teamId == '') {
            alert('团队ID不能为空');
            return;
        }
        flowFun('b6ea83', {sData:{'teamId': teamId}}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    // 成为推荐团
    beSupporTeam: function () {
        flowFun('56bcea', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    isDoSuppor: false,
    // 查询推荐团
    getSupporTeam: function () {
        flowFun('9291a7', {}, function (res) {
            isDoing = false;
            OUT.user.isDoSuppor = true;
            var teamHtml = '';
            $('.listtdjoin').html('')
            $(res.details.jData.data).each(function (k, v) {
                teamHtml += '<li>';
                teamHtml += '<p>' + v['teamId'] + '</p>';
                teamHtml += '<a href="javascript:OUT.user.joinTeam(\'' + v['teamId'] + '\');" class="btnjoina">加入</a>';
                // teamHtml += '<td>' + v['totalPoint'] + '</td>';
                teamHtml += '</li>';
                // setTimeout(function () {
                //     $('.supporTeam').append('<tr><td>' + v['teamId'] + '</td><td>' + v['totalPoint'] + '</td><td><a href="javascript:OUT.user.joinTeam(\'' + v['teamId'] + '\')" class="btnsqrt sp db" onclick="PTTSendClick(\'btn\',\'btnsqrt2\',\'申请入团\');">加入</a></td></tr>')
                // }, 500 * k)
            });
            $('.listtdjoin').html(teamHtml)
        }, 'fail', false);
    },

    // 领取拼团奖励
    getTeamGift: function () {
        flowFun('df1903', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },


    getJfNum: function () {
        //根据不同的登录态设置不同的参数
        var jf_param = {
            acctid: 'A100007',
            id: 2327,
            _output_format: 'oResult'
        };
        if (milo.cookie.get("acctype") == 'qc') {
            jf_param['acctype'] = milo.cookie.get("acctype");
            jf_param['openid'] = milo.cookie.get("openid");
            jf_param['access_token'] = milo.cookie.get("access_token");
            jf_param['appid'] = milo.cookie.get("appid");
            jf_param['openid_to_uin'] = 1;
        }
        milo.loader.loadScript(
            "//apps.game.qq.com/daoju/swoole/api/query_cloud_ticket?c=Querycloudticket&a=query_protal&" + $.param(jf_param),
            function () {
                if (oResult.ret != 0) {
                    alert(oResult.msg);
                } else {
                    $(".voucher").text(oResult.balance[2327]);
                }
            }
        )
    },

    initAwardList: function () {
        //正式地址: https://gameact.qq.com/ams/lottery/v2.0/17/456873_broadcast.js
        //测试地址: http://gameact.qq.com/ams/lottery/v2.0/88/317288_broadcast.js
        milo.loader.loadScript('https://gameact.qq.com/ams/lottery/v2.0/81/531681_broadcast.js',
        //     milo.loader.loadScript('https://gameact.qq.com/ams/lottery/v2.0/31/520431_broadcast.js',
            function (edata) {
                console.log("加载");
                // console.log(Broadcast_524189);
                // if (typeof (Broadcast_520431) != 'undefined') {
                if (typeof (Broadcast_531681) != 'undefined') {
                    var htmlStr = '';
                    $.each(Broadcast_531681, function (i, v) {
                    // $.each(Broadcast_520431, function (i, v) {
                        htmlStr += '<li>' + '恭喜玩家';
                        htmlStr += '<span>' + v.iUin + '</span>' + '获得了';
                        htmlStr += '<span>' + v.sPackageName + ' </span>';
                        htmlStr += '</li>';
                    })
                    $('.list_txt').html(htmlStr);
                    //名单滚动
                    xyListRollInit1();
                }
            }
        );
    },
    // 领取额外抽奖券
    getPrivilegeGift: function () {
        flowFun('be5ef1', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
};


OUT.user.initStatus();
OUT.user.initAwardList();


// before , other, sData
function flowFun(token, datas, success, fail, lock) {
    if (typeof(lock) == 'undefined') {
        lock = true;
    }
    if (lock == true) {
        if (isDoing == true) {
            return;
        }
        isDoing = true;
    }

    if (typeof(success) == 'undefined') {
        success = function (res) {
            isDoing = false;
            alert(res.sMsg);
        }
    }
    if (typeof(fail) == 'undefined' || fail == 'fail') {
        fail = function (res) {
            if(res.iRet === 101 || res.iRet === '101'){
                OUT.login.qqlogin();
            } else if (res.iRet === '-9999' || res.iRet === -9999) {
                OUT.login.logoutFun();
            } else if (res.iRet === 99998 || res.iRet === '99998') {
                OUT.Role.bindArea();
            } else {
                alert(res.sMsg);
            }
            isDoing = false;
            console.log('=====>fail',token, res);
            console.log('=====>fail sMsg', res.sMsg);
        };
    }
    var flowParams = {
        actId: actId,
        token: token,
        loading: true, // 开启loading浮层,默认不开启
        success: success,
        fail: fail
    };
    if (typeof(datas) == 'object') {
        flowParams = $.extend({}, flowParams, datas);
    }
    Milo.emit(flowParams);
}

function xyListRollInit1() {
    $('.list_get').each(function () {
        var ul = $(this).find('ul'),
            li = ul.find('li'),
            h = parseInt(li.height()),
            t = 0,
            tm = setInterval(function () {
                t -= 0.8 * $(window).width() / 1920;
                if (-t > h * Math.ceil(li.length)) t = 0;
                ul.css({
                    marginTop: t + 'px'
                })

            }, 20);
        if (li.length <= 8) {
            clearInterval(tm);
            return;
        }
        ul.append(li.clone());
    });
}

if(isDJCApp()){
    $('.btndownget').show();
}
function isDJCApp() {
    if(milo.cookie.get("djc_appSource") || milo.cookie.get("djc_appVersion")){
        return 1;
    } else {
        return 0;
    }
}

function isZHApp() {
    if ((new RegExp('cfapp').test(navigator.userAgent)) || /GameHelper/.test(navigator.userAgent)) {
        return 1;
    } else {
        return 0;
    }
}
if (isZHApp() || isDJCApp() || Milo.isQQApp()) {
    $('#ptLogoutBtn').hide();
}


// var opts = {
//     wx_appid : 'wxf8773b4d31a9a719', //微信公众号appid
//     title: OUT.user.share.title,// 分享标题，默认为活动页面标题（可手动调整）
//     desc: OUT.user.share.desc, //分享活动简介
//     link: OUT.user.share.link, //分享链接
//     imgUrl: OUT.user.share.imgUrl, //分享后朋友看到的图标
//     /*微信分享回调【不需要可不写】*/
//     WXtrigger: function (res) { //微信点击事件回调
//         // alert("微信点击回调\n"+JSON.stringify(res));
//     },
//     WXsuccess: function (res) { //微信分享成功回调
//         // alert("微信分享成功回调\n"+JSON.stringify(res));
//     },
//     WXcancel: function (res) { //微信分享取消回调
//         // alert("微信分享取消回调\n"+JSON.stringify(res));
//     },
//     WXfail: function (res) { //微信分享失败回调
//         // alert("微信分享失败回调\n"+JSON.stringify(res));
//     },
//
//     QQcallback:function(res){//qq成功、失败、或取消的回调
//         // alert("QQ分享之后回调回调\n"+JSON.stringify(res));
//     },
//     QQtrigger:function(res){//qq触发事件的回调
//         // alert("QQ分享触发回调\n"+JSON.stringify(res));
//     },
//
//     qqBrowserCallback: function(data){
//         //data.code == 1 表示能分享
//         //data.code ==-1 表示不能分享
//         //data.code == 0 表示未知
//         // alert("QQ浏览器分享触发回调\n"+JSON.stringify(data));
//     }
// };
// Milo.mobileShare.initShareAll(opts) //


function getinput() {
    var res = document.getElementById("myTeamId")

    if (res.value == '') {
        alert('团队ID不能为空')
    } else {
        res.select();
        document.execCommand("copy");
        alert('复制成功');
    }
}

// 建团时间倒计时
var isStart = 0;
function TimeDown(value) {
    if (value < 0) {
        value = 0;
    }
    //倒计时的总秒数
    var totalSeconds = parseInt(value);

    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;

    hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    //输出到页面
    $('.teamTime span').text( hours + ":" + minutes + ":" + seconds);
    //延迟一秒执行自己
    if((hours == "00" && minutes == "00" && parseInt(seconds)-1<0) || OUT.user.teamStatus == 1 || OUT.user.teamStatus == 2){

    }else{
        setTimeout(function () {
            TimeDown(value-1);
        }, 1000)
    }

}