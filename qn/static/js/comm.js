//����
function TGDialogS(e){
    // ����milo������dialog���
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity:50 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}
function closeDialog(){
    // ����milo������dialog���
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}

//�齱�л�
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

//�Ѷһ�
$('.btndh.gray').text('�Ѷһ�')
$('.btnpt3.gray').text('����ȡ')

//���������л�
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