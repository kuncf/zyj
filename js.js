var jfnum = 0;
// 积分数量-抽奖积分
var zsnum = 0;
//钻石数量-碎片数量
var mnnum = 0;
//点券数量-点券
var jbnum = 0;
//金币数量-折扣券数量
var xyznum = 0;
//幸运值
var sjnum = 0;


var CznumArr = [1, 6, 30, 68, 128, 198, 328, 648];
var CznumAddArr = [0, 0, 108, 288, 588, 1088, 1788, 3588]
//充值数额数组
var jfvdtimeArr = [1160, 1120, 1120, 6190]
var jfwlvdtimeArr = [7000, 9200]
//积分抽奖视频时长数组
var Jlisz = [
    /**1*/["至臻 玉剑传说 小小索拉卡", 0.001, false],
/**2*/["至臻 剪纸仙灵 小小格温", 0.001, false],
/**3*/["至臻神龙尊者 小小李青", 0.001, false],
/**4*/["至臻玉剑传说 小小艾瑞莉娅", 0.001, false],
/**5*/["至臻 小小亚索", 0.01, false],
/**6*/["玉剑传说 小小莫甘娜", 0.01, false],
/**7*/["神凰行者 小小萨勒芬妮", 0.01, false],
/**8*/["玉剑传说 小小泰隆", 0.01, false],
/**9*/["玉剑传说 小小艾瑞莉娅", 0.01, false],
/**10*/["灵魂镣铐 1星", 1, false],
/**11*/["流星坠落 1星", 1, false],
/**12*/["焰凰烈羽 1星", 1, false],
/**13*/["【表情】不错哟", 1, false],
/**14*/["【表情】那当然", 1, false],
/**15*/["【表情】邪恶", 1, false],
/**16*/["【表情】羡慕", 1, false],
/**17*/["【表情】天呀！", 1, false],
/**18*/["【表情】晕", 1, false],
/**19*/["【表情】打哈欠", 1, false],
/**20*/["【表情】比试比试", 1, false],
/**21*/["【表情】胜利风范", 1, false],
/**22*/["至臻 玉剑传说 小小索拉卡 头像", 1, false],
/**23*/["玉剑传说 小小莫甘娜 头像", 1, false],
/**24*/["至臻神龙尊者 小小李青 头像", 1, false],
/**25*/["至臻 玉剑传说 小小艾瑞莉娅 头像", 0, false],
/**26*/["至臻 玉剑传说 小小索拉卡 聊天气泡", 2, false],
/**27*/["玉剑传说 小小莫甘娜 聊天气泡", 2, false],
/**28*/["至臻 玉剑传说 小小索拉卡 头像框", 0, false],
/**29*/["玉剑传说 小小莫甘娜 头像框", 1, false],
/**30*/["神凰行者 小小萨勒芬妮 头像框", 1, false],
/**31*/["魔法乱斗小小英雄蛋", 3, false],
/**32*/["龙龙公仔", 4, false],
/**33*/["至臻之约碎片10", 5, false],
/**34*/["至臻之约碎片x5", 10.989 - 0.043, false],
/**35*/["至臻之约碎片x4", 10, false],
/**36*/["至臻之约碎片x3", 10, false],
/**37*/["至臻之约碎片x2", 20, false],
/**38*/["至臻之约碎片x1", 20, false]

]
var ChouguoArr = [0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
]
var xianzhiArr = [
    /**1*/["至臻 玉剑传说 小小索拉卡", 0],
/**2*/["至臻 剪纸仙灵 小小格温", 0],
/**3*/["至臻神龙尊者 小小李青", 0],
/**4*/["至臻玉剑传说 小小艾瑞莉娅", 0],
/**5*/["至臻 小小亚索", 0],
/**6*/["玉剑传说 小小莫甘娜", 1],
/**7*/["神凰行者 小小萨勒芬妮", 1],
/**8*/["玉剑传说 小小泰隆", 1],
/**9*/["玉剑传说 小小艾瑞莉娅", 1],
/**10*/["灵魂镣铐 1星",3 ],
/**11*/["流星坠落 1星", 3],
/**12*/["焰凰烈羽 1星", 3],
/**13*/["【表情】不错哟", 1],
/**14*/["【表情】那当然", 1],
/**15*/["【表情】邪恶", 1],
/**16*/["【表情】羡慕", 1],
/**17*/["【表情】天呀！", 1],
/**18*/["【表情】晕", 1],
/**19*/["【表情】打哈欠", 1],
/**20*/["【表情】比试比试", 1],
/**21*/["【表情】胜利风范", 1],
/**22*/["至臻 玉剑传说 小小索拉卡 头像", 1],
/**23*/["玉剑传说 小小莫甘娜 头像", 1],
/**24*/["至臻神龙尊者 小小李青 头像", 1],
/**25*/["至臻 玉剑传说 小小艾瑞莉娅 头像", 1],
/**26*/["至臻 玉剑传说 小小索拉卡 聊天气泡", 1],
/**27*/["玉剑传说 小小莫甘娜 聊天气泡", 1],
/**28*/["至臻 玉剑传说 小小索拉卡 头像框", 1],
/**29*/["玉剑传说 小小莫甘娜 头像框", 1],
/**30*/["神凰行者 小小萨勒芬妮 头像框", 1],
/**31*/["魔法乱斗小小英雄蛋", 99993],
/**32*/["龙龙公仔", 9999],
/**33*/["至臻之约碎片10", 9999],
/**34*/["至臻之约碎片x5", 9999],
/**35*/["至臻之约碎片x4", 19999],
/**36*/["至臻之约碎片x3", 19999],
/**37*/["至臻之约碎片x2", 19999],
/**38*/["至臻之约碎片x1", 19999]

]
var gailvarr = [['荣耀水晶', 0, 2],
['偶像歌手', 2, 22],
['拳王', 22, 42],
['钟馗', 42, 82],
['李白', 82, 122],
['幸运夺宝自选礼包', 122, 522],
['皮肤碎片', 522, 922],
['英雄碎片', 922, 1522],
['铭文碎片', 1522, 1542],
['战令币', 1542, 2102],
['荣耀战令100经验礼包', 2102, 4102],
['荣耀战令100经验礼包', 4102, 7102],
['浓情玫瑰', 7102, 8102],
['钻石', 8102, 10000]]

