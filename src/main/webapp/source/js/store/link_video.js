function loadVideoList(){
		var url = _ctx+"/video/listhm4player";
		$.post(url,{
			storeId:_player,
			pageNo:v_page_no,
			pageSize:v_page_size,
			sortBy:v_sort_by,
			sortType:v_sort_type
			},function(data){
			$('#video-list').html(data);
		});
}
var v_page_no=1;
var v_page_size=4;
var v_sort_by = "updatetime";//cnum
var v_sort_type = "desc";//asc
function sort(sb,st){
	v_sort_by = sb;
	v_sort_type = st;
	loadVideoListPerPlayer();
}
function goVideo(pn){
	v_page_no = pn;
	loadVideoListPerPlayer();
}
function loadVideoListPerPlayer(){
	var url = _ctx+"/video/list4player";
	/*console.log("   storeId="+_player
				+"  pageNo="+v_page_no
				+"  pageSize="+v_page_size
				+"  sortBy="+v_sort_by
				+"  sortType="+v_sort_type
				);*/
	$.post(url,
		{
		storeId:_player,
		pageNo:v_page_no,
		pageSize:v_page_size,
		sortBy:v_sort_by,
		sortType:v_sort_type
		},
		function(data){
		$('#video-list').html(data);
		callbackAction();
	});
}
function showLinkVideoPage(playerid){
	_player = playerid;
	loadVideoListPerPlayer();
}
function callbackAction(){
	_linked_videoids_arr = new Array();
	var linkedids = $('#link-video-a-'+_player).attr("linked-video-ids");
	if(linkedids){
		if(linkedids.indexOf(',',0)>0){
			var lidsArr = linkedids.split(',');
			for(var i = 0;i<lidsArr.length;i++){
				_linked_videoids_arr.push(parseInt(lidsArr[i]));
			}
		}else{
			_linked_videoids_arr[0] = parseInt(linkedids);
		}
	}
	var checkboxlist =$("#video-list").find('input');
	if(checkboxlist.length>0){
		var checkednum = 0;
		for(var i=0;i<checkboxlist.length;i++){
			if($.inArray(parseInt($(checkboxlist[i]).val()),_linked_videoids_arr)>=0){
				$(checkboxlist[i]).attr("checked",true);
				checkednum++;
			}else{
				$(checkboxlist[i]).attr("checked",false);
			}
		}
		$('#checkednum').text(checkednum);
	}
	//console.log(_linked_videoids_arr);
	
    $("#video-list").show();
}
function checkVideo(obj){
	var num = parseInt($('#checkednum').text());
	var id = parseInt($(obj).val());
	if($(obj).attr('checked')){
		$('#checkednum').text(num+1);
		_linked_videoids_arr.push(id);
		//取消已其他已选择
		var _checkboxs = $('#video-list').find('input[type=checkbox][checked=true][value!='+id+']')
		if(_checkboxs){
			if(_checkboxs.length>0){
				for(var i=0;i<_checkboxs.length;i++){
					$(_checkboxs[i]).attr('checked',false);
					var _num = parseInt($('#checkednum').text());
					$('#checkednum').text(_num-1);
					var _id = parseInt($(_checkboxs[i]).val());
					var ind = $.inArray(_id,_linked_videoids_arr);
					_linked_videoids_arr.splice(ind,1);
				}
			}
		}
	}else{
		$('#checkednum').text(num-1);
		var ind = $.inArray(id,_linked_videoids_arr);
		//console.log("id = "+id+"  ind="+ind);
		_linked_videoids_arr.splice(ind,1);
	}
	//console.log(_linked_videoids_arr);
}
function recheckVideo(){
	var checkboslist =$("#video-list").find('input');
	if(checkboslist.length>0){
		for(var i=0;i<checkboslist.length;i++){
			$(checkboslist[i]).attr('checked',false);
		}
		$('#checkednum').text(0);
		_linked_videoids_arr = new Array();
	}
	//console.log(_linked_videoids_arr);
}
function saveVideoLinks(){
	if(_player<=0){
		alert("播放器id错误");
		return;
	}
	var url = _ctx+"/video/linkPlayer";
	vids = "";
	if(_linked_videoids_arr.length>0){
		for(var i=0;i<_linked_videoids_arr.length;i++){
			vids+=""+_linked_videoids_arr[i]+",";
		}
		vids = vids.substring(0,vids.length-1);
	}else{
		if(!confirm("没有关联任何视频，播放器无法正常使用")){
			return;
		}
	}
	$.post(url,{storeId:_player,videoIds:vids},function(data){
		 var datas = data.substring(data.indexOf('{')+1,data.lastIndexOf('}'));
		  datas = "{" + datas + "}";
		  var attr = eval('('+datas+')');
		  if(attr.success){
			  $('#linked-num-span-'+_player).html("<strong>"+_linked_videoids_arr.length+"</strong>");
			  $('#link-video-a-'+_player).attr("linked-video-ids",vids);
			  if(attr.storeLogo!=null&&attr.storeLogo.length>0){
				  $('#store-logo-'+_player).attr("src",attr.storeLogo);
			  }else{
				  $('#store-logo-'+_player).attr("src",_ctx+"/source/images/aztimg/logo_kaimai8.png");
			  }
			 $("#video-list").toggle();
			 window.location.reload();
		  }else{
			  
			  if(attr.ol>0){
				  alert("单个播放器关联["+attr.ol+"]个视频，但您的套餐单个播放器只可承载["+attr.oc+"]个！");
			  }else{
				  alert("保存将关联["+attr.l+"]个视频，但您的套餐只可关联["+attr.c+"]个！");
			  }
			  
		  }
	});
	
}