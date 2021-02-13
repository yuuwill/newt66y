function dpos(form){
	var imgs = document.getElementsByTagName('img');
	if(imgs[0].height==0){
		alert('请关闭广告屏蔽插件（如ADBLOCK）再尝试下载');
		return false;
	}
	if(ert6j){
		alert('请关闭广告屏蔽插件（如uBlock）再尝试下载');
		return false;
	}
	if($("img:eq(0)").css('visibility')=='collapse'){
		alert('请关闭广告屏蔽插件（如uBlock）再尝试下载');
		return false;
	}
	if(poData){
		var ider = Math.floor(Math.random() * poData.length);
		window.open(poData[ider].u);
	}
	return true;
}

function initDownload(){
	if(rmData){
		var ider = Math.floor(Math.random() * rmData.length);
		rmData.forEach(function(item, index){
			var dl = index==ider ? dlData : '';
			document.write('<a href="'+item.u+'" target="_blank"><img src="'+item.i+'"></a>' + dl);
		});
	}else{
		document.write(dlData);
	}
}

function magnet(copy=false){
	if(poData){
		var ider = Math.floor(Math.random() * poData.length);
		window.open(poData[ider].u);
	}
	var code = $('#ref').val();
	var magn = 'magnet:?xt=urn:btih:'+code.substr(3);
	$.get( "download.php", { action: "magnet", ref: code } ).done(function( data ) {
		if(data=='1'){
			if(copy){
				var m = document.createElement("textarea");
				document.body.appendChild(m);
				m.value = magn;
				CopyToClipboard(m);
				document.body.removeChild(m);
				$('#cbtn').val('MAGNET Copyed!');
				return;
			}
			setTimeout(function(){
				window.open(magn, '_self');
			}, 1000);
		}else{
			document.write(data);
		}
	});
}

function CopyToClipboard(containerid) {
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(containerid);
		range.select().createTextRange();
		document.execCommand("copy");
	} else if (window.getSelection) {
		var range = document.createRange();
		range.selectNode(containerid);
		window.getSelection().addRange(range);
		document.execCommand("copy");
	}
}
$( document ).ready(function() {
	$("li:eq(1)").css('display', 'none');
	$("img:eq(1)").on("error", function(){
		$("li:eq(1)").css('display', '');
	});
	$("img:eq(0)").on("load", function(){
		if($(this).css('visibility')=='collapse'){
			ert6j = true;
		}
	});
});
