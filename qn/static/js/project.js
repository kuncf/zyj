var OUT = {};
OUT.userInfo = {};
var actId = '532666';
var urlPathName = window.location.pathname;
var isDoing = false;
milo.ready(function () {
    // ҳ�棬����ʹ��
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
            // �˳��ص�
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
    // �ύ�󶨴���
    bindArea: function () {
        flowFun('7357c7', {}, function (res) {
            var roleInfo = res.details.jData.bindarea;
            if(roleInfo){
                location.reload();
            }
        }, 'fail', false);
    },
    // ��ѯ�󶨴���
    queryBindArea: function () {
        flowFun('a27c5b', {sData:{query: true}}, function (res) {
            console.log('��ѯ�󶨴���=======��',res)
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
        //����Ƿ��¼
        Milo.checkLogin({
            iUseQQConnect: false, //�����ǰ�ʹ�õĻ�����¼,�뽫�Ĳ�������true
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
    lotteryPoint: 0,// �齱Կ��
    exchangePoint: 0,// ����
    exchangeConf: 0,// �һ�����
    tmp: [],
    teamBoxQual: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0},
    teamStatus: 999,
    init: function () {
        flowFun('0fdeeb', {}, function (res) {
            isDoing = false;
            OUT.user.exchangeConf = res.details.jData.exchangeData;
            OUT.user.tmp = res.details.jData.tmp;
            // �齱Կ��
            OUT.user.lotteryPoint = parseInt(res.details.jData.pointData[1953]['ticket']);
            $('.lotteryPoint').text(OUT.user.lotteryPoint);
            // ����
            OUT.user.exchangePoint = parseInt(res.details.jData.pointData[1947]['ticket']);
            $('.exchangePoint').text(OUT.user.exchangePoint);


            if (typeof(res.details.jData.dbTeamData['status']) != 'undefined') {
                OUT.user.teamStatus = res.details.jData.dbTeamData['status'];
                if (res.details.jData.dbTeamData['status'] == 0) {
                    $('.teamStatus').text('������');
                    $('.teamTime').html('�ȴ����ţ�<span></span>');

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
                    $('.teamStatus').text('�ѿ���');
                    $('.teamTime').text('���ųɹ�');
                    $('.myTeamId').val(res.details.jData.myTeamId);
                    $('.teamGift').text(res.details.jData.myTeamGift);
                } else {
                    isStart = 0;
                    $('.teamStatus').text('δ����');
                    $('.teamTime').html('�ȴ����ţ�<span></span>');
                    $('.myTeamId').val('');
                    $('.teamGift').text('');
                }
            } else {
                $('.myTeamId').val('');
                $('.teamGift').text('');
            }

            // �ҵ���
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

            // �Ŷ�ID
            // if (typeof(res.details.jData.teamId[0]) != 'undefined' && res.details.jData.teamId[0]['teamId'] != 0) {
            //     $('#teamId').val(res.details.jData.teamId[0]['teamId']);
            // } else {
            //     $('#teamId').val('');
            // }
            // ����ȯ
            OUT.user.getJfNum();
            OUT.user.getSupporTeam();
        });
    },

    // ��ѯ�����¼
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

    // ��ѯƴ�ż�¼
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
                        html += '<td><a href="javascript:OUT.user.tmpDeliverGoods(2, ' + v.id + ', ' + v.iPackageId + ', \'' + v.sPackageName + '\');">' + '��ȡ' + '</a></td>'
                        html += '<td><a href="javascript:OUT.user.tmpDeliverGoods(1, ' + v.id + ', ' + v.iPackageId + ', \'' + v.sPackageName + '\');">' + '�ֽ�' + '</a></td>'
                    } else if (parseInt(v.sExtend2) == 2) {
                        html += '<td>����ȡ</td>'
                        html += '<td></td>'
                    } else if (parseInt(v.sExtend2) == 3) {
                        html += '<td></td>'
                        html += '<td>�ѷֽ�</td>'
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
            content = 'ȷ�Ϸֽ���� ' + sPackageName + ' �𣿷ֽ���������' + OUT.user.tmp[iPackageId] + '��Կ��';
        } else {
            content = 'ȷ����ȡ���� ' + sPackageName + ' ����Ϸ�ֿ��𣿣���ǰ��ȡ�Ĵ����ǣ�' + decodeURIComponent(OUT.userInfo.areaName) + '��(Ψһ�Ե��ߺͽ�ɫ�����ظ�����)';
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

    // �齱
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
    // ֧������
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

    // ���ֶһ�����
    exchange: function (type) {
        if (typeof(OUT.user.exchangeConf[type]) == 'undefined') {
            OUT.login.qqlogin();
            return;
        }
        confirm("�Ƿ�ʹ�� " + OUT.user.exchangeConf[type]['point'] + ' �����ֶһ����� ' + OUT.user.exchangeConf[type]['giftName'] + '(Ψһ�Ե��ߺͽ�ɫ�����ظ�����)', function(){
            flowFun('291fd0', {sData:{'type': type}}, function (res) {
                isDoing = false;
                alert(res.sMsg, function () {
                    OUT.user.init();
                });
            });
        });
    },

    // �����Ŷ�
    buildTeam: function () {
        // flowFun('8d727f', {}, function (res) {
        flowFun('f0a29e', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    // �����Ŷ�
    joinTeam: function (teamId) {
        if (typeof(teamId) == 'undefined') {
            teamId = $('#joinTeamId').val();
        }
        if (teamId == '') {
            alert('�Ŷ�ID����Ϊ��');
            return;
        }
        flowFun('b6ea83', {sData:{'teamId': teamId}}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    // ��Ϊ�Ƽ���
    beSupporTeam: function () {
        flowFun('56bcea', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },
    isDoSuppor: false,
    // ��ѯ�Ƽ���
    getSupporTeam: function () {
        flowFun('9291a7', {}, function (res) {
            isDoing = false;
            OUT.user.isDoSuppor = true;
            var teamHtml = '';
            $('.listtdjoin').html('')
            $(res.details.jData.data).each(function (k, v) {
                teamHtml += '<li>';
                teamHtml += '<p>' + v['teamId'] + '</p>';
                teamHtml += '<a href="javascript:OUT.user.joinTeam(\'' + v['teamId'] + '\');" class="btnjoina">����</a>';
                // teamHtml += '<td>' + v['totalPoint'] + '</td>';
                teamHtml += '</li>';
                // setTimeout(function () {
                //     $('.supporTeam').append('<tr><td>' + v['teamId'] + '</td><td>' + v['totalPoint'] + '</td><td><a href="javascript:OUT.user.joinTeam(\'' + v['teamId'] + '\')" class="btnsqrt sp db" onclick="PTTSendClick(\'btn\',\'btnsqrt2\',\'��������\');">����</a></td></tr>')
                // }, 500 * k)
            });
            $('.listtdjoin').html(teamHtml)
        }, 'fail', false);
    },

    // ��ȡƴ�Ž���
    getTeamGift: function () {
        flowFun('df1903', {}, function (res) {
            isDoing = false;
            alert(res.sMsg, function () {
                OUT.user.init();
            });
        });
    },


    getJfNum: function () {
        //���ݲ�ͬ�ĵ�¼̬���ò�ͬ�Ĳ���
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
        //��ʽ��ַ: https://gameact.qq.com/ams/lottery/v2.0/17/456873_broadcast.js
        //���Ե�ַ: http://gameact.qq.com/ams/lottery/v2.0/88/317288_broadcast.js
        milo.loader.loadScript('https://gameact.qq.com/ams/lottery/v2.0/81/531681_broadcast.js',
        //     milo.loader.loadScript('https://gameact.qq.com/ams/lottery/v2.0/31/520431_broadcast.js',
            function (edata) {
                console.log("����");
                // console.log(Broadcast_524189);
                // if (typeof (Broadcast_520431) != 'undefined') {
                if (typeof (Broadcast_531681) != 'undefined') {
                    var htmlStr = '';
                    $.each(Broadcast_531681, function (i, v) {
                    // $.each(Broadcast_520431, function (i, v) {
                        htmlStr += '<li>' + '��ϲ���';
                        htmlStr += '<span>' + v.iUin + '</span>' + '�����';
                        htmlStr += '<span>' + v.sPackageName + ' </span>';
                        htmlStr += '</li>';
                    })
                    $('.list_txt').html(htmlStr);
                    //��������
                    xyListRollInit1();
                }
            }
        );
    },
    // ��ȡ����齱ȯ
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
        loading: true, // ����loading����,Ĭ�ϲ�����
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
//     wx_appid : 'wxf8773b4d31a9a719', //΢�Ź��ں�appid
//     title: OUT.user.share.title,// ������⣬Ĭ��Ϊ�ҳ����⣨���ֶ�������
//     desc: OUT.user.share.desc, //�������
//     link: OUT.user.share.link, //��������
//     imgUrl: OUT.user.share.imgUrl, //��������ѿ�����ͼ��
//     /*΢�ŷ���ص�������Ҫ�ɲ�д��*/
//     WXtrigger: function (res) { //΢�ŵ���¼��ص�
//         // alert("΢�ŵ���ص�\n"+JSON.stringify(res));
//     },
//     WXsuccess: function (res) { //΢�ŷ���ɹ��ص�
//         // alert("΢�ŷ���ɹ��ص�\n"+JSON.stringify(res));
//     },
//     WXcancel: function (res) { //΢�ŷ���ȡ���ص�
//         // alert("΢�ŷ���ȡ���ص�\n"+JSON.stringify(res));
//     },
//     WXfail: function (res) { //΢�ŷ���ʧ�ܻص�
//         // alert("΢�ŷ���ʧ�ܻص�\n"+JSON.stringify(res));
//     },
//
//     QQcallback:function(res){//qq�ɹ���ʧ�ܡ���ȡ���Ļص�
//         // alert("QQ����֮��ص��ص�\n"+JSON.stringify(res));
//     },
//     QQtrigger:function(res){//qq�����¼��Ļص�
//         // alert("QQ�������ص�\n"+JSON.stringify(res));
//     },
//
//     qqBrowserCallback: function(data){
//         //data.code == 1 ��ʾ�ܷ���
//         //data.code ==-1 ��ʾ���ܷ���
//         //data.code == 0 ��ʾδ֪
//         // alert("QQ������������ص�\n"+JSON.stringify(data));
//     }
// };
// Milo.mobileShare.initShareAll(opts) //


function getinput() {
    var res = document.getElementById("myTeamId")

    if (res.value == '') {
        alert('�Ŷ�ID����Ϊ��')
    } else {
        res.select();
        document.execCommand("copy");
        alert('���Ƴɹ�');
    }
}

// ����ʱ�䵹��ʱ
var isStart = 0;
function TimeDown(value) {
    if (value < 0) {
        value = 0;
    }
    //����ʱ��������
    var totalSeconds = parseInt(value);

    //ȡģ��������
    var modulo = totalSeconds % (60 * 60 * 24);
    //Сʱ��
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //����
    var minutes = Math.floor(modulo / 60);
    //��
    var seconds = modulo % 60;

    hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    //�����ҳ��
    $('.teamTime span').text( hours + ":" + minutes + ":" + seconds);
    //�ӳ�һ��ִ���Լ�
    if((hours == "00" && minutes == "00" && parseInt(seconds)-1<0) || OUT.user.teamStatus == 1 || OUT.user.teamStatus == 2){

    }else{
        setTimeout(function () {
            TimeDown(value-1);
        }, 1000)
    }

}