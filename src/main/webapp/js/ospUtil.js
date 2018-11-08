/*
 * put all the passive function in here
 */

function initUserSelect(selector, options){
	
	var defaultOptions = {
	            width : "90%",
	            
//	            allowClear: true, select2 only allow if the selector is identified by id.
	            multiple : true,
	        	  ajax: {
	        	    url: ctxRoot +"/user/findUserAndGroup.html?ajax=true",
	        	    dataType: 'json',
	        	    delay: 250,
	        	    data: function (params) {
	        	      return {
	        	        term: params.term // search term
	        	        //,page: params.page
	        	      };
	        	    },
	        	    processResults: function (rtn, page) {
	        	      // parse the results into the format expected by Select2.
	        	      // since we are using custom formatting functions we do not need to
	        	      // alter the remote JSON data
	        	      return {
	        	        results: $.parseJSON(rtn.results).data
	        	      };
	        	    },
	        	    cache: true
	        	  },
	        	  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
	        	  minimumInputLength: 1,
	        	  templateResult: function(repo){
	        		if (repo.loading) return repo.text;

	          	    var markup = 
	          	    '<div class="clearfix">' +  '<div clas="col-sm-10">' +
		          	  '<div class="clearfix">' ;
	          	    if(repo.department){
	          		 markup +=
		          		 '<div class="col-sm-6">' + repo.name + '</div>' +
			          	 '<div class="col-sm-4"><i class="fa fa-code-fork"></i> ' + repo.department + '</div>' ;
	          	    }else{
	          		markup +=
		          		 '<div class="col-sm-10">' + repo.name + '</div>' ;
	          	    }
			          	   
		          	    '</div>';
	
		          	    if (repo.description) {
		          	      markup += '<div>' + repo.description + '</div>';
		          	    }

	          	    markup += '</div></div>';

	          	    return markup;
	        		  
	        	  }, 
	        	  templateSelection: function(repo){
	        		return repo.name || repo.text;
	        	  } 
	       	};
	
	if(options == null){
		options = defaultOptions;
	}else{
		
		options = $.extend(defaultOptions, options);
//		options.width = options.width || defaultOptions.width;
//		options.ajax = options.ajax || defaultOptions.ajax;
//		options.escapeMarkup = options.escapeMarkup || defaultOptions.escapeMarkup;
//		options.minimumInputLength = options.minimumInputLength || defaultOptions.minimumInputLength;
//		options.templateResult = options.templateResult || defaultOptions.templateResult;
//		options.templateSelection = options.templateSelection || defaultOptions.templateSelection;
		//select 2 has a bug, set multiple=false doesn't work, have to remove this attribute
		if(options.multiple === false){
			delete options.multiple;
		}
		
		
	}
	
	$(selector).select2(options);
}

/***
 * The selected value is the same as text of the user, not the user id.
 * @param selector
 * @param options
 */
function initUserTextSelect(selector, options){
	
	
	
	var defaultOptions = {
			  multiple : true,
	        	  ajax: {
	        	    url: ctxRoot +"/user/findUserAndGroupText.html?ajax=true",
	        	    dataType: 'json',
	        	    delay: 250,
	        	    data: function (params) {
	        	      return {
	        	        term: params.term // search term
	        	        //,page: params.page
	        	      };
	        	    },
	        	    processResults: function (rtn, page) {
	        	      // parse the results into the format expected by Select2.
	        	      // since we are using custom formatting functions we do not need to
	        	      // alter the remote JSON data
	        	      return {
	        	        results: $.parseJSON(rtn.results).data
	        	      };
	        	    },
	        	    cache: true
	        	  }
	       	};
	
	if(options){
		$.extend(defaultOptions, options);
		if(options.url){
			defaultOptions.ajax.url = options.url;
		}
	}
	
	
	
	initUserSelect(selector, defaultOptions );
	
}



function initSystemCatalogSelect(selector){
	
	var options = {
			  multiple : true,
	        	  ajax: {
	        	    url: ctxRoot +"/systemCatalog/findSystemCatalog.html?ajax=true",
	        	    dataType: 'json',
	        	    delay: 250,
	        	    data: function (params) {
	        	      return {
	        	        term: params.term // search term
	        	        //,page: params.page
	        	      };
	        	    },
	        	    processResults: function (rtn, page) {
	        	      // parse the results into the format expected by Select2.
	        	      // since we are using custom formatting functions we do not need to
	        	      // alter the remote JSON data
	        	      return {
	        	        results: $.parseJSON(rtn.results).data
	        	      };
	        	    },
	        	    cache: true
	        	  }
	       	};
	
	initUserSelect(selector, options);
	
}

function initServiceCatalogSelect(selector, tags){
	
	var options = {
			  multiple : true,
	        	  ajax: {
	        	    url: ctxRoot +"/serviceCatalog/findServiceCatalog.html?ajax=true",
	        	    dataType: 'json',
	        	    delay: 250,
	        	    data: function (params) {
	        	      return {
	        	        term: params.term // search term
	        	        //,page: params.page
	        	      };
	        	    },
	        	    processResults: function (rtn, page) {
	        	      // parse the results into the format expected by Select2.
	        	      // since we are using custom formatting functions we do not need to
	        	      // alter the remote JSON data
	        	      return {
	        	        results: $.parseJSON(rtn.results).data
	        	      };
	        	    },
	        	    cache: true
	        	  },
	        	  tags : tags
	       	};
	
	initUserSelect(selector, options);
	
}

function initCheckbox(selector, options){
	
	var defaultOptions = {
	            checkboxClass: 'icheckbox_square-green',
	            radioClass: 'iradio_square-green',
	        };
	if(options == null){
		options = defaultOptions;
	}else{
		options.checkboxClass = options.checkboxClass || defaultOptions.checkboxClass;
		options.radioClass = options.radioClass || defaultOptions.radioClass;
	}
	
	
	$(selector).iCheck(options);
	
}

function initCalendar(selector, options){
	var defaultOptions = {
	      	format: 'yyyy/mm/dd',
	      	keyboardNavigation: false,
	  	      forceParse: false,
	  	      autoclose: true
	  	};
	
	if(options == null){
		options = defaultOptions;
	}else{
		options.format = options.format || defaultOptions.format;
		options.keyboardNavigation = options.keyboardNavigation || defaultOptions.keyboardNavigation;
		options.forceParse = options.forceParse || defaultOptions.forceParse;
		options.autoclose = options.autoclose || defaultOptions.autoclose;
	}
	
	$(selector).datepicker(options);
}



//blockUI
function blockUI(){
	
	$.blockUI({ css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } }); 
}

function unblockUI(){
	$.unblockUI();
}

//copy to clickboard
function copyToClipboard(value) {

	  // Create a "hidden" input
	  var aux = document.createElement("input");

	  // Assign it the value of the specified element
	  aux.setAttribute("value", value);

	  // Append it to the body
	  document.body.appendChild(aux);

	  // Highlight its content
	  aux.select();

	  // Copy the highlighted text
	  document.execCommand("copy");

	  // Remove it from the body
	  document.body.removeChild(aux);

	}




