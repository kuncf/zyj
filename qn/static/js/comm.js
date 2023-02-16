//弹窗
function TGDialogS(e){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:50 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog(){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}

//抽奖切换
$('.boxnavlot a').each(function(i){
	$(this).click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.bxlot').eq(i).show().siblings().hide();
	})
})
$('.btnbule').click(function(){
	$('.boxzcdm').removeClass('boxzcdmred')
})
$('.btnred').click(function(){
	$('.boxzcdm').addClass('boxzcdmred')
})

//已兑换
$('.btndh.gray').text('已兑换')
$('.btnpt3.gray').text('已领取')

//弹窗奖池切换
$('.popbtnnav1 a').each(function(i){
	$(this).click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.tablegl1').eq(i).show().siblings().hide();
	})
})
$('.popbtnnav2 a').each(function(i){
	$(this).click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.tablegl2').eq(i).show().siblings().hide();
	})
})