isParams = {
    //暂存箱分解钥匙数
    'chouGoods': {
        3810026: [15],//QBZ03金色蔷薇-冠军之薇皮肤
        3810028: [12],//柯尔特-冠军之特
        3810036: [6],//火麒麟-冠军之心皮肤
        3810038: [6],//毁灭-冠军之怒皮肤
        3810041: [6],//雷神-冠军之魄皮肤
        3810042: [3],//修罗-冠军之魂皮肤
        3810043: [8],//黄金猫猫手套-白鲨
        3810051: [8],//擎天-惨叫迹
        3810052: [6],//绝迹语音包兑换券
        3853704: [6],//N9语音包兑换券
        3853705: [6],//70KG语音包兑换券
        3853706: [6]//白鲨语音包兑换券
    },
    /*
     兑换道具
     */
    'exchangeGoods': {
        '1': ['Knife-冠军之刃', 4800],
        '2': ['QBZ03-冠军之薇皮肤', 4800],
        '3': ['柯尔特-冠军之特', 3600],
        '4': ['火麒麟-冠军之心皮肤', 2000],
        '5': ['毁灭-冠军之怒皮肤', 2000],
        '6': ['雷神-冠军之魄皮肤', 2000],
        '7': ['修罗-冠军之魂皮肤', 1200],
        '8': ['黄金猫猫手套-白鲨', 2400],
        '9': ['擎天-惨叫迹', 2400],
        '10': ['绝迹语音包兑换券', 2400],
        '11': ['N9语音包兑换券', 2400],
        '12': ['70KG语音包兑换券', 2400],
        '13': ['白鲨语音包兑换券', 2400],
        '14': ['职业选手', 900],
    },
    'selectBagGoods': {
        '1': ['EP战队炫彩背包'],
        '2': ['BS战队炫彩背包'],
        '3': ['Q9战队炫彩背包'],
        '4': ['AG战队炫彩背包'],
        '5': ['KZ战队炫彩背包'],
        '6': ['EDG炫彩背包'],
        '7': ['WE炫彩背包'],
        '8': ['eStar炫彩背包'],
        '9': ['XROCK炫彩背包'],
        '10': ['R.LGD炫彩背包'],
    },
    // 2,3,5,4,9,7,8,6,1,10
    //大区信息
    bindinfo: '',
    //是否开卡
    lock: false,
    //等级
    'level': 0,
    //免费线已领取积分数量
    'holdnum1': 0,
    //付费线已领取积分数量
    'holdnum2': 0,
    //一键领取的list
    list: [],
    //积分
    jfnum: [],

    lockCj: false,
}
//======================= login =======================================================
milo.ready(function () {
    isH5 = location.hostname == "app.daoju.qq.com" ? true : false;
    isNei = milo.request('neiqian') != '' ? true : false;

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
                },
                onClose: function () {
                    typeof callback1 == "function" ? callback2() : console.log("no callback2")
                }
            });
        })
    };

    //检查是否登录
    Milo.checkLogin({
        iUseQQConnect: false, //如果当前活动使用的互联登录,请将改参数设置true
        success: function (user) {
            console.log('已登录：');
            console.log(user);
            $('#unlogin').hide();
            $('#logined').show();
            $("#userinfo").text(user.userInfo.userUin);
            //查询绑定
            queryBindArea();
        },
        fail: function (res) {
            console.log('未登录：', res);
            toLogin()
        }
    });

    $("#dologin").on("click", function () {
        toLogin()
    });
    $("#dologout").on("click", function () {
        Milo.logout({
            callback: function () {
                location.reload();
            }
        });
    });

    // 支付上报
    // if (isH5) {
    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init('cf', 27973, function (final_appid) {
            //特权
            if (final_appid == 1101) {
                $(".bot-nav").show()
            }
            //final_appid为自动判断得到的道聚城渠道号
            //本段代码内自动进行道聚城全流程数据的收集，必须保留并放到milo.ready内，除非自行在页面上进行基于道聚城活动号的eas曝光上报
        });
    });
    // }

    //轮播
    queryBroadcast()
    //初始化渲染通行证
    bpInit()
    //初始化dom节点数据
    initDom()
});