var gaigailvbool = true;
Tiaodagailv()
//开发者调试概率
var sgbb = false;
var sgtk = false;
var sum = 0;
var soundclick_0 = new Howl({
    src: ['sd/click_0.mp3']
});
var soundclick_1 = new Howl({
    src: ['sd/click_1.mp3']
});
var soundclick_2 = new Howl({
    src: ['sd/click_2.mp3']
});
var sd_dcbtg = new Howl({
    src: ['sd/单抽不跳过.mp3']
});
var sd_dctg = new Howl({
    src: ['sd/单抽跳过.mp3']
});
var sd_slbtg = new Howl({
    src: ['sd/十连不跳过.mp3']
});
var sd_sltg = new Howl({
    src: ['sd/十连跳过.mp3']
});
var sd_close = new Howl({
    src: ['sd/close.mp3']
});
var sd_dqbugou = new Howl({
    src: ['sd/dqbugou.mp3']
});
var sd_jfadd = new Howl({
    src: ['sd/jfadd.mp3']
});
var sd_jfadd10 = new Howl({
    src: ['sd/jfadd10.mp3']
});

jQuery(function ($) {

    $(".btn").click(function () {

        soundclick_0.play();
    }
    );
    $(".jf_cjbtn").click(function () {

        soundclick_1.play();
    }
    );
    $(".sd_click1").click(function () {

        soundclick_1.play();
    }
    );
    $(".sd_click2").click(function () {

        soundclick_2.play();
    }
    );

    $(".sd_close").click(function () {

        sd_close.play();
    }
    );
});
// 遍历数组中的每个子数组
for (var i = 0; i < Jlisz.length; i++) {
    // 访问每个子数组的第二个元素（概率）并累加到 sum 中
    sum += Jlisz[i][1];
}

// 输出概率的和
console.log(sum);
var gailvArr = Jlisz;
//定义可修改概率,且初始化。
var gailvnum = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
//定义（初始化）概率范围数组
function ResetGailv() {
    var restgl =[
        /**1*/["至臻 玉剑传说 小小索拉卡", 0.001, false],
    /**2*/["至臻 剪纸仙灵 小小格温", 0.001, false],
    /**3*/["至臻神龙尊者 小小李青", 0.001, false],
    /**4*/["至臻玉剑传说 小小艾瑞莉娅", 0.001, false],
    /**5*/["至臻 小小亚索", 0.01, false],
    /**6*/["玉剑传说 小小莫甘娜", 0.01, false],
    /**7*/["神凰行者 小小萨勒芬妮", 0.01, false],
    /**8*/["玉剑传说 小小泰隆", 0.01, false],
    /**9*/["玉剑传说 小小艾瑞莉娅", 0.01, false],
    /**10*/["灵魂镣铐 1星", 1, false],
    /**11*/["流星坠落 1星", 1, false],
    /**12*/["焰凰烈羽 1星", 1, false],
    /**13*/["【表情】不错哟", 1, false],
    /**14*/["【表情】那当然", 1, false],
    /**15*/["【表情】邪恶", 1, false],
    /**16*/["【表情】羡慕", 1, false],
    /**17*/["【表情】天呀！", 1, false],
    /**18*/["【表情】晕", 1, false],
    /**19*/["【表情】打哈欠", 1, false],
    /**20*/["【表情】比试比试", 1, false],
    /**21*/["【表情】胜利风范", 1, false],
    /**22*/["至臻 玉剑传说 小小索拉卡 头像", 1, false],
    /**23*/["玉剑传说 小小莫甘娜 头像", 1, false],
    /**24*/["至臻神龙尊者 小小李青 头像", 1, false],
    /**25*/["至臻 玉剑传说 小小艾瑞莉娅 头像", 0, false],
    /**26*/["至臻 玉剑传说 小小索拉卡 聊天气泡", 2, false],
    /**27*/["玉剑传说 小小莫甘娜 聊天气泡", 2, false],
    /**28*/["至臻 玉剑传说 小小索拉卡 头像框", 0, false],
    /**29*/["玉剑传说 小小莫甘娜 头像框", 1, false],
    /**30*/["神凰行者 小小萨勒芬妮 头像框", 1, false],
    /**31*/["魔法乱斗小小英雄蛋", 3, false],
    /**32*/["龙龙公仔", 4, false],
    /**33*/["至臻之约碎片10", 5, false],
    /**34*/["至臻之约碎片x5", 10.989 - 0.043, false],
    /**35*/["至臻之约碎片x4", 10, false],
    /**36*/["至臻之约碎片x3", 10, false],
    /**37*/["至臻之约碎片x2", 20, false],
    /**38*/["至臻之约碎片x1", 20, false]
    
    ];

    for (let index = 0; index < restgl.length; index++) {
        gailvArr[index][0] = restgl[index][0];
        gailvArr[index][1] = restgl[index][1];

    }

    SetGailv();
    $("#gailvtip").text("已重置");
    $("#gailvtip").css("color", "rgba(255, 91, 91,1)");
    setTimeout(() => {
        $("#gailvtip").css("color", "rgba(255, 91, 91,0)");
    }, 2000);

}
function ChangeGailv() {
    for (i = 0; i < gailvArr.length; i++) {
        gailvArr[i][0] = $("#Xgname" + i).val();
        gailvArr[i][1] = $("#Xggl" + i).val() * 1;

    }

    SetGailv();
    $("#gailvtip").text("已设置");
    $("#gailvtip").css("color", "rgba(255, 91, 91,1)");
    setTimeout(() => {
        $("#gailvtip").css("color", "rgba(255, 91, 91,0)");
    }, 2000);

}

SetGailv();
var empsz = [0, 0];
//定义空概率范围数组
function SetGailv() {
    for (i = 0; i < gailvArr.length; i++) {
        $("#Xgname" + i).val(gailvArr[i][0]);
        $("#Xggl" + i).val(gailvArr[i][1]);
        if (i == 0) {
            empsz = [1, gailvArr[0][1] * 10000];
            gailvnum[i] = empsz;
        }
        else {
            empsz = [gailvnum[i - 1][1] + 1, gailvnum[i - 1][1] + gailvArr[i][1] * 10000];
            gailvnum[i] = empsz;
        }
    }
    gailvnum[gailvnum.length - 1][1] = 1000000;
    console.log(gailvnum)
}
function AddTopTip2() {
    toptipid2 = toptipid2 + 1;
    var sb = $("body").append("<div class='tiptopbox' id='topTip" + toptipid2 + "'><div class='toptipbox'> <div class='toptiptext'>游戏重连成功</div> </div></div>");
    setTimeout(function () {
        $("#topTip" + toptipid2).remove();

    }, 4000)

}


