/*
 *
 *   OSP - Operation Support Platform
 *
 */

$(document).ready(function () {

	//1.active menu
	activeMenuFromUrl();
	
	//2. initial modal object
	window.modal = new MyModal();
	window.modal2 = new MyModal( $('#myModal2') , $('#modalTitle2') , $('#modalBody2'));
	
	//3. setup modal layer
	setModalLayer();
	
	//4. analyze query string
	window.queryString = getQueryString();
	
	//5. handle joined 
	dealWithJoined();
	
	//6. active switcher in the list page
	activeSwitcher();
	
	
	
});

// Use this instead of document.ready, beacuse it is later than the bootstrap table element is ready...
$(window).load(function(){
	// put the search creteria into the page
	initListSearch();
});

function activeSwitcher(){
	$('.js-switch').each(function(){
		new Switchery(this);
	});
}

function activeMenuFromUrl(){
	//deal with menu
	var currentUrl = location.href;
	var currentURI = root + currentUrl.split(root)[1];
	var a = "/";
	var currentA = $('#side-menu a[href="'+currentURI+'"]');
	if(currentA.size() != 0){
		$('#side-menu li').removeClass('active');
		currentA.parents("li").addClass('active');
	}
}

function setModalLayer(){
	

	$('.modal').on('hidden.bs.modal', function( event ) {
		if( $(this).hasClass( 'bootstrap-dialog' ) ){
			return ;
		}
		
          $(this).removeClass( 'fv-modal-stack' );
          var totalLayers = $('body').data( 'fv_open_modals' );
        //to re-activate the scroll bar on the remain modal
          if(totalLayers > 1){
        	  $('.modal').css('overflow-y', 'auto');
          }
          
          $('body').data( 'fv_open_modals', totalLayers - 1 );
          
          
          
          
          
      });


	$( '.modal' ).on( 'shown.bs.modal', function ( event ) {
		
		//ignore the bootstrap dialog 
		if( $(this).hasClass( 'bootstrap-dialog' ) ){
			return ;
		}
	                   
             // keep track of the number of open modals
             
		 if ( typeof( $('body').data( 'fv_open_modals' ) ) == 'undefined' )
		 {
		   $('body').data( 'fv_open_modals', 0 );
		 }
		 // if the z-index of this modal has been set, ignore.
		            
	      if ( $(this).hasClass( 'fv-modal-stack' ) )
            {
            return;
            }
		    $(this).addClass( 'fv-modal-stack' );
		    
		    var openModal = $('body').data( 'fv_open_modals' ) + 1;
		    var zIndex = 2040 + (10 * openModal);
		    var zIndex_backdrop = 2039 + (10 * openModal);
		    
		    $('body').data( 'fv_open_modals', openModal );
		
		    $(this).css('z-index', zIndex);
		    $(this).find('.modal-dialog').css('z-index',zIndex_backdrop);
		    $( '.modal-backdrop' ).not( '.fv-modal-stack' ).css( 'z-index', zIndex_backdrop);
		
		
		    $( '.modal-backdrop' ).not( 'fv-modal-stack' )
		    	.addClass( 'fv-modal-stack' ); 

	});
}

function activeDatePicker(){
	//for date picker
	$('.datepick').datepicker({
	    keyboardNavigation: false,
	    forceParse: false,
	    autoclose: true
	});
}


function MyModal(modal, title, body){
	
	
	this.modal = modal ? modal : $('#myModal');
	this.title = title ? title : $('#modalTitle');
	this.body  = body ? body : $('#modalBody');
	
	
	this.setModal = function(title, body, footer){
		if(title){
			this.title.html(title);
		}
		if(body){
			this.body.html(body);
		}
	};
	
	this.showModal = function(){
		this.modal.modal();
	};
	
	this.hideModal = function(){
		this.modal.modal('hide');
	};
	
	this.block = function(args){
		args = args ? args : {};
		this.modal.block(args);
	}
	
	this.on = function(eventName, callback){
		this.modal.on(eventName, callback);
	};
	/*
	this.onSubmit = function( callback ){
		this.submitBtn.click(callback);
		
	};
	*/
}

$.getData = function( url, successCallback, errorCallback){
	
	$.ajaxData('get', url,  successCallback, errorCallback);
	
};

$.postData = function( url, data, successCallback, errorCallback){
	
	$.ajaxData('post', url, data, successCallback, errorCallback);
	
};