function initDom() {
    //掌火任务
    if (isZhApp()) {
        $('#dologout').css('display', 'none');
        $('.task4.btn-receive1').css('display', 'inline-block');
        $('.task4.task_text').css('display', 'none');
    } else {
        $('.task4.btn-receive1').css('display', 'none');
        $('.task4.task_text').css('display', 'inline-block');
    }

    //道聚城任务
    if (isDjcApp()) {
        $('#dologout').css('display', 'none');
        $('.task5.task_text').css('display', 'none');
        $('.task5.btn-receive1').css('display', 'inline-block');
    } else {
        $('.task5.task_text').css('display', 'inline-block');
        $('.task5.btn-receive1').css('display', 'none');
    }
}

//登录
function toLogin() {
    if (Milo.isMobile()) {
        Milo.mobileLoginByQQ();
    } else {
        Milo.loginByQQ();
    }
}

// 查询绑定大区
function queryBindArea() {
    var flow_query = {
        actId: '531996',
        token: '790d3b',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            query: true
        },
        success: function (res) {
            if (res.data) {
                isParams.bindinfo = {
                    sArea: res.data.area,
                    sPartition: res.data.partition,
                    sPlatId: res.data.platId,
                    sRole: res.data.roleId,
                    sAreaName: decodeURIComponent(res.data.areaName),
                    roleName: decodeURIComponent(res.data.roleName)
                };

                milo.cookie.set("jc_zone", isParams.bindinfo.sArea, '', '', "/");

                $("#userinfo").text(res.data.roleId);
                $('#spanNotBind').hide();
                $('#spanBind').show();
                $('#area_info').text(res.data.areaName);
                $('#role_info').text(res.data.roleName);

                enter(1);
            } else {
                commitBindArea()
            }
        },
        fail: function (res) {
            commitBindArea()
        },
    };
    Milo.emit(flow_query);
}

// 提交绑定大区
function commitBindArea() {
    var flow_commit = {
        actId: '531996',
        token: 'c3f904',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            query: false
        },
        success: function (res) {
            //已绑定时的扩展处理
            location.reload();
        },
        fail: function (res) {
            commitBindArea();
        }
    };
    Milo.emit(flow_commit);
}

//轮播
function queryBroadcast() {
    var flow = {
        actId: '531996',
        token: '365195',
        // loading: true, // 开启loading浮层,默认不开启
        time: 50, // 轮播时间
        sData: {
            // query: false
        },
        success: function (res) {
            console.log('查询轮播success', res);
        },
        fail: function (res) {
            console.log('查询轮播fail', res);
        }
    }
    Milo.emit(flow);
}

//======================= 绑定 end ==========================================================

//======================= 查询 start ==========================================================
// 查询积分
function enter(a) {
    setTimeout(function () {
        //刷新积分操作
        Milo.emit(flow_924671);
    }, a || 2000);
}

