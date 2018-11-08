<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>

</head>
<body>
	<!-- resources for bootstrap table -->
	<link href="../css/bootstrap-table/bootstrap-table.css" rel="stylesheet" />
	<script type="text/javascript" src="../js/bootstrap-table/bootstrap-table.js"></script>
	<script type="text/javascript" src="../js/bootstrap-table/tableExport.js"></script>
	<script type="text/javascript" src="../js/bootstrap-table/jquery.base64.js"></script>
	<script type="text/javascript" src="../js/bootstrap-table/bootstrap-table-export.js"></script>

	<content tag="pageTitle">My VM List</content>
	<script>
		
	$(function(){
		
		
		initListSearch();
		
		$('#mainTable').on('load-success.bs.table', function (e, arg1, arg2) {
			unblockUI();
		});
		
		$('.js-switch').change(function(){
			
			refreshData();
		});
		
		$('#filterStatus, #filterInVCenter').change(function(){
			refreshData();
			
		});
		refreshData();
		
	});	
	
		function markSpecialName(id){
			
			var url = "../vm/markSpecialName.html";
			
			BootstrapDialog.confirm('Are you sure remove this VM from discrepant name list?', function(result){
	            if(result) {
	            	$.postData(url , "id="+id, function(data) {
						BootstrapDialog.show({
							message : "VM is removed from discrepant name",
							onhide : function(){
								$('#mainTable').bootstrapTable('refresh');
							}
						});
						//reloadWithCriteria();
					});	
	            }
	        });
		}
		
		
		
		function displaySystem(systemId){
			
			
			$.postData("../systemCatalog/display.html", "id="+systemId, function(data) {

				modal.setModal('System Catalog Information', data);
				modal.showModal();
				
			});	
			
		}
		
		function nameFormatter(value, item, index){
			if(value){
				
				var mark = "<span class='fa fa-circle' aria-hidden='true' style='color:transparent'></span> ";
				if(item.deleted){
					mark = "<span title='Removed from vCenter' class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span> ";
				}else if( item.status && item.status.toLowerCase() == 'active' ){
					
					mark = "<span class='fa fa-circle' aria-hidden='true' style='color:green'></span> ";
				}else if(! item.cpuNum){
					mark = "<span title='Non-Provisiioned' class='glyphicon glyphicon-question-sign' aria-hidden='true'></span> ";
				}
				var href = "../vm/display.html?id="+item.id;
				
				return mark + "<a href='"+ href +"' listName='vm' displayName='VM' embedded='true' itemId='"+item.id+"'  onclick='display(this);return false;'>"+item.serverName +"</a>" ;
			}
		}
		
		function contactFormatter(value, item, index){
			//var rtn = "";
			//if(value){
			//	for(var i = 0 ; i < value.length ; ++i){
			//		
			//		var ct = value[i];
			//		rtn += ct +", ";
			//		
			//	}
			//	
			//}
			//return trimJoined(rtn);
			return trimJoined(value);
		}
		
		
		function systemFormatter(value, item, index){
			
			var rtn = "";
			
			if(value){
				var list = [];
				for(var i = 0 ; i < value.length; ++i){
					var s = value[i];
					var systemName = '"'+s.systemName+'"';
					var path = '../systemCatalog/display.html?id=' + s.id;
					list.push("<a href='"+ path +"' onclick='displaySystem("+s.id+");return false;'>"+ s.systemName +"</a>"  ) ;	
					
				}
				rtn = list.join(", ");
			}
			return rtn;
			
		}
		
		function ipFormatter(value, item, index){
			value = trimJoined(value);
			return value.replace(',', ',<br/>');
		}
		
		
		function actionFormatter(value, item, index){
			
			var action = "";
			
			
			action = "<a href='' listName='vm' displayName='VM' embedded='true' itemId='"+item.id+"' onclick='goEdit(this);return false;' title='edit'>"
						+"<span class='fa fa-edit fa-lg'></span>"
					+"</a>" +
					"<a href='' onclick='markSpecialName("+item.id+");return false;' title='markSpecialName'>"
					+"<span class='fa fa-bell-slash fa-lg'></span>"
					+"</a>";
			return action;
			
		}
		
		
		function refreshData(){
			//blockUI();
			var url = "../vm/myListQuery.html"; 
			var noSystem = $('#noSystem').prop('checked');
			var noContact = $('#noContact').prop('checked');
			var onlyActive = $('#onlyActive').prop('checked');
			var onlyNotActive = $('#onlyNotActive').prop('checked');
			var notInVCenter = $('#notInVCenter').prop('checked');
			var onlyInVCenter = $('#onlyInVCenter').prop('checked');
			var discrepantName = $('#discrepantName').prop('checked');
			
			var filterStatus =  $('#filterStatus').val();
			var filterInVCenter =  $('#filterInVCenter').val();
			
			
			if(noSystem){
				url += "&noSystem=true"; 
			}
			if(noContact){
				url += "&noContact=true"; 
			}
			if(onlyActive){
				url += "&onlyActive=true"; 
			}
			if(onlyNotActive){
				url += "&onlyNotActive=true"; 
			}
			if(notInVCenter){
				url += "&notInVCenter=true"; 
			}
			if(onlyInVCenter){
				url += "&onlyInVCenter=true"; 
			}
			if(discrepantName){
				url += "&discrepantName=true"; 
			}
			if(filterStatus){
				url += "&filterStatus="+filterStatus ;
			}
			if(filterInVCenter){
				url+="&filterInVCenter="+ filterInVCenter;
			}
			
			url = url.replace('&', '?');
			
			
			$('#mainTable').bootstrapTable("refresh",{url:url});
		}
		
		 
		function deleteItem(id){
			
			var url = "../vm/delete.html";
			
			BootstrapDialog.confirm('Are you sure to delete this VM ?', function(result){
	            if(result) {
	            	$.postData(url , "id="+id, function(data) {
						BootstrapDialog.show({
							message : "VM deleted",
							onhide : function(){
								reloadWithCriteria();
							}
						});
						//reloadWithCriteria();
					});	
	            }
	        });
		}
		
		
	</script>

	<div class="form-inline">
		<span class="control-label">Status</span>
						<select id="filterStatus" class="form-control" name="filterStatus">
			                <option></option>
			                <option selected="selected" >Active</option>
			                <option>Decommissioned</option>
			            </select>
		         &nbsp;&nbsp;
		         <span class="control-label">In vCenter</span>
		         		<select id="filterInVCenter" class="form-control" name="filterInVCenter">
			                <option></option>
			                <option selected="selected" value="true" >Yes</option>
			                <option value="false">No</option>
			            </select>
				
				<span class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="noSystem"  /> No System
				</span>
				<!-- 
				<label class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="noContact"  /> No Contact
				</label>
				<label class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="onlyActive" checked="checked"  /> Only Active
				</label>
				<label class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="onlyNotActive"  /> Only Not Active
				</label>
				<label class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="notInVCenter"  /> Not In vCenter
				</label>
				<label class="checkbox-inline">
				  <input type="checkbox" class="js-switch" id="onlyInVCenter" checked="checked" /> only In vCenter
				</label>
				 -->
				<span class="checkbox-inline" title="The VM name doesn't match the Computer Name" >
				  <input type="checkbox" class="js-switch" id="discrepantName"  title="The VM name doesn't match the Computer Name" /> Discrepant Name
				</span>
	
	</div>

	<div id="toolbar">
			<div class="form-inline" role="form">
				<sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_IT')">
					<button id="openAddBtn" class="btn btn-default" listName='vm' displayName='VM' embedded='true' itemId='${item.id}' onclick="goAdd(this);">Add VM</button>
				</sec:authorize>
				&nbsp;&nbsp;
				
				
			</div>
				
				
			
			
	
		
	</div>

	<table id="mainTable" width="100%" border="0" cellspacing="0" cellpadding="0" data-toggle="table" data-classes="table table-hover table-condensed" 
		data-striped="true"
		data-pagination="true" data-show-pagination-switch="true" data-page-size="50" data-page-list="[5, 10, 20, 50, 100, 200]" data-show-columns="true"
		data-toolbar="#toolbar" data-search="true" data-show-export="true"  data-sortable="true"
		data-side-pagination="server" >
		<thead>
			<tr>
				<th data-field="serverName" class="th col-xs-2" data-switchable="false" data-formatter="nameFormatter" data-sortable="true">Server Name</th>
				<th data-field="location" class="th col-xs-1" >Location</th>
				<th data-field="s_ip" class="th col-xs-2"  data-formatter="ipFormatter"  data-sortable="true" >IP</th>
				<th data-field="s_primary_contact" class="th col-xs-2"  data-formatter="contactFormatter"  data-sortable="true" >Primary Contact</th>
				<th data-field="s_secondary_contact" class="th col-xs-2"   data-formatter="contactFormatter"  data-sortable="true" >Secondary Contact</th>
				<th data-field="systems" class="th col-xs-2"   data-formatter="systemFormatter" data-sortable="true">System</th>
				<th data-field="domain" class="th col-xs-2" data-sortable="true">Domain</th>
				<th data-field="status" class="th col-xs-1" data-sortable="true">Status</th>
				<th data-field="environment" class="th col-xs-2" data-sortable="true">Environment</th>
				<th data-field="osName" class="th col-xs-2"  data-visible="false" data-sortable="true">OS</th>
				
				<th data-field="type" class="th col-xs-2"  data-visible="false" data-sortable="true">Type</th>
				<th data-field="powerState" class="th col-xs-2"  data-visible="false" data-sortable="true">Power State</th>
				<th data-field="vcenter" class="th col-xs-2"  data-visible="false" data-sortable="true">vCenter</th>
				<th data-field="hostName" class="th col-xs-2"  data-visible="false" data-sortable="true">vCenter Host Name</th>
				<th data-field="escalationPath" class="th col-xs-2" data-visible="false" data-sortable="true">Escalation Path</th>
				<th data-field="fqdn" class="th col-xs-2" data-visible="false" data-sortable="true">FQDN</th>
				
				<th data-field="costCenter" class="th col-xs-2"  data-visible="false" data-sortable="true">Cost Center</th>				
				<th data-field="department" class="th col-xs-2"  data-visible="false" data-sortable="true">Department</th>
				<th data-field="severity" class="th col-xs-2" data-visible="false" data-sortable="true">Severity</th>
				<th data-field="computerName" class="th col-xs-2"  data-visible="false" data-sortable="true">Computer Name</th>
				<th data-field="cpuNum" class="th col-xs-1" data-sortable="true" data-visible="false">CPU</th>
				<th data-field="ramMB" class="th col-xs-1"  data-visible="false" data-sortable="true">RAM(MB)</th>
				<th data-field="hddMB" class="th col-xs-1"  data-visible="false" data-sortable="true">HDD(MB)</th>
				<th data-field="notes" class="th col-xs-1"  data-visible="false" data-sortable="true">Notes</th>
				<%--
               <th data-field="createdBy" class="th col-xs-2"  data-visible="false">Created By</th>
               <th data-field="createdDate" class="th col-xs-2"  data-visible="false">Created</th>
               <th data-field="modifiedBy" class="th col-xs-2"  data-visible="false">Modified By</th>
               <th data-field="modifiedDate" class="th col-xs-2"  data-visible="false">Modified</th>
                --%>
				<th data-field="action" class="th col-xs-2" data-switchable="false" data-searchable="false" data-formatter="actionFormatter">Action</th>

			</tr>
		</thead>
	</table>

</body>
</html>