function GetJliid() {
    var sjs = Math.floor(Math.random() * 1000000);
    var thej = 0;

    for (let index = 0; index < Jlisz.length; index++) {
        var zds = gailvnum[index][1];
        var zxs = gailvnum[index][0];

        if (sjs > zxs && sjs <= zds) {
            thej = index;

        }
    }
    var shifouchaoguo = false;

    var xianzhi = xianzhiArr[thej][1];
    var yichounum = ChouguoArr[thej];
    if (yichounum >= xianzhi) {
        console.log(xianzhiArr[thej][0] + "  限制:  " + xianzhi + "  已抽出:  " + yichounum + "次");
        shifouchaoguo = true;
    }


    if (shifouchaoguo) {
        return GetJliid();
    }
    else {
        if (thej < 5 && Jlisz[thej][2] == false) {
            Jlisz[thej][2] = true;
        }
        console.log("sjs:" + sjs + Jlisz[thej][0])
        ChouguoArr[thej] = ChouguoArr[thej] + 1;
        if(thej==9){
           Jlisz[thej][0]="灵魂镣铐 "+(ChouguoArr[9])+"星";
        }
        if(thej==10){
           Jlisz[thej][0]="流星坠落 "+(ChouguoArr[10])+"星";
        }
        if(thej==11){
           Jlisz[thej][0]="焰凰烈羽 "+(ChouguoArr[11])+"星";
        }
        var Zhekousjs=Math.random()*10;
        if(Zhekousjs<=1){
            AddZhekounum=AddZhekounum+1;
        }
        return thej;
    }
}

function ShowGailv() {
    for (let index = 0; index < Jlisz.length; index++) {
        $("#Xgname" + index).val(Jlisz[index][0]);
        $("#Xggl" + index).val(Jlisz[index][1]);
    }
}