var flow_924671 = {
    actId: '531996',
    token: 'f9d31b',
    loading: false, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        //积分值处理
        var modRet = res.details.modRet;
        //1.积分值直接展示
        isParams.jfnum = modRet.sOutValue1.split(',');
        $('.jf_2327').html(isParams.jfnum[0])
        $('.jf_5430').html(isParams.jfnum[1])
        //2.等级
        var experience = isParams.jfnum[2]
        // if (experience > 100000) {
        //     experience = 100000
        // }
        isParams.level = Math.floor(experience / 100);//经验值
        $('.level').html(isParams.level)
        // if(experience === 100000){
        //     $('.progress_width').css('width', 100 + '%')//进度条
        //     $('.progress_num').html(100)//进度条
        // }else{
            $('.progress_width').css('width', (experience % 100) + '%')//进度条
            $('.progress_num').html(experience % 100)//进度条
        // }
        //开卡
        isParams.lock = false
        if (isParams.jfnum[3] > 0) {
            isParams.lock = 1
        }
        //已领取标识
        //免费已领取
        isParams.holdnum1 = parseInt(isParams.jfnum[4]);
        //付费已领取
        isParams.holdnum2 = parseInt(isParams.jfnum[5]);
        //徽章令
        $('.jf_3782').text(isParams.jfnum[6])

        //3.徽章令兑换已领取
        var hold_hzl_num = modRet.sOutValue2.split(',');
        $('.hzldh').removeClass('gray')
        $.each(hold_hzl_num, function (k, v) {
            if (v >= 1) {
                $(".hzldh.hzldh" + (parseInt(k) + 1)).addClass("gray");
            }
        });
        if (hold_hzl_num[9] > 0 && hold_hzl_num[10] > 0 && hold_hzl_num[11] > 0 && hold_hzl_num[12] > 0) {
            $(".hzldhselect4").addClass("gray");
        }
        //4.累计冠军领取
        var hold_sum_num = modRet.sOutValue3.split(',');
        $('.ljdh').removeClass('gray')
        $.each(hold_sum_num, function (k, v) {
            if (v >= 1) {
                $(".ljdh.ljdh" + (parseInt(k) + 1)).addClass("gray");
            }
        });
        //5.累计冠军的炫彩10选1
        $('.ljdhselect10').removeClass("gray")
        if (modRet.sOutValue4 >= 1) {
            $('.ljdhselect10').addClass("gray")
        }
        //6.5个任务
        var hold_task_num = modRet.sOutValue5.split(',');
        $('.task').removeClass('gray')
        $.each(hold_task_num, function (k, v) {
            if (v >= 1) {
                $(".task.task" + (parseInt(k) + 1)).addClass("gray");
            }
        });

        //7.modRet.sOutValue7
        $('.chou_sum').html(modRet.sOutValue7);

        //8
        isParams.lockCj = false
        //渲染页面
        rander_bp();

        return;
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg);
        })
    }
}
//======================= 查询 end ==========================================================
//======================= 购买 start ==========================================================
function amsBuy(item) {
    var flow_924674 = {
        actId: '531996',
        token: 'a4af4d',
        loading: true,
        sData: {
            // propid: "", // 礼包id
            // buyNum: "", // 购买数量（不填则为1）
            item: item,
            gameId: "cf", // 业务简称
            // jifen_dikou: 0, // 是否使用积分抵扣1是 0否
            // jifen_amount: 0, // 用户传入的积分抵扣数量
            djcActId: 27973, // 道聚城活动id
            paytype: 2, // 1：点券 2：人民币 3：金币 4：点券+金币 5：金币2
        },
        // 支付弹框关闭回调
        onPayClose: function () {
        },
        success: function (res) {
            console.log(res);
            enter(2000)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }
    Milo.emit(flow_924674);
}

// 代金劵折扣购买
function amsBuyDi() {
    var flow_924675 = {
        actId: '531996',
        token: '34628f',
        loading: true,
        sData: {
            // propid: "", // 礼包id
            // buyNum: "", // 购买数量（不填则为1）
            gameId: "cf", // 业务简称
            // jifen_dikou: 0, // 是否使用积分抵扣1是 0否
            // jifen_amount: 0, // 用户传入的积分抵扣数量
            djcActId: 27973, // 道聚城活动id
            paytype: 2, // 1：点券 2：人民币 3：金币 4：点券+金币 5：金币2
        },
        // 支付弹框关闭回调
        onPayClose: function () {
            enter(2000);
        },
        success: function (res) {
            console.log(res);
            enter(2000)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }
    Milo.emit(flow_924675);
}

// 开卡
function amsBuyLock() {
    var flow_925649 = {
        actId: '531996',
        token: '5a9908',
        loading: true,
        sData: {
            // propid: "", // 礼包id
            // buyNum: "", // 购买数量（不填则为1）
            gameId: "cf", // 业务简称
            // jifen_dikou: 0, // 是否使用积分抵扣1是 0否
            // jifen_amount: 0, // 用户传入的积分抵扣数量
            djcActId: 27973, // 道聚城活动id
            paytype: 2, // 1：点券 2：人民币 3：金币 4：点券+金币 5：金币2
        },
        // 支付弹框关闭回调
        onPayClose: function () {
        },
        success: function (res) {
            console.log(res);
            enter(2000)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg);
            })
        }
    }
    Milo.emit(flow_925649);
}

//======================= 购买 end ==========================================================
//======================= 抽奖 start ==========================================================
//普通抽奖
function amsChou(item) {
    var flow_924658 = {
        actId: '531996',
        token: '562824',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet

            if (item == 1) {
                $('#jlname').html('');
                $('#jlname').html(callbackObj.sPackageName)
                TGDialogS('popdc');
            } else {
                var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
                $('#choulist').html('');
                $.each(obj, function (k, v) {
                    $('#choulist').append('<li>' + v.name + '</li>');
                })
                TGDialogS('popJl');
            }
            isParams.lockCj = false
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg, function () {
                    isParams.lockCj = false
                });
            })
        }
    }

    if (typeof (isParams.bindinfo.sAreaName) != 'undefined' && isParams.bindinfo.sAreaName !== '') {
        if (!isParams.lockCj) {
            isParams.lockCj = true
            Milo.emit(flow_924658);
        }
    } else {
        commitBindArea()
    }
}

