function IEVersion() {
    var userAgent = navigator.userAgent;
    //ȡ���������userAgent�ַ���
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    //�ж��Ƿ�IE<11�����
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    //�ж��Ƿ�IE��Edge�����
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;
            //IE�汾<=7
        }
    } else if (isEdge) {
        return 'edge';
        //edge
    } else if (isIE11) {
        return 11;
        //IE11
    } else {
        return -1;
        //����ie�����
    }
}
var version = IEVersion();
if (version != "edge" && version != -1 && version <= 9 && location.hostname == "act.daoju.qq.com") {
    alert("�װ�����ң�����������汾���ͣ���������������汾���Ƽ���ʹ��chrome������Ի�ø��������顣");
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        if(location.hostname == "app.daoju.qq.com"){
            return;
        }
        if (window.location.search) {
            // window.location.href = '//app.daoju.qq.com' + location.pathname + window.location.search + '&plat_support=mqq';
            window.location.href = '//app.daoju.qq.com' + location.pathname + window.location.search;
        } else {
            window.location.href = '//app.daoju.qq.com' + location.pathname;
        }
    } else {
        if(location.hostname == "act.daoju.qq.com"){
            return;
        }
        location.href = '//act.daoju.qq.com'+location.pathname + window.location.search
    }

}
browserRedirect();


function TGDialogS(e) {
    // ����milo������dialog���
    need("biz.dialog", function(Dialog) {
        Dialog.show({
            id: e,
            bgcolor: '#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity: 70 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}

function closeDialog() {
    // ����milo������dialog���
    need("biz.dialog", function(Dialog) {
        Dialog.hide();
    });
}


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


//�Ƿ������ϵ��۳���
function isApp(a) {
    a = $.extend({
        ADTAG: "", //����
        url: location.href, //���۳�������ǰ�����۳Ǵ�ָ��ҳ��
        callback: function () {
            //���ڵ��۳��ڴ�
        }
    }, a);
    need(['daoju.util', 'daoju.ui.app'], function (util, app) {
        setTimeout(function () {
            if (app.isApp()) {
                $.isFunction(a.callback) && a.callback();
            } else {
                var _url = "tencent-daojucheng://webpage?url=" + encodeURIComponent(a.url);
                if (isWxApp()) {
                    WeixinJSBridge.invoke('launchApplication', {
                        "schemeUrl": _url //ԭʼ scheme ����
                    }, function (res) {
                        if (res.err_msg == "launchApplication:ok") {
                            //alert(res.err_msg);
                        } else if (res.err_msg == "launchApplication:fail") {
                            confirm("���������ϵ��۳�APP����", function () {
                                location.href = location.protocol + "//app.daoju.qq.com/download/all.htm?ADTAG=" + a.ADTAG;
                            });
                        }
                    });
                } else {
                    util.getScript("//daoju.qq.com/app/js/url.js", function () {
                        if (milo.browser.android() || milo.browser.ios()) {
                            app.pingUrl(_url, function (b) {
                                if (b) {
                                    location.href = _url;
                                } else {
                                    confirm("���������ϵ��۳�APP����", function () {
                                        location.href = location.protocol + "//app.daoju.qq.com/download/all.htm?ADTAG=" + a.ADTAG;
                                    });
                                }
                            });
                        } else {
                            alert("�Բ���Ŀǰֻ֧�ְ�׿��ios���۳�app");
                        }
                    });
                }
            }
        }, 500);
    });
}

//�ж�΢��app
function isWxApp() {
    return /MicroMessenger/gi.test(navigator.userAgent);
}

// ���ϵ��۳�
function isDjcApp() {
    return typeof HostApp != "undefined" || milo.cookie.get("djc_appVersion") != null;
}

//�ж��ƻ�
function isZhApp(){
    return /GameHelper_1001/.test(navigator.userAgent) || /cfapp/.test(navigator.userAgent);
}
//���������ݽ������
function tenResult(iPackageIdCnt, sPackageName) {
    var idArr = iPackageIdCnt.substring(0, iPackageIdCnt.length - 1).split(",");
    var nameArr = sPackageName.split(",");
    var obj = [];

    $.each(idArr, function (k, v) {
        tmp = {
            id: v.split(":")[0],
            name: nameArr[k]
        }
        num = v.split(":")[1];
        for (var i = 0; i < num; i++) {
            obj.push(tmp)
        }
    })
    //console.log(obj)
    return obj;
}