function Tiaodagailv() {
    if (gaigailvbool) {
        for (let index = 0; index < 11; index++) {

            $("#Xggl" + index).val(3);

        }
    }

}
function sdjsajd() {
    var jlstr = ""
    var iopp = 0;

    for (let index = 0; index < Jlisz.length; index++) {
        var sdwqadsa = iopp + Jlisz[index][1] * 100

        var thstr = "['" + Jlisz[index][0] + "'," + iopp + "," + sdwqadsa + "],\n"
        jlstr = jlstr + thstr;
        iopp = sdwqadsa;
    }
    console.log(jlstr)
}
var opboxnum = 0;
var LjcjcsArr = [20, 30, 50, 100, 150, 200, 288, 388, 388];
var LjjlboolArr = [false, false, false, false, false, false, false, false];
var Ljidangwei = 0;
var need10jf=60;
var need1jf=6;
var need100jf=600;
var opboxboolArr = [[5, 0], [15, 0], [35, 0], [65, 0], [125, 0]];
//开箱次数奖励bool 0=未解锁 1=已解锁，未领取 2=已领取；
function Sxsj() {
    $(".text_jf").text(jfnum);
    $(".text_jb").text(jbnum);
    $(".text_zs").text(zsnum);
    $(".text_mn").text(mnnum);
    $(".text_sjsl").text(sjnum);
    $(".boxnum").text(opboxnum);
    if(jbnum>0){
        need1jf=3;
        $(".zhekoubtn").css("display","block");
        if(jbnum>=10){
            $(".zhekoumn_10").text(30)
            need10jf=30;
        }
        else
        {
            $(".zhekoumn_10").text(60-jbnum*3)
            need10jf=60-jbnum*3;
        }
        if(jbnum>=100){
            $(".zhekoumn_100").text(300)
            need100jf=300;
        }
        else
        {
            $(".zhekoumn_100").text(600-jbnum*3)
            need100jf=600-jbnum*3;
        }
    }
    else
    {
     need10jf=60;
 need1jf=6;
 need100jf=600;
        $(".zhekoubtn").css("display","none");
    }
    if (xyznum < LjcjcsArr[0]) { Ljidangwei = -1 }
    if (xyznum >= LjcjcsArr[0]) { Ljidangwei = 0 }
    if (xyznum >= LjcjcsArr[1]) { Ljidangwei = 1 }
    if (xyznum >= LjcjcsArr[2]) { Ljidangwei = 2 }
    if (xyznum >= LjcjcsArr[3]) { Ljidangwei = 3 }
    if (xyznum >= LjcjcsArr[4]) { Ljidangwei = 4 }
    if (xyznum >= LjcjcsArr[5]) { Ljidangwei = 5 }
    if (xyznum >= LjcjcsArr[6]) { Ljidangwei = 6 }
    if (xyznum >= LjcjcsArr[7]) { Ljidangwei = 7 }
    var Jibenjd = (100 / 8) * (Ljidangwei + 1);
    var dqchazhi = LjcjcsArr[Ljidangwei + 1] - xyznum;
    var dangweichazhi = LjcjcsArr[Ljidangwei + 1] - LjcjcsArr[Ljidangwei]
    if (Ljidangwei == -1) { dangweichazhi = 20; }
    var Fujiajd = (dangweichazhi - dqchazhi) / dangweichazhi * 100 / 12.5;
    $(".ljjdt_inside").css("width", (Jibenjd + Fujiajd) + "%")
    $(".zzhnum").text(dqchazhi)
    if (Ljidangwei == -1) { ChoseLj(0) } else { ChoseLj(Ljidangwei) }
    console.log("挡位：" + (Ljidangwei + 1) + "基本进度:" + Jibenjd + "附加进度:" + Fujiajd + "当前差值:" + dqchazhi + "挡位差值:" + dangweichazhi)
    if (xyznum > 387) {
        $(".ljjdt_inside").css("width", "100%")
    }
    maxbuyjfnum = Math.floor(mnnum / 100)
    $(".jdredpoint").css("display", "none")
    if (opboxnum < 6) { $(".maxboxnum").text(5) }
    if (opboxnum > 6) { $(".maxboxnum").text(15) }
    if (opboxnum > 15) { $(".maxboxnum").text(35) }
    if (opboxnum > 35) { $(".maxboxnum").text(65) }
    if (opboxnum > 65) { $(".maxboxnum").text(125) }
    for (let index = 0; index < opboxboolArr.length; index++) {
        if (opboxnum >= opboxboolArr[index][0] && opboxboolArr[index][1] == 0) {
            opboxboolArr[index][1] = 1;
        }
    }
    for (let index2 = 0; index2 < opboxboolArr.length; index2++) {
        if (opboxboolArr[index2][1] == 1) {
            $(".jdredpoint").css("display", "block")

        }

    }
  //  console.log("\n\n-----------------------\n\n")
    for (let index = 0; index < DhuanedArr.length; index++) {
        if(DhuanedArr[index])
            {
                $(".Yiduihuan"+index).css("display","block");
            }
    //    console.log(index + " : " + xianzhiArr[index][0] + " 抽过: " + ChouguoArr[index]);
    }
    console.log("\n\n-----------------------\n\n")
    if (xyznum >= 100) { var xyzsz = xyznum }
    if (xyznum < 100) { var xyzsz = "0" + xyznum }
    if (xyznum < 10) { var xyzsz = "00" + xyznum }
    if (Tiaoguo) { $(".Tiaoguobtn").addClass("Tiaoguobtn_on") }
    else { $(".Tiaoguobtn").removeClass("Tiaoguobtn_on") }

    $(".xyznum").text(xyznum);

    $("#xyzip").val(xyznum);
    $("#jfip").val(jfnum);
    $("#jbip").val(jbnum);
    $("#zsip").val(zsnum);
    $("#mnip").val(mnnum);
    $("#sjip").val(sjnum);
    $("#xfip").val(yixiaofei);

for (let index4 = 0; index4 < LjjlboolArr.length; index4++) {
  if(LjjlboolArr[index4])
    {
        $(".lityuan"+index4).addClass("lityuan_ed")
    }
}

    ShowGailv()
   // Showvip();
}
//刷新数据方法
function SaveMoney() { mnnum = parseInt($("#mnip").val()); Sxsj() }
function SaveJf() { jfnum = parseInt($("#jfip").val()); Sxsj() }
function Savejb() { jbnum = parseInt($("#jbip").val()); Sxsj() }
function Savezs() { zsnum = parseInt($("#zsip").val()); Sxsj() }
function Savexyz() { xyznum = parseInt($("#xyzip").val()); Sxsj() }
function Saverysj() { sjnum = parseInt($("#sjip").val()); Sxsj() }
function SaveVip() { yixiaofei = parseInt($("#xfip").val()); Sxsj(); Showvip() }
var dqcznum = 0;
var dqczzsnum = 0;
function ShowChongzhi(czid) {
    soundclick_2.play();
    czid = czid + 1;
    dqcznum = CznumArr[czid];
    dqczzsnum = CznumAddArr[czid];
    $(".Czaqbox").css("display", "block");
    setTimeout(function () {
        $(".Czaqbox").css("display", "none");
        ShowCzzhezhao();
        $(".czmoney").text(dqcznum)
    }, 1000)
}
//打开充值方法
function ShowCzzhezhao() {
    $(".fukuanbg1").removeClass("fkloaddha");
    Showbox(".czzhezhao");
    $(".czzhezhao").addClass("czzhezhaodh");
    Showbox(".czaqimg")
    setTimeout(function () {
        CloseBox(".czaqimg")
        Showbox(".fukuanbg1")
    }, 1)
}
//打开充值遮罩
function wepay() {
    CloseBox(".fukuanbg1");
    Showbox(".sysmzf")
}
//打开微信支付
function Jixucz() {
    CloseBox(".sysmzf");
    $(".fukuanbg1").addClass("fkloaddha");
    Showbox(".fukuanbg1");
    setTimeout(function () {
        CloseBox(".fukuanbg1");
        Showbox(".czewm");
    }, 700)
}
//确认继续支付
function Czcg() {
    mnnum = mnnum + (dqcznum * 100) + dqczzsnum;
    CloseBox(".czewm");
    Showbox(".czload2");
    setTimeout(function () {
        CloseBox(".czload2");
        Showbox(".czcgbox");

        setTimeout(function () {
            Sxsj();
        }, 1500)
    }, 200)
}
//支付成功
var Choucishu = 0;
function JfChou(chounum) {
    Choudecishu = chounum
    if (chounum == 1) {
        if (jfnum < need1jf) {
            buyjfnum = need1jf - jfnum;
            openBuyjf();
            ShowBuyjf()
        }
        else {
            dchouing = false;
            Choucishu = chounum;
            $("#tipXhnum").text(need1jf)
            $(".Jfchouqrbox").addClass("Show")
            $(".Jfdbbox").addClass("mohu")
        }
    }

    if (chounum == 10) {
        if (jfnum < need10jf) {
            openBuyjf();
            buyjfnum = need10jf - jfnum;
            openBuyjf();
            ShowBuyjf()
        }
        else {
            dchouing = false;
            Choucishu = chounum;
            $("#tipXhnum").text(need10jf)
            $(".Jfchouqrbox").addClass("Show")
            $(".Jfdbbox").addClass("mohu")
        }
    }

    if (chounum == 100) {
        if (jfnum < need100jf) {
            openBuyjf();
            buyjfnum = need100jf - jfnum;
            openBuyjf();
            ShowBuyjf()
        }
        else {

        }
    }
}
//抽奖函数

var Beginchoubool = false;
function BeginChddou() {
    if (Beginchoubool) { return; }
    if (Choucishu == 1) {
        jfnum = jfnum - 45;
        Beginchoubool = true;
        $("html").css("cursor", "none");
        var sjs = Math.floor(Math.random() * jfvdtimeArr.length);
        $("#jfchoubgvd").attr("src", "vd/chou/jfchou" + sjs + ".mp4");
        setTimeout(function () {
            $(".xyznum").addClass("xyznumON")
            $(".xyznum").removeClass("xyznumdhua")
        }, 100)
        setTimeout(function () {
            $("html").css("cursor", "url('img/cr.png'),default");
            Showdcjl();
            Beginchoubool = false;
            // $("#jfchoubgvd").attr("src","vd/jf_choudh.mp4");
        }, jfvdtimeArr[sjs])

        if (dchouing) {
            return;
        }
        //$("#jfchoubgvd").attr("src","vd/jf_choudh.mp4");
    }
    else {
        jfnum = jfnum - 200;
        Beginchoubool = true;
        $("html").css("cursor", "none");
        var sjs = Math.floor(Math.random() * jfwlvdtimeArr.length);
        $("#jfchoubgvd").attr("src", "vd/chou/wlcjf" + sjs + ".mp4");
        setTimeout(function () {
            $(".xyznum").addClass("xyznumON")
            $(".xyznum").removeClass("xyznumdhua")
        }, 100)
        setTimeout(function () {
            $("html").css("cursor", "url('img/cr.png'),default");
            Wuliandh()
            Beginchoubool = false;
            // $("#jfchoubgvd").attr("src","vd/jf_choudh.mp4");

        }, jfwlvdtimeArr[sjs])
        console.log(jfwlvdtimeArr[sjs])
    }
}

