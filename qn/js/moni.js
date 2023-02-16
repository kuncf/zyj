
var keynum = 0;
//定义钥匙数量
const Pgailv = [
    ['王者云击（非觉醒版）', 0.1, 20],
    ['雷神-枪娘蕾安娜', 0.2, 12],
    ['火麒麟-枪娘凯萨林',0.2, 12],
    ['毁灭-枪娘格雷姐妹', 0.2, 12],
    ['雷神音效卡 兑换券', 0.3, 10],
    ['火麒麟音效卡 兑换券', 0.3, 10],
    ['毁灭音效卡 兑换券', 0.3, 10],
    ['M4A1-雷神', 0.40, 6],
    ['AK47-火麒麟', 0.4, 6],
    ['Barrett-毁灭', 0.4, 6],
    ['枪娘蕾安娜玩偶', 1, 2],
    ['普通角色通用扩展栏位x1', 1, 1],
    ['王者之石x1', 1.00, 0],
    ['100积分', 0.2, 0],
    ['50积分', 2, 0],
    ['20积分', 20, 0],
    ['10积分', 37, 0],
    ['5积分', 35, 0]
]
//定义初始概率表
var gailvArr = Pgailv;
//定义可修改概率,且初始化。
var gailvnum = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0][0, 0],];
//定义（初始化）概率范围数组
var zjjlt = [];
//定义中奖信息数组
var zcxxz = [];
//定义暂存箱数组
var hzlnum = 0;
//定义徽章令数量
var gjzjcs = 0;
//定义冠军道具中奖次数
var jyz = 0;
//定义经验值
var inst = new mdui.Dialog("#dialog", {
history:false

});
inst.open();

SetGailv();
var empsz = [0, 0];
//定义空概率范围数组
function SetGailv() {
    for (i = 0; i < gailvArr.length; i++) {
        $("#Xgname" + i).val(gailvArr[i][0]);
        $("#Xggl" + i).val(gailvArr[i][1]);
        if (i == 0) {
            empsz = [1, gailvArr[0][1] * 100];
            gailvnum[i] = empsz;
        }
        else {
            empsz = [gailvnum[i - 1][1] + 1, gailvnum[i - 1][1] + gailvArr[i][1] * 100];
            gailvnum[i] = empsz;
        }
    }

}
//设置概率方法
Fjkeytable();
function Fjkeytable(){
    for (let index = 0; index < gailvArr.length; index++) {
        $("#gailvtable").prepend("<tr><td>"+gailvArr[gailvArr.length-index-1][0]+"</td><td>"+gailvArr[gailvArr.length-index-1][1]+"%</td></tr>");

        if(gailvArr[gailvArr.length-index-1][2]>0)
        {
            $("#fjystb").prepend("<tr><td class='fjysb1'>"+gailvArr[gailvArr.length-index-1][0]+"</td><td class='fjysb2'>"+gailvArr[gailvArr.length-index-1][2]+"</td></tr>");

        }
        

    }
}
//设置分解钥匙表方法
function KeyAdd(addnum) {

    keynum = keynum + addnum;
    if (addnum > 0) {
        //alert("您已成功添加"+addnum+"把钥匙！");
    }
    Sxsj();
}
// 添加钥匙方法

function PTTSendClick1() {
    if (keynum < 1) {
        $("#xtxx").text("抱歉，您的钥匙数量不足。");
        Showwd("#xttc")
    }
    else {
        var sjs = Math.ceil(Math.random() * 10000);
        //生成随机范围` 
        for (j = 0; j < gailvArr.length; j++) {
            var zxs = gailvnum[j][0]
            var zds = gailvnum[j][1]
            if (sjs >= zxs && sjs <= zds) {
                $("#dczjxx").text(gailvArr[j][0]);
                SetjlZcx(j);
            
                if (j == 12) {
                    jyz = jyz + 1000;
                }
                if (j == 13) {
                    jyz = jyz + 500;
                }
                if (j == 14) {
                    jyz = jyz + 200;
                }
                if (j == 15) {
                    jyz = jyz + 100;
                }
            }

        }

        Sxjyz();
        Showwd("#pop4")
        KeyAdd(-1)

    }
}
//单抽方法


