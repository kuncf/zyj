isParams = {
    //�ݴ���ֽ�Կ����
    'chouGoods': {
        3810026: [15],//QBZ03��ɫǾޱ-�ھ�֮ޱƤ��
        3810028: [12],//�¶���-�ھ�֮��
        3810036: [6],//������-�ھ�֮��Ƥ��
        3810038: [6],//����-�ھ�֮ŭƤ��
        3810041: [6],//����-�ھ�֮��Ƥ��
        3810042: [3],//����-�ھ�֮��Ƥ��
        3810043: [8],//�ƽ�èè����-����
        3810051: [8],//����-�ҽм�
        3810052: [6],//�����������һ�ȯ
        3853704: [6],//N9�������һ�ȯ
        3853705: [6],//70KG�������һ�ȯ
        3853706: [6]//�����������һ�ȯ
    },
    /*
     �һ�����
     */
    'exchangeGoods': {
        '1': ['Knife-�ھ�֮��', 4800],
        '2': ['QBZ03-�ھ�֮ޱƤ��', 4800],
        '3': ['�¶���-�ھ�֮��', 3600],
        '4': ['������-�ھ�֮��Ƥ��', 2000],
        '5': ['����-�ھ�֮ŭƤ��', 2000],
        '6': ['����-�ھ�֮��Ƥ��', 2000],
        '7': ['����-�ھ�֮��Ƥ��', 1200],
        '8': ['�ƽ�èè����-����', 2400],
        '9': ['����-�ҽм�', 2400],
        '10': ['�����������һ�ȯ', 2400],
        '11': ['N9�������һ�ȯ', 2400],
        '12': ['70KG�������һ�ȯ', 2400],
        '13': ['�����������һ�ȯ', 2400],
        '14': ['ְҵѡ��', 900],
    },
    'selectBagGoods': {
        '1': ['EPս���Ųʱ���'],
        '2': ['BSս���Ųʱ���'],
        '3': ['Q9ս���Ųʱ���'],
        '4': ['AGս���Ųʱ���'],
        '5': ['KZս���Ųʱ���'],
        '6': ['EDG�Ųʱ���'],
        '7': ['WE�Ųʱ���'],
        '8': ['eStar�Ųʱ���'],
        '9': ['XROCK�Ųʱ���'],
        '10': ['R.LGD�Ųʱ���'],
    },
    // 2,3,5,4,9,7,8,6,1,10
    //������Ϣ
    bindinfo: '',
    //�Ƿ񿪿�
    lock: false,
    //�ȼ�
    'level': 0,
    //���������ȡ��������
    'holdnum1': 0,
    //����������ȡ��������
    'holdnum2': 0,
    //һ����ȡ��list
    list: [],
    //����
    jfnum: [],

    lockCj: false,
}
//======================= login =======================================================
milo.ready(function () {
    isH5 = location.hostname == "app.daoju.qq.com" ? true : false;
    isNei = milo.request('neiqian') != '' ? true : false;

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
                },
                onClose: function () {
                    typeof callback1 == "function" ? callback2() : console.log("no callback2")
                }
            });
        })
    };

    //����Ƿ��¼
    Milo.checkLogin({
        iUseQQConnect: false, //�����ǰ�ʹ�õĻ�����¼,�뽫�Ĳ�������true
        success: function (user) {
            console.log('�ѵ�¼��');
            console.log(user);
            $('#unlogin').hide();
            $('#logined').show();
            $("#userinfo").text(user.userInfo.userUin);
            //��ѯ��
            queryBindArea();
        },
        fail: function (res) {
            console.log('δ��¼��', res);
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

    // ֧���ϱ�
    // if (isH5) {
    need(["ams.daoju_buy_v2.appid"], function (autoappid) {
        autoappid.init('cf', 27973, function (final_appid) {
            //��Ȩ
            if (final_appid == 1101) {
                $(".bot-nav").show()
            }
            //final_appidΪ�Զ��жϵõ��ĵ��۳�������
            //���δ������Զ����е��۳�ȫ�������ݵ��ռ������뱣�����ŵ�milo.ready�ڣ�����������ҳ���Ͻ��л��ڵ��۳ǻ�ŵ�eas�ع��ϱ�
        });
    });
    // }

    //�ֲ�
    queryBroadcast()
    //��ʼ����Ⱦͨ��֤
    bpInit()
    //��ʼ��dom�ڵ�����
    initDom()
});

function initDom() {
    //�ƻ�����
    if (isZhApp()) {
        $('#dologout').css('display', 'none');
        $('.task4.btn-receive1').css('display', 'inline-block');
        $('.task4.task_text').css('display', 'none');
    } else {
        $('.task4.btn-receive1').css('display', 'none');
        $('.task4.task_text').css('display', 'inline-block');
    }

    //���۳�����
    if (isDjcApp()) {
        $('#dologout').css('display', 'none');
        $('.task5.task_text').css('display', 'none');
        $('.task5.btn-receive1').css('display', 'inline-block');
    } else {
        $('.task5.task_text').css('display', 'inline-block');
        $('.task5.btn-receive1').css('display', 'none');
    }
}

//��¼
function toLogin() {
    if (Milo.isMobile()) {
        Milo.mobileLoginByQQ();
    } else {
        Milo.loginByQQ();
    }
}

// ��ѯ�󶨴���
function queryBindArea() {
    var flow_query = {
        actId: '531996',
        token: '790d3b',
        loading: true, // ����loading����,Ĭ�ϲ�����
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

// �ύ�󶨴���
function commitBindArea() {
    var flow_commit = {
        actId: '531996',
        token: 'c3f904',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            query: false
        },
        success: function (res) {
            //�Ѱ�ʱ����չ����
            location.reload();
        },
        fail: function (res) {
            commitBindArea();
        }
    };
    Milo.emit(flow_commit);
}

//�ֲ�
function queryBroadcast() {
    var flow = {
        actId: '531996',
        token: '365195',
        // loading: true, // ����loading����,Ĭ�ϲ�����
        time: 50, // �ֲ�ʱ��
        sData: {
            // query: false
        },
        success: function (res) {
            console.log('��ѯ�ֲ�success', res);
        },
        fail: function (res) {
            console.log('��ѯ�ֲ�fail', res);
        }
    }
    Milo.emit(flow);
}

//======================= �� end ==========================================================

//======================= ��ѯ start ==========================================================
// ��ѯ����
function enter(a) {
    setTimeout(function () {
        //ˢ�»��ֲ���
        Milo.emit(flow_924671);
    }, a || 2000);
}

var flow_924671 = {
    actId: '531996',
    token: 'f9d31b',
    loading: false, // ����loading����,Ĭ�ϲ�����
    sData: {},
    success: function (res) {
        console.log(res);
        //����ֵ����
        var modRet = res.details.modRet;
        //1.����ֱֵ��չʾ
        isParams.jfnum = modRet.sOutValue1.split(',');
        $('.jf_2327').html(isParams.jfnum[0])
        $('.jf_5430').html(isParams.jfnum[1])
        //2.�ȼ�
        var experience = isParams.jfnum[2]
        // if (experience > 100000) {
        //     experience = 100000
        // }
        isParams.level = Math.floor(experience / 100);//����ֵ
        $('.level').html(isParams.level)
        // if(experience === 100000){
        //     $('.progress_width').css('width', 100 + '%')//������
        //     $('.progress_num').html(100)//������
        // }else{
            $('.progress_width').css('width', (experience % 100) + '%')//������
            $('.progress_num').html(experience % 100)//������
        // }
        //����
        isParams.lock = false
        if (isParams.jfnum[3] > 0) {
            isParams.lock = 1
        }
        //����ȡ��ʶ
        //�������ȡ
        isParams.holdnum1 = parseInt(isParams.jfnum[4]);
        //��������ȡ
        isParams.holdnum2 = parseInt(isParams.jfnum[5]);
        //������
        $('.jf_3782').text(isParams.jfnum[6])

        //3.������һ�����ȡ
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
        //4.�ۼƹھ���ȡ
        var hold_sum_num = modRet.sOutValue3.split(',');
        $('.ljdh').removeClass('gray')
        $.each(hold_sum_num, function (k, v) {
            if (v >= 1) {
                $(".ljdh.ljdh" + (parseInt(k) + 1)).addClass("gray");
            }
        });
        //5.�ۼƹھ����Ų�10ѡ1
        $('.ljdhselect10').removeClass("gray")
        if (modRet.sOutValue4 >= 1) {
            $('.ljdhselect10').addClass("gray")
        }
        //6.5������
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
        //��Ⱦҳ��
        rander_bp();

        return;
    },
    fail: function (res) {
        failShow(res, function () {
            alert(res.sMsg);
        })
    }
}
//======================= ��ѯ end ==========================================================
//======================= ���� start ==========================================================
function amsBuy(item) {
    var flow_924674 = {
        actId: '531996',
        token: 'a4af4d',
        loading: true,
        sData: {
            // propid: "", // ���id
            // buyNum: "", // ����������������Ϊ1��
            item: item,
            gameId: "cf", // ҵ����
            // jifen_dikou: 0, // �Ƿ�ʹ�û��ֵֿ�1�� 0��
            // jifen_amount: 0, // �û�����Ļ��ֵֿ�����
            djcActId: 27973, // ���۳ǻid
            paytype: 2, // 1����ȯ 2������� 3����� 4����ȯ+��� 5�����2
        },
        // ֧������رջص�
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

// �������ۿ۹���
function amsBuyDi() {
    var flow_924675 = {
        actId: '531996',
        token: '34628f',
        loading: true,
        sData: {
            // propid: "", // ���id
            // buyNum: "", // ����������������Ϊ1��
            gameId: "cf", // ҵ����
            // jifen_dikou: 0, // �Ƿ�ʹ�û��ֵֿ�1�� 0��
            // jifen_amount: 0, // �û�����Ļ��ֵֿ�����
            djcActId: 27973, // ���۳ǻid
            paytype: 2, // 1����ȯ 2������� 3����� 4����ȯ+��� 5�����2
        },
        // ֧������رջص�
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

// ����
function amsBuyLock() {
    var flow_925649 = {
        actId: '531996',
        token: '5a9908',
        loading: true,
        sData: {
            // propid: "", // ���id
            // buyNum: "", // ����������������Ϊ1��
            gameId: "cf", // ҵ����
            // jifen_dikou: 0, // �Ƿ�ʹ�û��ֵֿ�1�� 0��
            // jifen_amount: 0, // �û�����Ļ��ֵֿ�����
            djcActId: 27973, // ���۳ǻid
            paytype: 2, // 1����ȯ 2������� 3����� 4����ȯ+��� 5�����2
        },
        // ֧������رջص�
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

//======================= ���� end ==========================================================
//======================= �齱 start ==========================================================
//��ͨ�齱
function amsChou(item) {
    var flow_924658 = {
        actId: '531996',
        token: '562824',
        loading: true, // ����loading����,Ĭ�ϲ�����
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

// ���ݴ��䡿��ȡ
function amsZanQu(item, name) {
    var flow_924661 = {
        actId: '531996',
        token: '46480a',
        loading: true, // ����loading����,Ĭ�ϲ�����
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
    var msg = "ȷ����ȡ " + name + " ����" + isParams.bindinfo.sAreaName + "���𣿡�Ψһ�Ե�����ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow_924661);
    });
}

// ���ݴ��䡿�ֽ�Կ��
function amsZanFen(item, name, key) {
    var flow_924662 = {
        actId: '531996',
        token: '882f03',
        loading: true, // ����loading����,Ĭ�ϲ�����
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
    confirm("ȷ���ֽ� " + name + " ��� " + key + " Կ����", function () {
        Milo.emit(flow_924662);
    });
}

//���˻��ֶһ�����
function amsExchange(item) {
    var flow_924663 = {
        actId: '531996',
        token: '2be160',
        loading: true, // ����loading����,Ĭ�ϲ�����
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
    //'1': ['����-���Ƥ�������ã�', 1800],
    var msg = "ȷ��ʹ�� " + isParams.exchangeGoods[item][1] + " ��������һ� " + isParams.exchangeGoods[item][0] + " �𣿵�ǰ������" + isParams.bindinfo.sAreaName + "����Ψһ�Ե��߻��ɫ��ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow_924663);
    });
}

//�ۼ���ȡ5��
function amsLqSum(item) {
    var flow_925208 = {
        actId: '531996',
        token: 'b05fc5',
        loading: true, // ����loading����,Ĭ�ϲ�����
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

//10�Ųʱ���ѡ1
function amsSelectBag(item) {
    var flow_925401 = {
        actId: '531996',
        token: '1864b4',
        loading: true, // ����loading����,Ĭ�ϲ�����
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
    var msg = "ȷ����ȡ��" + isParams.selectBagGoods[item][0] + "���𣿵�ǰ������" + isParams.bindinfo.sAreaName + "����Ψһ�Ե��߻��ɫ��ͬһ�����ڣ���Ϸ�ֿ��޷��ظ����ˣ������ѡ��";
    confirm(msg, function () {
        Milo.emit(flow_925401);
    });
}

// ��Ȩ
function amsTeQ() {
    if (isH5) {
        Milo.emit(flow_924664);
    }
}

var flow_924664 = {
    actId: '531996',
    token: '89a45a',
    loading: true, // ����loading����,Ĭ�ϲ�����
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

//������ȡ����
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
    loading: true, // ����loading����,Ĭ�ϲ�����
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
    loading: true, // ����loading����,Ĭ�ϲ�����
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
    loading: true, // ����loading����,Ĭ�ϲ�����
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
    loading: true, // ����loading����,Ĭ�ϲ�����
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
    loading: true, // ����loading����,Ĭ�ϲ�����
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
//================================�齱 end ===========================================

//======================= ��¼ start ========================================================
// ���˻񽱼�¼
function amsHistoryList(item, pageNow) {
    isParams.pageNow = pageNow;
    var flow = {
        actId: '531996',
        token: 'a5b4e0',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {},
        success: function (res) {
            //��Ⱦ����
            $("#milo-lotteryRecordContainer" + item).html('');
            let tpl_html = $("#milo-lotteryRecordTpl" + item).html();
            // ��Ⱦ����
            const _html = Milo.tpl().compile(tpl_html, res.data);
            $("#milo-lotteryRecordContainer" + item).html(_html);

            //�����ѯ��һҳ��û������
            $('#milo-paginator' + item).show()
            if (res.total == 0) {
                $('#milo-paginator' + item).hide()
            } else {
                // ��ҳ��ʼ��
                Milo.pagination({
                    pages: res.total, // ��ҳ��
                    currentPage: flow.sData.pageNow, // ��ǰҳ
                    element: '#milo-paginator' + item, // ��ҳ����id��������Ⱦ��ҳ�ؼ�
                    // �л�ҳ��ʱ�����ص�
                    callback: function (page) {
                        if (page !== flow.sData.pageNow) {
                            amsHistoryList(item, page);
                        }
                    }
                });
            }

            //����ǲ�ѯ�����һҳ
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
    // ���ڴ����ҳ�ı仯
    if (pageNow) {
        flow.sData.pageNow = pageNow;
    } else {
        flow.sData.pageNow = 1;
    }
    //�ߴ�
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

// ����ʧ�ܻص�
function failShow(res, callback = '') {
    console.log(res)
    if (res.iRet === 101 || res.iRet === '101') {
        // ��¼̬ʧЧ����Ҫ���µ���¼����
        toLogin()
    } else if (res.iRet === 99998 || res.iRet === '99998') {
// �����ύ�󶨴�������
        commitBindArea();
    } else {
        $.isFunction(callback) && callback(res);
    }
}

var _share = {
    title: "��Խ����CFPLS21����ͨ��֤",
    pic: "https://game.gtimg.cn/images/actdaoju/act/a20230203cfpl/pc/share.jpg",// ������Ҫ�޸�
    content: "���봩Խ���ߴ�˵CFPLS21����ͨ��֤���",// ������Ҫ�޸�
    shareUrl: location.href,
};

// ��ʼ������
function setShare() {
    setTimeout(function () {
        need("daoju.ui.share", function (share) {
            if (typeof ek != "undefined") {
                //����Ѷ����
                ek.share.setShare({
                    title: _share.title,
                    img_url: _share.pic,
                    desc: _share.content,
                    link: _share.shareUrl,
                    callback: function () {
                        alert("����ɹ���");
                    }
                });
            } else {
                //������Ѷ����
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

// ��ת����ȡ����
// $(".btns .btn-get").click(function () {
//     var $loca = $(".dj3").offset().top
//     $('body,html').animate({
//         scrollTop: $loca
//     })
// })


//==================================== ͨ��֤���� start ============================================
//ͨ��֤��Ⱦ
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
                ' <p>' + v.level + '��</p>\n' +
                '<img src="' + img + v.img1 + '.png">\n' +
                // class: btnu on / btnu / btnu gray = δ���� / ����ȡ / ����ȡ
                '<a href="javascript:get_free_award(' + v.level + ',1);" class="spr btnu on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'�����ȡ\')"></a>\n' +
                '</li>\n' +
                '</ul>\n';
        } else {
            _html += '<ul class="badge_list"></ul>';
        }

        _html += '<ul>\n' +
            '<li class="bp_list2">\n' +
            '<p>' + v.level + '��</p>\n' +
            '<img src="' + img + v.img2 + '.png">\n' +
            '<span>' + v.name2 + '</span>\n' +
            // class: btnd on / btnd / btnd gray = δ���� / ����ȡ / ����ȡ
            '<a href="javascript:get_cost_award(' + v.level + ',1);" class="spr btnd on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'�����ȡ\')"></a>\n' +
            '</li>\n' +
            '</ul>\n' +
            '</div>\n'
    })
    // dom�ڵ����
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
        {"level": 1, "name": "50������", "img": "lb21"},//1��  50������
        {"level": 2, "name": "", "img": "lb23"},//1000��
        {"level": 3, "name": "20������", "img": "lb21"},//20������
        {"level": 4, "name": "10������", "img": "lb21"}//10������
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
        //ÿ��ֻѭ����ȡ1��
        _need_loop_times = 1
        //��ȡ��ʼ�ڵ�
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
                '<p>' + grade + '��</p>\n' +
                '<img src="' + img + grade_value.img2 + '.png">\n' +
                '<span>'+grade_value.name2+'</span>\n' +
                // class: btnd on / btnd / btnd gray = δ���� / ����ȡ / ����ȡ
                '<a href="javascript:get_cost_award(' + grade + ',1);" class="spr btnd on" onclick="PTTSendClick(\'btn\',\'get_btn3\',\'�����ȡ\')"></a>\n' +
                '</li>\n' +
                '</ul>\n' +
                '</div>\n'

            mySwiper.appendSlide(_html)
        }
    }

    $("#bp_list div.swiper-slide").each(function (index, dom) {
        //�ָ���ʼ״̬
        $(dom).find(".bp_list1 a").removeClass('on').removeClass('gray').addClass('on')
        $(dom).find(".bp_list2 a").removeClass('on').removeClass('gray').addClass('on')
        //����
        let _bp_level = $(dom).attr("bp_lv");
        if (_bp_level <= parseInt(isParams.level)) {
            //�����ȡ
            if (_bp_level <= 20) {
                //�����
                $(dom).find(".bp_list1 a").removeClass('on').removeClass('gray')
            }
            if (isParams.lock == 1) {
                //������
                $(dom).find(".bp_list2 a").removeClass('on').removeClass('gray');
            }
            //�ж��Ƿ��Ѿ���ȡ
            if (_bp_level <= parseInt(isParams.holdnum1)) {
                //���
                $(dom).find(".bp_list1 a").removeClass('gray').removeClass('on').addClass('gray').attr('href', 'javascript:void(0)');
            }
            if (isParams.lock == 1 && _bp_level <= parseInt(isParams.holdnum2)) {
                //����
                $(dom).find(".bp_list2 a").removeClass('gray').removeClass('on').addClass('gray').attr('href', 'javascript:void(0)');
            }
        }
    })

    //��ת����ȡ��λ��
    let to = $("#bp_list").find(".swiper-slide[bp_lv='" + (parseInt(_min_grade) + 1) + "']").attr("order")
    mySwiper.slideTo(parseInt(to) - 1);
}

//ͨ��֤����߽�����ȡ
function get_free_award(level, flag) {
    var flow_925211 = {
        actId: '531996',
        token: '46f3fd',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            level: level
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            var msg = '';
            var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
            $.each(obj, function (k, v) {
                //ȥ������߱�ʶ
                if (v.id != "3852433") {//3852434 ����߱�ʶ
                    msg = "��ϲ������ˣ�" + v.name;
                }
            })
            //����
            isParams.holdnum1++;
            //��ʽ
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

//ͨ��֤�����߽�����ȡ
function get_cost_award(level, flag) {
    var flow_925213 = {
        actId: '531996',
        token: '7ab2d2',
        loading: true, // ����loading����,Ĭ�ϲ�����
        sData: {
            level: level
        },
        success: function (res) {
            console.log(res);
            callbackObj = res.details.modRet
            //������Ϣ����
            var msg = '';
            var obj = tenResult(callbackObj.iPackageIdCnt, callbackObj.sPackageName);
            $.each(obj, function (k, v) {
                //ȥ������߱�ʶ
                if (v.id != "3852434") {
                    msg = "��ϲ������ˣ�" + v.name;
                }
            })
            //����
            isParams.holdnum2++;
            //��ʽ
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

//һ����ȡ
function getPropByBatch() {
    //Ҫ��ȡ�ĵ���level,flag,����(�����/������)
    var list = []
    $("#bp_list div.swiper-slide").each(function (index, dom) {
        //���
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
        alert('��Ǹ��û�п���ȡ�ȼ������ˣ��������ȼ�������ȡ��', function () {
            enter(1);
        })
    }
}

//�Ƿ������ϵ��۳���
function isApp() {
    a = {
        ADTAG: "", //����
        url: 'http://app.daoju.qq.com/act/a20230203cfpl/index.html?plat_support=mqq', //���۳�������ǰ�����۳Ǵ�ָ��ҳ��
        callback: function () {
            //���ڵ��۳��ڴ�
        }
    }
    need(['daoju.util', 'daoju.ui.app'], function (util, app) {
            var _url = "tencent-daojucheng://webpage?url=" + encodeURIComponent(a.url);
            if (/MicroMessenger/gi.test(navigator.userAgent)) {
                WeixinJSBridge.invoke('launchApplication', {
                    "schemeUrl": _url //ԭʼ scheme ����
                }, function (res) {
                    if (res.err_msg == "launchApplication:ok") {

                    } else if (res.err_msg == "launchApplication:fail") {
                        confirm("���������ϵ��۳�APP����", function () {
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
                                    _f("��ǰ�����ϵ��۳�APP����~")
                                }
                            });
                        }else{
                            _f("��ǰ�����ϵ��۳�APP����~~")
                        }
                    });
                } catch (err) {
                    _f("��ǰ�����ϵ��۳�APP������~")
                }
            }
    });
}

function jumpHuya(){
    alert('��ǰ������APP����Ϸ�����ġ��������˺Ź�������ȡ~')
}
function jumpZh(){
    if(isH5){
        // alert('��ǰ���ƻ�APP�ҳ����ȡ~')
        window.open('https://cf.qq.com/app/','_self')
    }else{
        TGDialogS('djc-code')
    }

}

//==================================== ͨ��֤���� end ============================================

function test() {
    flow_926038.sData.num = $('#test').val()
    Milo.emit(flow_926038);
}

var flow_926038 = {
    actId: '531996',
    token: '41ced2',
    loading: true, // ����loading����,Ĭ�ϲ�����
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
        // jumpUrl��תʱ���Ὣcf/NewYearת����cfewYear
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