function sdbsajw() {

    setTimeout(function () {
        if (Choucishu == 1) {
            Showdcjl()
            if (dchouing) {
                return;
            }

        }
    }, jfvdtimeArr[sjs])


}

var Cjmode = 1;
function Showdcjl() {
    xyznum = xyznum + 1;
    opboxnum = opboxnum + 1;
    chouWay = 1;
    var j = GetJliid();
    if (j == 0) { sjnum = sjnum + 1; xyznum = 0; opboxnum = 0; Jlisz[0][2] = false; }
    $("#wljltextdc").text(Jlisz[j][0]);
    if (j <= 4) { var houzhui = ".gif" } else { var houzhui = ".png" }
    $("#dcimg").attr("src", "img/jl/" + j + houzhui)
    CloseBox(".Jfchoubox")
    $('.xyznum').removeClass('xyznumdhua')
    $(".Jlibox").css("background-image", "url('img/dctipbg0.png')")
    Showbox('.Jlibox');
    if (j == 0) {
        Showbox('.rysjbox')
        setTimeout(function () {
            $("#sjbg").attr("src", "vd/sjbg2.mp4");
        }, 3150)
        return;
    }
    setTimeout(function () {
        $(".Jlibox").css("background-image", "url('img/dctipbg1.png')")
    }, 100)
    $(".Dcshine").css("display", "block");
    $(".Dcshine").attr("src", "img/jlLight.gif");
    $("#jltipbgvd").attr("src", "vd/jltip0.mp4")
    Sxsj()
    setTimeout(function () {
        dchouing = false;

        $("#jltipbgvd").attr("src", "vd/jltip1.mp4")
        setTimeout(function () {
            CloseBox(".Dcshine")
        }, 250)
    }, 800)
}


function ChangeChouvd() {
    $(".Jfchoubox").css("background-image", "url('img/jf_choubg0.png')")
    Showbox('.Jfchoubox');
    $(".xyznum").addClass("xyznumdhua")
    $("#jfchoubgvd").attr("src", "vd/jfdb_begin.mp4");

    setTimeout(function () {
        if (Beginchoubool == false) {
            $(".Jfchoubox").css("background-image", "url('img/jf_choubg.png')")
        }
    }, 1000)
    setTimeout(function () {
        if (Beginchoubool == false) {
            $("#jfchoubgvd").attr("src", "vd/jf_choudh.mp4");
        }
    }, 2100)
}
//切换抽奖界面

var buyjfnum = 1;
var buyjfmnnum = 60;
var maxbuyjfnum = Math.floor(mnnum / 100);
//默认购买积分数量1份
function openBuyjf(cdcss) {
    $(".buyJfbox").css("display", "block");
    $(".buyJfbox").addClass("Show");
    $(".Jfdbbox").addClass("mohu")
}
function CloseBuyjf() {
    $(".buyJfbox").css("display", "none");
    $(".buyJfbox").removeClass("Show");
    $(".Jfdbbox").removeClass("mohu")
}
function ShowBuyjf() {
    if (buyjfnum < 1) {
        buyjfnum = 1;
    }
    if (buyjfnum == 1) {
        CloseBox('.jiande_btn');
        $(".min_btn").addClass("maxbtn")
    }
    else {
        Showbox(".jiande_btn");
    }
    if (buyjfnum >= maxbuyjfnum) {
        CloseBox('.jia_btn');
        $(".min_btn").removeClass("maxbtn")
    }
    else {
        Showbox(".jia_btn");
    }
    buyjfmnnum = buyjfnum * 100;
    $(".jfaddnum").text(buyjfnum);
    $(".Buyjfmnnum").text(buyjfmnnum);

    if (mnnum < buyjfmnnum) {
        $(".buyjftipbox").addClass("Nomoney")
    }
    else {
        $(".buyjftipbox").removeClass("Nomoney")
    }


}

function AddBuyjfnum(addnum) {
    if (addnum != 10) {
        sd_jfadd.play();
    }
    else {
        sd_jfadd10.play();
    }
    buyjfnum = buyjfnum + addnum;
    if (buyjfnum < 1) { buyjfnum = 1; }
    if (buyjfnum > (mnnum / 100)) { buyjfnum = Math.floor(mnnum / 100); }
    ShowBuyjf()

}



// 购买积分拖动条部分

$(function () {
    var ylaiwz = 0; var tag = false; var ox = 0; var slleft;
    $('.progress_btn').mousedown(function (e) {
        ylaiwz = e.pageX - 232;

        if (ylaiwz < 1) {
            ylaiwz = 1;
        }
        ox = e.pageX - ylaiwz;
        console.log(ylaiwz);
        tag = true;
    });
    $(document).mouseup(function () {
        tag = false;
    });
    $('.progress').mousemove(function (e) {//鼠标移动
        if (tag) {
            slleft = e.pageX - ox;
            if (slleft <= 2) {
                slleft = 2;
            } else if (slleft > 132) {
                slleft = 132;
            }
            buyjfnum = parseInt((slleft / 132) * 100);
            if (buyjfmnnum < 1) {
                buyjfmnnum = 1;
            }
            ShowBuyjf()
        }
    });

});


// 购买积分拖动条部分

function BuyJf() {
    if (mnnum >= buyjfmnnum) {
        soundclick_0.play();
        mnnum = mnnum - buyjfmnnum;
        jfnum = jfnum + buyjfmnnum / 100;
        yixiaofei = yixiaofei + buyjfmnnum;
        Sxsj();
        $(".buyjfcgbox").addClass("Show");
        CloseBox('.buyJfbox');
        $(".jfgmcgtext1").text(buyjfnum);
        $(".jfgmcgtext2").text(buyjfnum);
        $("#buyjfcgvd").attr("src", "vd/buyjfcg.mp4")
    }
    else {
        sd_dqbugou.play();
        $('.buyJfbox').addClass("mohu");
        $('.dqbuzubox').addClass("Show");
    }
}
//购买积分方法