$.ajaxData = function(method, url, data, successCallback, errorCallback){
	// shift one position if there is no data
	if(typeof(arguments[2]) == 'function'){
		errorCallback = arguments[3];
		successCallback = arguments[2];
		data = undefined;
	}
	//append ajax=true param
	if(url.indexOf('?') == -1){
		url = url + "?ajax=true";
	}else{
		url = url + "&ajax=true";
	}
	
	//deal with csrf 
	if(method != 'get'){
		
		var userData = data;
		if(userData){
			if(typeof(userData) == 'string'){
				data = $('#csrf').serialize() + "&" + userData;
			}else{
				data = $.extend($('#csrf').serialize(), userData);
			}
		}else{
			data = $('#csrf').serialize();
		}
	}
	
	
	$.ajax({
            type: method,
            //contentType: "application/json; charset=utf-8",
            url: url,
            data : data,
            //dataType: "json",
            success: function (result) {
            	//unblockUI
            	unblockUI();
            	//deal with page type result, json type will have "results" attribute
            	if(!result.results){
            		if(successCallback) successCallback(result);
            		return;
            	}else{
            		var rtn = $.parseJSON(result.results);
            	}
            	
            	
            	if(rtn.status =="success"){
            		if(successCallback){
            			successCallback(rtn.data);
            		}
            	}else{
            		
            		if(!errorCallback){
            			BootstrapDialog.alert(rtn.message);
            		}else{
            			errorCallback(rtn);
            		}
            	}
            },
            error: function ( jqXHR,  textStatus,  errorThrown) {
            	unblockUI();
            	BootstrapDialog.show({
				message : "jqXHR = " + jqXHR + " textStatus = " + textStatus + " , Error = " + errorThrown,
				onhide : function(){
					
					location.reload();
					
				}
			});
            	
            },
//            statusCode: {
//            	    404: function(jqXHR,  textStatus,  errorThrown) {
//            		    BootstrapDialog.alert("404 jqXHR = " + jqXHR + " textStatus = " + textStatus + " , Error = " + errorThrown) ;
//            	    },
//            	    500: function(jqXHR,  textStatus,  errorThrown){
//            		    BootstrapDialog.alert("500 jqXHR = " + jqXHR + " textStatus = " + textStatus + " , Error = " + errorThrown) ;
//            		    
//            	    },
//            	    0: function(jqXHR,  textStatus,  errorThrown) {
//            		    BootstrapDialog.alert("0 jqXHR = " + jqXHR + " textStatus = " + textStatus + " , Error = " + errorThrown) ;
//            	    },
//            	  }
     });
	
};


function getQueryString(){
		var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
}

function initListSearch(){
	if($('.search input').size != 0){
		var s = queryString.listSearch; 
		if(s && s.trim()){
			s = decodeURIComponent(s);
			$('.search input').val(s);
			$('.search input').keyup();
		}
	}
}

/***
 * get the search criteria in the search bar, and append as "listSearch" parameter in the current url
 * 
 * It is a pair function with "initListSearch" : 
 * 	If the page with call the function "initListSearch", it will insert the search creteria into the search input
 *   
 * @returns the current url with search creteria
 */
function getUrlWithSearchCriteria(encode){
	
	var connectSymbol = "&";
	if(location.href.indexOf('?') == -1){
		connectSymbol = "?";	
	}
	var url = location.href;
	
	var search = $('.search input').val();

	//append the search if a value in it
	if(search && search.trim()){
		if(location.href.indexOf('listSearch=') == -1){
			url = location.href + connectSymbol+ "listSearch=" + $('.search input').val() ;
		}else{
			var url = location.href.replace(/listSearch=[^&]*(&?)/g, "listSearch=" + $('.search input').val());
		}
	}
	
	if(encode){
		return encodeURIComponent(url);
	}else{
		return url;
	}
}

function reloadWithCriteria(){

	if(window.refreshData){
		modal.hideModal();
		modal2.hideModal();
		refreshData();
	}else{
		location.href = getUrlWithSearchCriteria();
	}
	
}


function isInModal(ele){
	var parentModal = $(ele).parents('.modal');
	return parentModal.size() != 0;
}

/***
 * if the currentjQueryEle is in modal, then exec inModal, eles exec notInModalFunc
 * @param currentjQueryEle 
 * @param inModalFunc
 * @param notInModalFunc
 */
function switchInModalAction(currentjQueryEle, inModalFunc, notInModalFunc){

	if(isInModal(currentjQueryEle)){
		inModalFunc();
	}else{
		notInModalFunc();
	}
}

/***
 * if the current url has "source" param, then redirect to source, 
 * else redirect to url
 * @param url
 */
function redirectOptionSource(url){
	
	if(queryString['source']){
		location.href = decodeURIComponent( queryString['source']);
	}else{
		//default redirect path
		location.href = url;
	}
}

function trimJoined(value){
	
	
	
	if(value){
		if($.isArray(value)){
			value = value.join();
		}
		
		return value.replace(/^[,\[\s]+|[,\s\|\]]+$/gm, "");
	}else{
		return value;
	}
}
 
function dealWithJoined(){
	$(".joined").each(function(i, item){
		
		
		
		if($(item).val()){
			var original = $(item).val().trim();
			$(item).val( trimJoined(original)  );
		}else{
			var original = $(item).html().trim();
			$(item).html( trimJoined(original)  );
			
		}
	});
}

function clearSelect2(item){
	if($(item).prevAll('.singleUser').size() != 0){
		$(item).prevAll('.singleUser').select2('val','');
	}
	
	if($(item).prevAll('.singleSystem').size() != 0){
		$(item).prevAll('.singleSystem').select2('val','');
	}
	
	if($(item).prevAll('.singleSelect').size() != 0){
		$(item).prevAll('.singleSelect').select2('val','');
	}
	
}

function loadTable(){
	
}