function PTTSendClick10() {
    if (keynum < 10) {
        $("#xtxx").text("抱歉，您的钥匙数量不足。");
        Showwd("#xttc")
    }
    else {
        for (let index = 0; index < 10; index++) {
            var sjs = Math.ceil(Math.random() * 10000);
            //生成随机范围` 
            for (var j = 0; j < gailvArr.length; j++) {
                var zxs = gailvnum[j][0]
                var zds = gailvnum[j][1]
                if (sjs >= zxs && sjs <= zds) {
                    SetjlZcx(j);
                    $("#jlname" + index).text(gailvArr[j][0]);
               
                    if (j == 12) {
                        jyz = jyz + 1000;
                    }
                    if (j == 13) {
                        jyz = jyz + 500;
                    }
                    if (j == 14) {
                        jyz = jyz + 200;
                    }
                    if (j == 15) {
                        jyz = jyz + 100;
                    }
                }

            }



        }



        Showwd("#pop3")
        KeyAdd(-10);
        Sxjyz();
    }

}
//十连方法

var hzldh=[
    ["Knife-冠军之刃",4800,true],
    ["QBZ03-冠军之薇皮肤",4800,true],
    ["柯尔特-冠军之特",3600,true],
    ["火麒麟-冠军之心皮肤",2000,true],
    ["毁灭-冠军之怒皮肤",2000,true],
    ["雷神-冠军之魄皮肤",2000,true],
    ["修罗-冠军之魂皮肤",1200,true],
    ["黄金猫猫手套-白鲨",2400,true],
    ["擎天-惨叫迹",2400,true],
    ["选手语音包兑换券四选一",2400,true],
    ["职业选手",900,true],]
   // hzlnum=9000;
function amsExchange(pid){
var sb=pid-1;
if(hzlnum>=hzldh[sb][1]&&hzldh[sb][2])
{
$("#dhbtn"+pid).addClass("gray");
let time = new Date()
        ksz[0] =
        ksz[1] = "模拟大区一区";
        ksz[2] = hzldh[sb][0];
        zjjlt.push(ksz);
        $("##getGiftContent_all").prepend("<tr><td>" + time.toLocaleString() + "</td><td>" + ksz[1] + "</td><td>" + ksz[2] + "</td></tr>");
        hzlnum=hzlnum-hzldh[sb][1];
        $(".jf_3782").text(hzlnum);
        hzldh[sb][2]=false;
        $("#xtxx").text("恭喜获得礼包：" + ksz[2]);
        Showwd("#xttc");
}
else if(hzlnum<hzldh[sb][1]&&hzldh[sb][2]){

$("#xtxx").text("您的徽章令不够。");
        Showwd("#xttc");
}
        

}
//徽章兑换方法

function Sxsj() {
    $("#Keynum").text(keynum);



}
//刷新数据方法

var sjsz = [];
var levelnum = 0;
//定义等级
function Sxjyz() {
    for (let index = 0; index < 300; index++) {
        for (let index2 = 0; index2 < 9; index2++) {
            sjsz.push([10, true])

        }
        sjsz.push([20, true])
        sjsz[0][0] = 50;
    }
var djcome=jyz+"";
var sbjyz=djcome.substring(djcome.length-2,djcome.length);
    $("#jyz").text(sbjyz);
    $(".jdt.progress_width").css("transition-duration", "1s");
  $(".jdt.progress_width").css("width",sbjyz+"%");
    $("#djt").text(Math.trunc(jyz / 100));
    levelnum = Math.trunc(jyz / 100);
for (let index = 0; index < levelnum; index++) {
$(".bp_list2").eq(index).children("a").removeClass("on");
$(".bp_list1").eq(index).children("a").removeClass("on");
}
}
Sxjyz();
//刷新经验值和徽章令的方法
function Showwd(wid) {

    $("#zhezhao").css("display", "block");
    $("#ycrq").css("display", "block");
    $(wid).css("display", "block");
    $(wid).addClass("cjxuanfu");

}
// 打开弹窗方法
function ChangeGailv() {
    for (i = 0; i < Pgailv.length; i++) {
        gailvArr[i][0] = $("#Xgname" + i).val();
        gailvArr[i][1] = $("#Xggl" + i).val() * 1;

    }

    SetGailv();
    ShutWindow();
    $("#xtxx").text("概率和名称已保存");
    Showwd("#xttc")


}
//设置概率的方法