function Wuliandh() {
    chouWay = 5;
    xyznum = xyznum + 5;
    opboxnum = opboxnum + 5;
    $(".Jlibox5").css("background-image", "url('img/dctipbg0.png')")
    CloseBox(".Jfchoubox")
    Showbox(".Jlibox5")

    setTimeout(function () {
        $(".Jlibox5").css("background-image", "url('img/dctipbg1.png')")
    }, 100)
    $("#jltipbgvd5").attr("src", "vd/jltip0.mp4")
    setTimeout(function () {
        $("#jltipbgvd5").attr("src", "vd/jltip1.mp4")
    }, 250)
    for (let index = 0; index < 5; index++) {
        var j = GetJliid();
        if (j == 0) { sjnum = sjnum + 1; xyznum = 0; opboxnum = 0; Jlisz[0][2] = false; }
        $("#wljltext" + index).text(Jlisz[j][0])
        if (j <= 4) { var houzhui = ".gif" } else { var houzhui = ".png" }
        $("#wljlimg" + index).attr("src", "img/jl/" + j + houzhui);

        if (j == 0) {
            Showbox('.rysjbox')
            setTimeout(function () {
                $("#sjbg").attr("src", "vd/sjbg2.mp4");
            }, 3150)
            return;
        }

    }

    $(".fivejlli").css("display", "none");
    $(".jlimgbox5l").removeClass("wlsxdh");
    wuliandhid = 0
    Sxsj();
    Wldh()
}
function ShutJldh() {
    if (chouWay == 5) {
        CloseBox('.rysjbox')
        $(".fivejlli").css("display", "none");
        $(".jlimgbox5l").removeClass("wlsxdh");
        wuliandhid = 0
        Sxsj();
        Wldh()
    }
    else {
        CloseBox('.rysjbox');
        setTimeout(function () {
            $(".Jlibox").css("background-image", "url('img/dctipbg1.png')")
        }, 100)
        $(".Dcshine").css("display", "block");
        $(".Dcshine").attr("src", "img/jlLight.gif");
        $("#jltipbgvd").attr("src", "vd/jltip0.mp4")
        Sxsj()
        setTimeout(function () {
            dchouing = false;

            $("#jltipbgvd").attr("src", "vd/jltip1.mp4")
            setTimeout(function () {
                CloseBox(".Dcshine")
            }, 250)
        }, 800)
    }
}
var wuliandhid = 0;
function Wldh() {

    $(".jlimgbox5l").removeClass("wlsxdh");
    if (wuliandhid <= 4) {
        Showbox("#fivejlli" + wuliandhid);
        $("#jlwlimgbox" + wuliandhid).addClass("wlsxdh");

        setTimeout(function () {
            //  $("#Wlshine"+wuliandhid).attr("src","img/jlLight.gif")
            //  $("#Wlshine"+wuliandhid).addClass("Wlshinedh");

            wuliandhid = wuliandhid + 1;
            Wldh();
        }, 200)
    }
}


var chouWay = 1;
function zm1ci() {
    if (chouWay == 1) {
        if (jfnum < 45) {
            Showbox('.jfbuzubox')
        }
        else {
            CloseBox('.Jlibox');
            Showbox('.Jfchoubox');
            $(".xyznum").addClass('xyznumON');
            $("#jfchoubgvd").attr("src", "vd/tgdh_dc.mp4");
            setTimeout(function () {
                Showdcjl();
            }, 1050)
        }
    }
    else {
        if (jfnum < 200) {
            Showbox('.jfbuzubox')
        }
        else {
            CloseBox('.Jlibox5');
            Showbox('.Jfchoubox');
            $(".xyznum").addClass('xyznumON');
            $("#jfchoubgvd").attr("src", "vd/tgdh_wl.mp4");
            setTimeout(function () {
                Wuliandh()
            }, 1000)
        }
    }
}

var yixiaofei = 0;
var Vipmnarr = [10, 100, 500, 2000, 5000, 10000, 20000, 50000, 100000, 188880];
var Viparr = [
    [0, 0, 0, true],
    [1, 0, 10, true],
    [2, 10, 100, true],
    [3, 100, 500, true],
    [4, 500, 2000, true],
    [5, 2000, 5000, true],
    [6, 5000, 10000, true],
    [7, 10000, 20000, true],
    [8, 20000, 50000, true],
    [9, 50000, 100000, true],
    [10, 100000, 188880, true]];

function Setvip() {
    var j = 0;
    if (yixiaofei == 0) { return 0; }
    for (let index = 0; index < Viparr.length; index++) {
        var zds = Viparr[index][2];
        var zxs = Viparr[index][1];
        if (yixiaofei > zxs - 1 && yixiaofei <= zds) {
            j = index;

        }
    }

    return j;
}

function Showvip() {
    var viplevel = Setvip() - 1;
    if (viplevel < 0) { viplevel = 0 }
    $(".czviplog").attr("src", "img/vip/" + Viparr[viplevel][0] + ".png");
    var chadssj = Viparr[viplevel + 1][2] - yixiaofei;
    $(".chadssj").text(chadssj)
    $(".guizuxj").text(Viparr[viplevel + 1][0]);
    var juli = Viparr[viplevel + 1][2] - Viparr[viplevel + 1][1];
    var jdt = (juli - chadssj) / juli * 100;
    console.log(jdt)
    $(".vipjdt").css("width", jdt + "%");
}

function Canceltip() {
    $(".Show").removeClass("Show");
    $(".mohu").removeClass("mohu");
}

