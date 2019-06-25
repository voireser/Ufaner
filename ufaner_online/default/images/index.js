
$(".sy_box_one li:last").css("border-right","0");//首页最新动态
jQuery(".banner_scrollmian").slide({ mainCell:".banner_scroll", effect:"left",vis:2, pnLoop:true, scroll:1, autoPage:true});//幻灯片右侧效果
jQuery(".scrollBox").slide({ mainCell:".piclist", effect:"left",vis:4,scroll:1,delayTime:800,easing:"easeOutCirc",autoPage:true});
$(".piclist .bt:eq(0)").addClass("tita");
$(".piclist .box:eq(0)").addClass("boxa");
$(".piclist .bt:eq(1)").addClass("titb");
$(".piclist .box:eq(1)").addClass("boxb");
$(".piclist .bt:eq(2)").addClass("titc");
$(".piclist .box:eq(2)").addClass("boxc");
$(".piclist .bt:eq(3)").addClass("titd");
$(".piclist .box:eq(3)").addClass("boxd");
$(".piclist .bt:eq(4)").addClass("tita");
$(".piclist .box:eq(4)").addClass("boxa");
$(".piclist .bt:eq(5)").addClass("titb");
$(".piclist .box:eq(5)").addClass("boxb");
$(".piclist .bt:eq(6)").addClass("titc");
$(".piclist .box:eq(6)").addClass("boxc");
$(".piclist .bt:eq(7)").addClass("titd");
$(".piclist .box:eq(7)").addClass("boxd");
$(".piclist .bt:eq(8)").addClass("tita");
$(".piclist .box:eq(8)").addClass("boxa");
$(".piclist .bt:eq(9)").addClass("titb");
$(".piclist .box:eq(9)").addClass("boxb");
$(".piclist .bt:eq(10)").addClass("titc");
$(".piclist .box:eq(11)").addClass("boxc");
$(".piclist .bt:eq(12)").addClass("titd");
$(".piclist .box:eq(13)").addClass("boxd");

$(function () {  
	$(window).scroll(function(){  
		if ($(window).scrollTop()>500){  
			$("#to_top").fadeIn(1500);  
		}  
		else  
		{  
			$("#to_top").fadeOut(1500);  
		}  
	});  

	//当点击跳转链接后，回到页面顶部位置  

	$("#to_top").click(function(){  
		$('body,html').animate({scrollTop:0},1000);  
		return false;  
	});  
}); 