function ResetGailv() {
    gailvArr = [
        ['王者云击（非觉醒版）', 0.1, 20],
        ['雷神-枪娘蕾安娜', 0.2, 12],
        ['火麒麟-枪娘凯萨林',0.2, 12],
        ['毁灭-枪娘格雷姐妹', 0.2, 12],
        ['雷神音效卡 兑换券', 0.3, 10],
        ['火麒麟音效卡 兑换券', 0.3, 10],
        ['毁灭音效卡 兑换券', 0.3, 10],
        ['M4A1-雷神', 0.40, 6],
        ['AK47-火麒麟', 0.4, 6],
        ['Barrett-毁灭', 0.4, 6],
        ['枪娘蕾安娜玩偶', 1, 2],
        ['普通角色通用扩展栏位x1', 1, 1],
        ['王者之石x1', 1.00, 0],
        ['100积分', 0.2, 0],
        ['50积分', 2, 0],
        ['20积分', 20, 0],
        ['10积分', 37, 0],
        ['5积分', 35, 0]
    ]

    SetGailv();
    ShutWindow();
    $("#xtxx").text("概率和名称已重置");
    Showwd("#xttc")

}
//重置概率方法

var zjcs = 0;
var ksz = ["", "", ""]
var ksz2 = ["", 1, false];
function SetjlZcx(pid) {
    let time = new Date()
    ksz[0] = time.toLocaleString();
    ksz[1] = "模拟大区一区";
    ksz[2] = gailvArr[pid][0];
    zjjlt.push(ksz);
    $("#getGiftContent_all").prepend("<tr><td>" + ksz[0] + "</td><td>" + ksz[1] + "</td><td>" + ksz[2] + "</td></tr>");



    if (gailvArr[pid][2] > 0) {
        ksz2[0] = gailvArr[pid][0];
        ksz2[1] = gailvArr[pid][2];

        zcxxz.push(ksz2);

        $("#getGiftContent").prepend(" <tr id='zcxid" + zjcs + "'><td>" + ksz2[0] + "</td><td> <a onclick='Fjkey(" + gailvArr[pid][2] + "," + zjcs + ")'  id='fjbtnid" + zjcs + "'>[分解]</a></td></tr>");
        console.log(zcxxz)
        zjcs++;
    }


}


var zcxbcdk = false;
function Fjkey(kn, zcxid) {
    KeyAdd(kn);
    ShutWindow();
    $("#xtxx").text("恭喜获得礼包：分解钥匙*" + kn);
    Showwd("#xttc")
    zcxbcdk = true;
    $("#zcxid" + zcxid).children().css("color", "grey")
    //$("#fckid" + zcxid).before("发送仓库")
    $("#fckid" + zcxid).remove();
    $("#fjbtnid" + zcxid).before("已分解")
    $("#fjbtnid" + zcxid).remove();



}
//分解钥匙方法







var yjlq=0;
function getPropByBatch(){
for(i=0;i<levelnum;i++)
{
get_cost_award(i+1, 1);
if(i<20)
{
get_free_award(i+1, 1);
}

}
$("#xtxx").text("一键领取完毕");
}
//一件领取方法

function ShutWindow() {
    $("#zhezhao").css("display", "none");
    $(".pop").css("display", "none");
    $(".dialog").css("display", "none");
    $(".amsdialog_modal").css("display", "none")

}

$(".amsdialog_bconfirm").click(
    function () {
        ShutWindow()
        if (zcxbcdk) {
            Showwd('#pop1')
            zcxbcdk = false;
        }
    })
$(".dia-close").click(
    function () {
        ShutWindow()
    });
$(".amsdialog_close").click(
    function () {
        ShutWindow()
        if (zcxbcdk) {
            Showwd('#pop1')
            zcxbcdk = false;
        }
    })