var Tiaoguo = true;
var Choudecishu = 1;
var AddZhekounum=0;
function Chou() {
    AddZhekounum = 0;
    if (Choudecishu == 10) {
        jfnum = jfnum - need10jf;
        xyznum = xyznum + 10;
        if(jbnum>0){
            jbnum = jbnum - ((60-need10jf)/3);
        }
        $(".PinkLightBd").removeClass("PinkLightBd");
        $(".BlueLightBd").removeClass("BlueLightBd");
        if (Tiaoguo == false) {
            sd_slbtg.play();
            $(".zhegaitg").css("display", "none");
            $(".JL_TenBox").css("display", "flex")
            $("#jfchoubgvd").attr("src", "vd/choudh.mp4")
            $(".Jfchoubox").css("display", "block");

            for (let index = 0; index < 10; index++) {
                var Jliid = GetJliid();
                var Jlname = Jlisz[Jliid][0];
                if (Jliid < 9 || Jliid == 31 || Jliid > 33 || Jliid == 26 || Jliid == 25) {
                    var thouzhui = ".png"
                }
                else {
                    if (Jliid < 12) {
                        $(".jlShadowbox").eq(index).addClass("PinkLightBd");

                    }
                    else {
                        $(".jlShadowbox").eq(index).addClass("BlueLightBd");
                    }
                    var thouzhui = ".gif"
                }
                if (Jliid > 31) { Jlname = "至臻之约碎片"; AddSuipian(Jliid) }
                $("#Jl_img" + index).attr("src", "img/jlimg/" + Jliid + thouzhui);
                $("#JLdiv_text" + index).text(Jlname);
            }
            setTimeout(function () {
                $(".zhegaitg").css("display", "block");
                Canceltip();
                Tenshowdh()
            }, 2350)
            setTimeout(function () {

                $("#jfchoubgvd").attr("src", "vd/chouListbg.mp4")

            }, 2700)
        }
        else {
            sd_sltg.play();
            $(".zhegaitg").css("display", "block");
            $("#jfchoubgvd").attr("src", "vd/chouListbg_tg.mp4")
            $(".JL_TenBox").css("display", "flex")
            $(".Jfchoubox").css("display", "block");
            for (let index = 0; index < 10; index++) {
                var Jliid = GetJliid();
                var Jlname = Jlisz[Jliid][0];
                if (Jliid < 9 || Jliid == 31 || Jliid > 33 || Jliid == 26 || Jliid == 25) {
                    var thouzhui = ".png"
                }
                else {
                    if (Jliid < 12) {
                        $(".jlShadowbox").eq(index).addClass("PinkLightBd");

                    }
                    else {
                        $(".jlShadowbox").eq(index).addClass("BlueLightBd");
                    }
                    var thouzhui = ".gif"
                }
                if (Jliid > 31) { Jlname = "至臻之约碎片"; AddSuipian(Jliid) }
                $("#Jl_img" + index).attr("src", "img/jlimg/" + Jliid + thouzhui);
                $("#JLdiv_text" + index).text(Jlname);
            }
            Canceltip();
            Tenshowdh()
        }
    }



    if (Choudecishu == 1) {
        jfnum = jfnum - need1jf;
        if(jbnum>0){
            jbnum = jbnum - 1;
        }
        xyznum = xyznum + 1;
        if (Tiaoguo == false) {
            sd_dcbtg.play();
            $(".zhegaitg").css("display", "none");
            $(".JL_TenBox").css("display", "none")
            $("#jfchoubgvd").attr("src", "vd/choudh_dc.mp4")
            $(".Jfchoubox").css("display", "block");
            Canceltip();

            setTimeout(function () {
                var Jliid = GetJliid();
                var Jlname = Jlisz[Jliid][0];
                if (Jliid < 9 || Jliid == 31 || Jliid > 33 || Jliid == 26 || Jliid == 25) {
                    var thouzhui = ".png"
                }
                else {
                    var thouzhui = ".gif"
                }
                if (Jliid > 31) { Jlname = "至臻之约碎片"; AddSuipian(Jliid) }
                $("#Dcimg").attr("src", "img/jlimg/" + Jliid + thouzhui);
                $(".DcJltit").text(Jlname);
                DanShowdh()
                $(".zhegaitg").css("display", "block");
            }, 2200)
            setTimeout(function () {

                $("#jfchoubgvd").attr("src", "vd/dclit.mp4")

            }, 2700)
        }
        else {
            $(".zhegaitg").css("display", "block");
            sd_dctg.play();
            $(".JL_TenBox").css("display", "none")
            $("#jfchoubgvd").attr("src", "vd/dclit_tg.mp4")
            $(".Jfchoubox").css("display", "block");
            Canceltip();

            var Jliid = GetJliid();
            var Jlname = Jlisz[Jliid][0];
            if (Jliid < 9 || Jliid == 31 || Jliid > 33 || Jliid == 26 || Jliid == 25) {
                var thouzhui = ".png"
            }
            else {
                var thouzhui = ".gif"
            }
            if (Jliid > 31) { Jlname = "至臻之约碎片"; AddSuipian(Jliid) }
            $("#Dcimg").attr("src", "img/jlimg/" + Jliid + thouzhui);
            $(".DcJltit").text(Jlname);
            DanShowdh()
        }
    }




}

function Tenshowdh() {
    $(".JL_TenBox").css("margin-top", "-50px")
    $("#JLdiv_box0").css("display", "block");
    $("#JLdiv_box0").addClass("slideIndh")
    setTimeout(function () {
        $("#JLdiv_box1").css("display", "block");
        $("#JLdiv_box1").addClass("slideIndh")

        setTimeout(function () {
            $("#JLdiv_box2").css("display", "block");
            $("#JLdiv_box2").addClass("slideIndh")
            setTimeout(function () {
                $(".JL_TenBox").css("margin-top", "-115px")
                $("#JLdiv_box3").css("display", "block");
                $("#JLdiv_box3").addClass("slideIndh")
                setTimeout(function () {

                    $("#JLdiv_box4").css("display", "block");
                    $("#JLdiv_box4").addClass("slideIndh")
                    setTimeout(function () {

                        $("#JLdiv_box5").css("display", "block");
                        $("#JLdiv_box6").css("display", "block");
                        $("#JLdiv_box7").css("display", "block");
                        $("#JLdiv_box8").css("display", "block");
                        $("#JLdiv_box9").css("display", "block");
                        $("#JLdiv_box5").addClass("slideIndh")
                        setTimeout(function () {
                            $("#JLdiv_box6").addClass("slideIndh")
                            setTimeout(function () {
                                $("#JLdiv_box7").addClass("slideIndh")
                                setTimeout(function () {
                                    $("#JLdiv_box8").addClass("slideIndh")
                                    setTimeout(function () {
                                        $("#JLdiv_box9").addClass("slideIndh")
                                    }, 100)
                                }, 100)
                            }, 100)
                        }, 200)
                    }, 200)
                }, 100)
            }, 100)
        }, 200)
    }, 200)

}

function DanShowdh() {

    $(".Jl_dccmsgbox").css("display", "block");
    $(".Jl_dccmsgbox").addClass("slideIndh")
}

function Chouend() {
    CloseBox(".Jfchoubox");
    CloseBox(".Jl_dccmsgbox")
    $(".slideIndh").removeClass("slideIndh");
    Sxsj();
   if(AddZhekounum>0)
    {
$(".Zhekoubox").addClass("Show");
jbnum=jbnum+AddZhekounum;

$("#Zhekouvd").attr("src", "vd/zhekou.mp4")
$(".Hdzhekounum").text(AddZhekounum);
if(AddZhekounum==1){$(".Hdzhekounum").text("");}
    }
    else
    {
        GeiLjjli();
    }
}

