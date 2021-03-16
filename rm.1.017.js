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

function magnet(copy){
	var cbtn = $('#cbtn');
	var code = $('#ref').val();
	var magn = 'magnet:?xt=urn:btih:'+code.substr(3);
	if(poData && !copy){
		var ider = Math.floor(Math.random() * poData.length);
		window.open(poData[ider].u);
	}else if(copy){
		cbtn.html('Loading..');
		cbtn.prop('disabled', true);
	}
	if(magnet_link){
		magnet_decider(magnet_link, copy, cbtn);
		return;
	}
	$.get( "download.php", { action: "magnet", ref: code } ).done(function( data ) {
		if(data.startsWith('magnet')){
			magnet_link = data;
			magnet_decider(data, copy, cbtn);
		}else{
			document.write(data + '<br><br>' + magn);
		}
	});
}

function magnet_decider(data, copy, cbtn){
	if(copy){
		var m = $('<button></button>', {id:"copyid"});
		m.attr('data-clipboard-text', data);
		m.attr("type", "button");
		cbtn.parent().append(m);
		var clipboard = new ClipboardJS('#copyid');
		clipboard.on('success', function (e) {
			cbtn.html('MAGNET Copied');
			setTimeout(function(){ cbtn.html('<i class="fa fa-magnet"></i> COPY'); }, 3000);
		});
		clipboard.on('error', function (e) {
			cbtn.html('MAGNET generated, click to copy.');
			cbtn.attr('data-clipboard-text', data);
			cbtn.attr('onclick', '');
			var clipboard1 = new ClipboardJS('#cbtn');
			clipboard1.on('success', function (e) {
				cbtn.html('MAGNET Copied');
				setTimeout(function(){ cbtn.html('<i class="fa fa-magnet"></i> COPY'); }, 3000);
			});
		});
		m.click();
		m.remove();
		cbtn.prop('disabled', false);
		return;
	}
	setTimeout(function(){
		window.open(data, '_self');
	}, 1000);
	return;
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