// 【暂存箱】领取
function amsZanQu(item, name) {
    var flow_924661 = {
        actId: '531996',
        token: '46480a',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            alert(res.sMsg);
            amsHistoryList(2, isParams.pageNow)
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    var msg = "确定领取 " + name + " 到【" + isParams.bindinfo.sAreaName + "】吗？【唯一性道具在同一大区内，游戏仓库无法重复到账，请谨慎选择】";
    confirm(msg, function () {
        Milo.emit(flow_924661);
    });
}

// 【暂存箱】分解钥匙
function amsZanFen(item, name, key) {
    var flow_924662 = {
        actId: '531996',
        token: '882f03',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            var msg = callbackObj.sMsg + '*' + callbackObj.iPackageNum;
            alert(msg, function () {
                amsHistoryList(2, isParams.pageNow)
                enter(2000);
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    confirm("确定分解 " + name + " 获得 " + key + " 钥匙吗？", function () {
        Milo.emit(flow_924662);
    });
}

//个人积分兑换道具
function amsExchange(item) {
    var flow_924663 = {
        actId: '531996',
        token: '2be160',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            alert(callbackObj.sMsg, function () {
                enter(2000);
                $("#djbp_jc").attr('src', $('#djbp_jc').attr('src'))
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    //'1': ['雷神-杨戬皮肤（永久）', 1800],
    var msg = "确定使用 " + isParams.exchangeGoods[item][1] + " 个徽章令兑换 " + isParams.exchangeGoods[item][0] + " 吗？当前大区【" + isParams.bindinfo.sAreaName + "】【唯一性道具或角色在同一大区内，游戏仓库无法重复到账，请谨慎选择】";
    confirm(msg, function () {
        Milo.emit(flow_924663);
    });
}

//累计领取5个
function amsLqSum(item) {
    var flow_925208 = {
        actId: '531996',
        token: 'b05fc5',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            alert(callbackObj.sMsg, function () {
                enter(1500)
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow_925208);
}

//10炫彩背包选1
function amsSelectBag(item) {
    var flow_925401 = {
        actId: '531996',
        token: '1864b4',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            item: item
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            alert(callbackObj.sMsg, function () {
                enter(1500)
                closeDialog()
            });
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    var msg = "确定领取【" + isParams.selectBagGoods[item][0] + "】吗？当前大区【" + isParams.bindinfo.sAreaName + "】【唯一性道具或角色在同一大区内，游戏仓库无法重复到账，请谨慎选择】";
    confirm(msg, function () {
        Milo.emit(flow_925401);
    });
}

// 特权
function amsTeQ() {
    if (isH5) {
        Milo.emit(flow_924664);
    }
}

var flow_924664 = {
    actId: '531996',
    token: '89a45a',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}

//任务领取经验
function amsTask(item) {
    switch (item) {
        case 1:
            Milo.emit(flow_924665);
            break;
        case 2:
            Milo.emit(flow_924666);
            break;
        case 3:
            Milo.emit(flow_924678);
            break;
        case 4:
            Milo.emit(flow_924679);
            break;
        case 5:
            Milo.emit(flow_925207);
            break;
    }
}

var flow_924665 = {
    actId: '531996',
    token: '77ce06',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}
var flow_924666 = {
    actId: '531996',
    token: 'd2bd73',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}
var flow_924678 = {
    actId: '531996',
    token: '499b9c',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}
var flow_924679 = {
    actId: '531996',
    token: '5f4d27',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}
var flow_925207 = {
    actId: '531996',
    token: '4f055f',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        alert(callbackObj.sMsg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}
//================================抽奖 end ===========================================

//======================= 记录 start ========================================================
// 个人获奖记录
function amsHistoryList(item, pageNow) {
    isParams.pageNow = pageNow;
    var flow = {
        actId: '531996',
        token: 'a5b4e0',
        loading: true, // 开启loading浮层,默认不开启
        sData: {},
        success: function (res) {
            //渲染数据
            $("#milo-lotteryRecordContainer" + item).html('');
            let tpl_html = $("#milo-lotteryRecordTpl" + item).html();
            // 渲染数据
            const _html = Milo.tpl().compile(tpl_html, res.data);
            $("#milo-lotteryRecordContainer" + item).html(_html);

            //如果查询第一页就没有数据
            $('#milo-paginator' + item).show()
            if (res.total == 0) {
                $('#milo-paginator' + item).hide()
            } else {
                // 分页初始化
                Milo.pagination({
                    pages: res.total, // 总页数
                    currentPage: flow.sData.pageNow, // 当前页
                    element: '#milo-paginator' + item, // 分页容器id，用于渲染分页控件
                    // 切换页数时触发回调
                    callback: function (page) {
                        if (page !== flow.sData.pageNow) {
                            amsHistoryList(item, page);
                        }
                    }
                });
            }

            //如果是查询的最后一页
            $("#milo-paginator" + item + " .my-page-next").show()
            if (res.total == flow.sData.pageNow) {
                $("#milo-paginator" + item + " .my-page-next").hide()
            }

            TGDialogS('showMyGiftContent' + item)
        },
        fail: function (res) {
            failShow(res)
        }
    }
    // 用于处理分页的变化
    if (pageNow) {
        flow.sData.pageNow = pageNow;
    } else {
        flow.sData.pageNow = 1;
    }
    //尺寸
    if (isH5) {
        if (item === 1) {
            flow.sData.pageSize = 5;
        } else {
            flow.sData.pageSize = 5;
        }
    } else {
        if (item === 1) {
            flow.sData.pageSize = 8;
        } else {
            flow.sData.pageSize = 5;
        }
    }
    flow.sData.item = item;

    Milo.emit(flow)
}

// 流程失败回调
function failShow(res, callback = '') {
    console.log(res)
    if (res.iRet === 101 || res.iRet === '101') {
        // 登录态失效，需要重新调登录方法
        toLogin()
    } else if (res.iRet === 99998 || res.iRet === '99998') {
// 调用提交绑定大区方法
        commitBindArea();
    } else {
        $.isFunction(callback) && callback(res);
    }
}

var _share = {
    title: "穿越火线CFPLS21赛事通行证",
    pic: "https://game.gtimg.cn/images/actdaoju/act/a20230203cfpl/pc/share.jpg",// 这里需要修改
    content: "参与穿越火线传说CFPLS21赛事通行证活动！",// 这里需要修改
    shareUrl: location.href,
};

// 初始化分享
function setShare() {
    setTimeout(function () {
        need("daoju.ui.share", function (share) {
            if (typeof ek != "undefined") {
                //是腾讯动漫
                ek.share.setShare({
                    title: _share.title,
                    img_url: _share.pic,
                    desc: _share.content,
                    link: _share.shareUrl,
                    callback: function () {
                        alert("分享成功！");
                    }
                });
            } else {
                //不是腾讯动漫
                share.setShare({
                    title: _share.title,
                    icon: _share.pic,
                    desc: _share.content,
                    link: _share.shareUrl
                });
            }
        });
    }, 500);
}

// 跳转到获取经验
// $(".btns .btn-get").click(function () {
//     var $loca = $(".dj3").offset().top
//     $('body,html').animate({
//         scrollTop: $loca
//     })
// })


//==================================== 通行证部分 start ============================================
//通行证渲染
function bpInit() {
    var loop_data = new Array(100);

    $.each(loop_data, function (k, v) {
        var level = k + 1;
        var value = get_level_value(level)
        loop_data[k] = value;
    })

    show_bp(loop_data)
}

var mySwiper = null

function show_bp(loop_data) {
    $('#bp_list').html('')
    var _html = '';
    loop_data.forEach(function (v, index) {
        _html += '<div class="swiper-slide" order="' + v.level + '"  bp_lv="' + v.level + '">\n';
        // if (isH5) {
        //     var img = "//game.gtimg.cn/images/appdaoju/act/a20230203cfpl/m";
        // } else {
        var img = "//game.gtimg.cn/images/actdaoju/act/a20230203cfpl/pc/";
        // }
        if (v.level <= 20) {
            _html += '<ul>\n' +
                '<li class="bp_list1">\n' +
                ' <p>' + v.level + '级</p>\n' +
                '<img src="' + img + v.img1 + '.png">\n' +
                // class: btnu on / btnu / btnu gray = 未解锁 / 可领取 / 已领取
                '<a href="javascript:get_free_award(' + v.level + ',1);" class="spr btnu on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'点击领取\')"></a>\n' +
                '</li>\n' +
                '</ul>\n';
        } else {
            _html += '<ul class="badge_list"></ul>';
        }

        _html += '<ul>\n' +
            '<li class="bp_list2">\n' +
            '<p>' + v.level + '级</p>\n' +
            '<img src="' + img + v.img2 + '.png">\n' +
            '<span>' + v.name2 + '</span>\n' +
            // class: btnd on / btnd / btnd gray = 未解锁 / 可领取 / 已领取
            '<a href="javascript:get_cost_award(' + v.level + ',1);" class="spr btnd on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'点击领取\')"></a>\n' +
            '</li>\n' +
            '</ul>\n' +
            '</div>\n'
    })
    // dom节点操作
    var swNum = 10;
    if(isH5) swNum = 5;

    mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: swNum,
        slidesPerGroup: 5,
    })

    mySwiper.appendSlide(_html);
}

function get_level_value(level){
    var info1 = [
        {"level": 1, "img": "lb1"},
        {"level": 2, "img": "lb2"},
        {"level": 3, "img": "lb3"},
        {"level": 4, "img": "lb4"},
        {"level": 5, "img": "lb5"},
        {"level": 6, "img": "lb6"},
        {"level": 7, "img": "lb7"},
        {"level": 8, "img": "lb8"},
        {"level": 9, "img": "lb9"},
        {"level": 10, "img": "lb10"},
        {"level": 11, "img": "lb11"},
        {"level": 12, "img": "lb12"},
        {"level": 13, "img": "lb13"},
        {"level": 14, "img": "lb14"},
        {"level": 15, "img": "lb15"},
        {"level": 16, "img": "lb16"},
        {"level": 17, "img": "lb17"},
        {"level": 18, "img": "lb18"},
        {"level": 19, "img": "lb19"},
        {"level": 20, "img": "lb20"},
    ];

    var info2 = [
        {"level": 1, "name": "50徽章令", "img": "lb21"},//1级  50徽章令
        {"level": 2, "name": "", "img": "lb23"},//1000级
        {"level": 3, "name": "20徽章令", "img": "lb21"},//20徽章令
        {"level": 4, "name": "10徽章令", "img": "lb21"}//10徽章令
    ];
    var v=''

    if (level === 1) {
        v = {
            "level": 1,
            "img1": info1[0].img,
            "img2": info2[0].img,
            "name2": info2[0].name
        };
    } else if (level === 1000) {
        v = {
            "level": 1000,
            "img1": "",
            "img2": info2[1].img,
            "name2": info2[1].name
        };
    }else if (level > 1000) {
        v = {
            "level": level,
            "img1": "",
            "img2": info2[2].img,
            "name2": info2[2].name
        };
    } else if (level <= 20 && (level % 10 === 0)) {
        v = {
            "level": level,
            "img1": info1[level-1].img,
            "img2": info2[2].img,
            "name2": info2[2].name
        };
    } else if (level <= 20 && (level % 10 !== 0)) {
        v = {
            "level": level,
            "img1": info1[level-1].img,
            "img2": info2[3].img,
            "name2": info2[3].name
        };
    } else if (level > 20 && (level % 10 === 0)) {
        v = {
            "level": level,
            "img1": "",
            "img2": info2[2].img,
            "name2": info2[2].name
        };
    } else if (level > 20 && (level % 10 !== 0)) {
        v = {
            "level": level,
            "img1": "",
            "img2": info2[3].img,
            "name2": info2[3].name
        };
    }
    return v;
}

function rander_bp() {
    // isParams.level=146;
    // isParams.lock=1;
    // isParams.holdnum1=20;
    // isParams.holdnum2=120;

    let _min_grade = isParams.lock == 1 ? Math.min(isParams.holdnum1, isParams.holdnum2) : isParams.holdnum1;
    if (isParams.holdnum1 == 20 && isParams.holdnum1 < isParams.holdnum2) {
        _min_grade = isParams.holdnum2;
    }

    var _need_loop_times = 0
    if (_min_grade >= 100) {
        //每次只循环获取1个
        _need_loop_times = 1
        //获取开始节点
        var _temp = Math.floor((_min_grade - 100) / 50)
        var _begin_postion = 100 + _temp * 50
    }

    if (_need_loop_times > 0) {
        $('.rander_after').remove();
        var img = "//game.gtimg.cn/images/actdaoju/act/a20230203cfpl/pc/";
        for (i = 0; i < 50; i++) {
            var grade = _begin_postion + i + 1
            var order = 100 + i + 1
            var grade_value= get_level_value(grade)

            _html = '<div class="swiper-slide rander_after" order="' + order + '" bp_lv="' + grade + '">\n';

            _html += '<ul class="badge_list"></ul>';

            _html += '<ul>\n' +
                '<li class="bp_list2">\n' +
                '<p>' + grade + '级</p>\n' +
                '<img src="' + img + grade_value.img2 + '.png">\n' +
                '<span>'+grade_value.name2+'</span>\n' +
                // class: btnd on / btnd / btnd gray = 未解锁 / 可领取 / 已领取
                '<a href="javascript:get_cost_award(' + grade + ',1);" class="spr btnd on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'点击领取\')"></a>\n' +
                '</li>\n' +
                '</ul>\n' +
                '</div>\n'

            mySwiper.appendSlide(_html)
        }
    }

    $("#bp_list div.swiper-slide").each(function (index, dom) {
        //恢复初始状态
        $(dom).find(".bp_list1 a").removeClass('on').removeClass('gray').addClass('on')
        $(dom).find(".bp_list2 a").removeClass('on').removeClass('gray').addClass('on')
        //处理
        let _bp_level = $(dom).attr("bp_lv");
        if (_bp_level <= parseInt(isParams.level)) {
            //点击领取
            if (_bp_level <= 20) {
                //免费线
                $(dom).find(".bp_list1 a").removeClass('on').removeClass('gray')
            }
            if (isParams.lock == 1) {
                //付费线
                $(dom).find(".bp_list2 a").removeClass('on').removeClass('gray');
            }
            //判断是否已经领取
            if (_bp_level <= parseInt(isParams.holdnum1)) {
                //免费
                $(dom).find(".bp_list1 a").removeClass('gray').removeClass('on').addClass('gray').attr('href', 'javascript:void(0)');
            }
            if (isParams.lock == 1 && _bp_level <= parseInt(isParams.holdnum2)) {
                //付费
                $(dom).find(".bp_list2 a").removeClass('gray').removeClass('on').addClass('gray').attr('href', 'javascript:void(0)');
            }
        }
    })

    //跳转到领取的位置
    let to = $("#bp_list").find(".swiper-slide[bp_lv='" + (parseInt(_min_grade) + 1) + "']").attr("order")
    mySwiper.slideTo(parseInt(to) - 1);
}

//通行证免费线奖励领取
function get_free_award(level, flag) {
    var flow_925211 = {
        actId: '531996',
        token: '46f3fd',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            level: level
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            var msg = '';
            var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
            $.each(obj, function (k, v) {
                //去掉免费线标识
                if (v.id != "3852433") {//3852434 免费线标识
                    msg = "恭喜您获得了：" + v.name;
                }
            })
            //变量
            isParams.holdnum1++;
            //样式
            dom = $("#bp_list").find("div.swiper-slide[bp_lv='" + level + "']")
            var _f = function () {
                dom.find(".bp_list1 a").removeClass('on').removeClass('gray').addClass('gray');
            }
            if (flag === 1) {
                alert(msg, function () {
                    _f();
                    enter(1000);
                });
            } else {
                confirm(msg, function () {
                    _f();
                    get_award(isParams.list)
                }, function () {
                    _f();
                    enter(1000);
                }, function () {
                    _f();
                    enter(1000);
                })
            }
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow_925211);
}

//通行证付费线奖励领取
function get_cost_award(level, flag) {
    var flow_925213 = {
        actId: '531996',
        token: '7ab2d2',
        loading: true, // 开启loading浮层,默认不开启
        sData: {
            level: level
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            //弹窗消息处理
            var msg = '';
            var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
            $.each(obj, function (k, v) {
                //去掉免费线标识
                if (v.id != "3852434") {
                    msg = "恭喜您获得了：" + v.name;
                }
            })
            //变量
            isParams.holdnum2++;
            //样式
            dom = $("#bp_list").find("div.swiper-slide[bp_lv='" + level + "']")
            var _f = function () {
                dom.find(".bp_list2 a").removeClass('gray').removeClass('on').addClass('gray');
            }
            if (flag === 1) {
                alert(msg, function () {
                    _f();
                    enter(1000);
                });
            } else {
                confirm(msg, function () {
                    let to = dom.attr("order")
                    mySwiper.slideTo(to, 200, true)
                    _f();

                    get_award(isParams.list)
                }, function () {
                    _f();
                    enter(1000);
                }, function () {
                    _f();
                    enter(1000);
                })
            }
        },
        fail: function (res) {
            failShow(res, function () {
                alert(res.sMsg)
            })
        }
    }
    Milo.emit(flow_925213);
}

//一键领取
function getPropByBatch() {
    //要领取的道具level,flag,方法(免费线/付费线)
    var list = []
    $("#bp_list div.swiper-slide").each(function (index, dom) {
        //免费
        level = $(dom).attr("bp_lv")
        if ((level <= isParams.level) && (level <= 20) && (level > isParams.holdnum1)) {
            list.push({
                "line": 1,
                "level": level
            })
        }
        if ((level <= isParams.level) && (isParams.lock === 1) && (level > isParams.holdnum2)) {
            list.push({
                "line": 2,
                "level": level
            })
        }
    })
    isParams.list = list
    get_award(isParams.list);
}

function get_award(list) {
    var prop_render = list.shift();
    if (prop_render) {
        if (prop_render.line == 1) {
            get_free_award(prop_render.level, 2)
        } else {
            get_cost_award(prop_render.level, 2)
        }
    } else {
        alert('抱歉，没有可领取等级奖励了，请升级等级后再领取。', function () {
            enter(1);
        })
    }
}

//是否在掌上道聚城内
function isApp() {
    a = {
        ADTAG: "", //渠道
        url: 'http://app.daoju.qq.com/act/a20230203cfpl/index.html?plat_support=mqq', //道聚城外点击，前往道聚城打开指定页面
        callback: function () {
            //是在道聚城内打开
        }
    }
    need(['daoju.util', 'daoju.ui.app'], function (util, app) {
            var _url = "tencent-daojucheng://webpage?url=" + encodeURIComponent(a.url);
            if (/MicroMessenger/gi.test(navigator.userAgent)) {
                WeixinJSBridge.invoke('launchApplication', {
                    "schemeUrl": _url //原始 scheme 链接
                }, function (res) {
                    if (res.err_msg == "launchApplication:ok") {

                    } else if (res.err_msg == "launchApplication:fail") {
                        confirm("请下载掌上道聚城APP参与活动", function () {
                            location.href = location.protocol + "//app.daoju.qq.com/download/all.htm?ADTAG=" + a.ADTAG;
                        });
                    }
                });
            } else {
                var _f=function (msg){
                    confirm(msg, function () {
                        location.href = location.protocol + "//app.daoju.qq.com/download/all.htm?ADTAG=" + a.ADTAG;
                    });
                }
                try {
                    $.getScript("//daoju.qq.com/app/js/url.js", function () {
                        if($.isFunction(app.pingUrl)){
                            app.pingUrl(_url, function (b) {
                                if (b) {
                                    location.href = _url;

                                } else {
                                    _f("请前往掌上道聚城APP参与活动~")
                                }
                            });
                        }else{
                            _f("请前往掌上道聚城APP参与活动~~")
                        }
                    });
                } catch (err) {
                    _f("请前往掌上道聚城APP参与活动呦~")
                }
            }
    });
}

function jumpHuya(){
    alert('请前往虎牙APP【游戏绑定中心】绑定区服账号观赛后领取~')
}
function jumpZh(){
    if(isH5){
        // alert('请前往掌火APP活动页面领取~')
        window.open('https://cf.qq.com/app/','_self')
    }else{
        TGDialogS('djc-code')
    }

}

//==================================== 通行证部分 end ============================================

function test() {
    flow_926038.sData.num = $('#test').val()
    Milo.emit(flow_926038);
}

var flow_926038 = {
    actId: '531996',
    token: '41ced2',
    loading: true, // 开启loading浮层,默认不开启
    sData: {},
    success: function (res) {
        console.log(res);
        callbackObj = res.details.modRet
        var msg = callbackObj.sMsg + '*' + callbackObj.iPackageNum;
        alert(msg, function () {
            enter(2000);
        });
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg)
        })
    }
}

function test1(){
    let actUrl = 'https://app.daoju.qq.com/act/a20230203cfpl/index.html';

    if (navigator.userAgent.indexOf('iPhone') >= 0) {
        var argEx = '1';
        var action = 20000;
        var url = actUrl;
    } else {
        var argEx = '1';
        var action = 20000;
        // jumpUrl中转时，会将cf/NewYear转换成cfewYear
        var url = `http://mwegame.qq.com/act/jumpUrl?acturl=${actUrl}`;
    }
    let ginfo = {
        argEx: argEx,
        gameId: 20003,
        jumpToUrl: url,
        winWidth: window.innerWidth || document.documentElement.clientWidth,
        action: action,
    }
    console.log(ginfo);
    // bannerDL.setIFrame(ginfo, { page:'//'+window.location.host+'/act/dnf/downloadBanner/indexNew',background: "fb8716" });
    // window.onresize = function () {
    //     bannerDL.resize();
    // };
    bannerDL.setIFrame(ginfo, { page:'//mwegame.qq.com/act/dnf/downloadBanner/indexNew',background: "fb8716" });
    window.onresize = function () {
        bannerDL.resize();
    };
}