function AddSuipian(jlid) {
    if (jlid == 32) { zsnum = zsnum + 10; }
    if (jlid == 33) { zsnum = zsnum + 5; }
    if (jlid == 34) { zsnum = zsnum + 4; }
    if (jlid == 35) { zsnum = zsnum + 3; }
    if (jlid == 36) { zsnum = zsnum + 2; }
    if (jlid == 37) { zsnum = zsnum + 1; }
    Sxsj()
}


function ChangeTg() {
    soundclick_2.play();
    if (Tiaoguo) {
        Tiaoguo = false;
    }
    else {
        Tiaoguo = true;
    }
    Sxsj();
}




function ChoseLj(ljidd) {
    $(".onChoseyuan").removeClass("onChoseyuan")
    $(".lityuan" + ljidd).addClass("onChoseyuan")
    setTimeout(() => {

        $(".LjcjlistBox").css("background-image", "url(img/ljcj/" + ljidd + ".png)");
        setTimeout(() => {
            $(".LjcjlistBox2").css("background-image", "url(img/ljcj/" + ljidd + ".png)")
        }, 100);
    }, 10);
}
var Jueseid = 99;
var Ljjlarrnum0 = [14, 15, 16];
var Ljjlarrnum1 = [30, 32, 35];
function GeiLjjli() {
    var Dwei = Ljidangwei + 1;
    console.log("抽奖次数:" + xyznum + "\n挡位:" + Dwei);
    var Sjsss = Math.floor(Math.random() * 3);
    if (xyznum >= 20) {
        if (LjjlboolArr[0] == false) {
            LjjlboolArr[0] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum0[Sjsss]);
            zsnum = zsnum + Ljjlarrnum0[Sjsss];
            $(".Lqljjlnum").css("display", "block")
            Sxsj();
        }
    }

    if (xyznum >= 30) {
        if (LjjlboolArr[1] == false) {
            LjjlboolArr[1] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").css("display", "none")
            Jueseid = 99;
            setTimeout(function () {

                $("#juesedhvd").attr("src", "vd/juese/" + 99 + ".mp4");
                $(".Juesedhbox").addClass("Show");
            }, 2400)
        }
    }


    if (xyznum >= 50) {
        if (LjjlboolArr[2] == false) {
            LjjlboolArr[2] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum0[Sjsss]);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + Ljjlarrnum0[Sjsss];
            Sxsj();
        }
    }


    if (xyznum >= 100) {
        if (LjjlboolArr[3] == false) {
            LjjlboolArr[3] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum1[Sjsss]);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + Ljjlarrnum1[Sjsss];
            Sxsj();
        }
    }

    if (xyznum >= 150) {
        if (LjjlboolArr[4] == false) {
            LjjlboolArr[4] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum1[Sjsss]);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + Ljjlarrnum1[Sjsss];
            Sxsj();
        }
    }

    if (xyznum >= 200) {
        if (LjjlboolArr[5] == false) {
            LjjlboolArr[5] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum1[Sjsss]);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + Ljjlarrnum1[Sjsss];
            Sxsj();
        }
    }

    if (xyznum >= 288) {
        if (LjjlboolArr[6] == false) {
            LjjlboolArr[6] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(Ljjlarrnum1[Sjsss]);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + Ljjlarrnum1[Sjsss];
            Sxsj();
        }
    }

    if (xyznum >= 388) {
        if (LjjlboolArr[5] == false) {
            LjjlboolArr[5] = true;
            $("#Lqljjlvd").attr("src", "vd/lqjlsp.mp4")
            $(".Lqljjl").addClass("Show");
            $(".Lqljjlnum").text(88);
            $(".Lqljjlnum").css("display", "block")
            zsnum = zsnum + 88;
            Sxsj();
        }
    }
}


function Gbjusesedh() {
    $("#juesedhvd").attr("src","")
    if (Jueseid == 99) {
        $("#Lqljjlvd").attr("src", "vd/juese/99_lq.mp4");
        $(".Juesedhbox").removeClass("Show");
        // $(".Lqljjl").addClass("Show");
    }
    else {
        $("#Lqljjlvd").attr("src", "vd/juese/" + Jueseid + "_lq.mp4");

        $(".Lqljjl").addClass("Show");
        $(".Lqljjlnum").css("display", "none")
        $(".Juesedhbox").removeClass("Show");
    }

}
var DhNeedNumArr = [1588, 1588, 1588, 1588, 488, 488, 488, 488];
var SelectDhid = 0;
function Dhmenu(dhidd) {
    soundclick_2.play();
    dhidd = dhidd - 1;
    if (dhidd <=6) {
        SelectDhid = dhidd;
        Jueseid = dhidd;
        $("#dhvd").attr("src", "vd/dh/" + (dhidd) + ".mp4");
        if (zsnum < DhNeedNumArr[dhidd]) {
            $(".dhbtn").removeClass("dhbtn_on")
        }
        else {
            $(".dhbtn").addClass("dhbtn_on")
        }
    }

}

function Closedhbox() {
    $(".Duihuanbox").css("display", "none");
    $("#dhvd").attr("src", "vd/dh/.mp4");
    $('#dhvd').prop('muted', true);
}


function Opendhbox() {
    $(".Duihuanbox").css("display", "block");
    Dhmenu(1)
    $('#dhvd').prop('muted', false);
}

function Begindh() {
    if (SelectDhid <=5) {
        $("#dhqrboximg").attr("src", "img/dh_" + (SelectDhid) + ".png");
        $('.dhqrboxx').addClass('ShowDhqr')
    }
}


var DhuanedArr=[false,false,false,false,false,false,false,false]
function Qrdh() {
    $('#dhvd').prop('muted', true);
    $('.dhqrboxx').removeClass('ShowDhqr')
    $(".Juesedhbox").addClass("Show");
    DhuanedArr[SelectDhid]=true;
    zsnum = zsnum - DhNeedNumArr[SelectDhid];
    Sxsj();
    $("#juesedhvd").attr("src", "vd/juese/" + SelectDhid + ".mp4");
}
function Closejbajdb() {
    $('.Lqljjl').removeClass('Show');
    if (Jueseid != 99) {
        $('#dhvd').prop('muted', false);
    }
}

