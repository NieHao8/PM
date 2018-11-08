<?xml version="1.0" encoding="UTF-8" ?>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%-- Define login user as local variable principal --%>
<sec:authentication var="principal" property="principal" />
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />

<!-- <meta http-equiv="refresh" content="0; url=.." /> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>OSP | <sitemesh:write property='title'/></title>
<link rel="shortcut icon" href="../img/osp/favicon.ico" type="image/x-icon">
<link href="../css/bootstrap.min.css" rel="stylesheet" />
<link href="../font-awesome/css/font-awesome.css" rel="stylesheet" />

<!-- Toastr style -->
<link href="../css/plugins/toastr/toastr.min.css" rel="stylesheet" />

<!-- Gritter -->
<link href="../js/plugins/gritter/jquery.gritter.css" rel="stylesheet" />

<!-- jQuery UI -->
<link href="../css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" />


<!-- bootstrap dialog -->
<link href="../css/bootstrap-dialog/bootstrap-dialog.css" rel="stylesheet" />

<!-- select2 4.0.0 -->
<link href="../css/select2/select2.css" rel="stylesheet" />

<!-- switcher  -->
<link href="../css/plugins/switchery/switchery.css" rel="stylesheet">




	<!-- Custom by Theme-->
<link href="../css/animate.css" rel="stylesheet" />
<link href="../css/style.css" rel="stylesheet" />
<!-- Custom by OSP-->
<link href="../css/osp.css" rel="stylesheet" />
<!-- Bootstrap datepicker -->
<link href="../css/plugins/datapicker/datepicker3.css" rel="stylesheet">

	<!-- jquery json-viewer -->
<link href="../css/json-viewer/jquery.json-viewer.css" rel="stylesheet">


	<!-- Mainly scripts -->
<script src="../js/jquery-2.1.1.js"></script>
<script src="../js/jquery-ui.autoComplete.min.js"></script>

<script src="../js/bootstrap.min.js"></script>


<script>
	//define context root
	root = 'pm';
	ctxRoot = root;
</script>
<script src="../js/osp.js"></script>
<script src="../js/ospUtil.js"></script>
<script src="../js/ospForm.js"></script>
<script src="../js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="../js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="../js/inspinia.js"></script>
<script src="../js/plugins/pace/pace.min.js"></script>

<!-- bootstrap dialog -->
<script src="../js/bootstrap-dialog/bootstrap-dialog.js"></script>
<!-- select 4.0.0 -->
<script src="../js/select2/select2.js"></script>

<!-- jquery validate -->
<script src="../js/plugins/validate/jquery.validate.min.js"></script>
<!-- Data picker -->
<script src="../js/plugins/datapicker/bootstrap-datepicker.js"></script>
<!-- BlockUI-->
<script src="../js/jquery.blockUI/jquery.blockUI.js"></script>
<!-- Switcher -->
<!-- Switchery -->
<script src="../js/plugins/switchery/switchery.js"></script>

<!-- json-viewer -->
<script src="../js/json-viewer/jquery.json-viewer.js"></script>

<script>
	function logout()
	{
		var form = $('<form method="post" action="../logout "/>');
		form.append($('#csrf'));
		form.appendTo("body").submit();
	}
</script>


</head>
<body class="pace-done fixed-sidebar fixed-nav">

	<!-- CSRF for Security Post Data -->
	<input id="csrf" type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
	<div id="wrapper">

		<nav class="navbar-default navbar-static-side" role="navigation">
			<div class="sidebar-collapse">
				<ul class="nav" id="side-menu">
					<li class="nav-header">
						<div class="dropdown profile-element">
							<a data-toggle="dropdown" class="dropdown-toggle" href="#"> <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">${principal.name}</strong>
								</span> <span class="text-muted text-xs block">principal.aDUser.title<b class="caret"></b>
								</span>
							</span>
							</a>
							<ul class="dropdown-menu animated fadeInRight m-t-xs">
								<li><a href="../logout" onclick="logout();return false;">Logout</a></li>
							</ul>
						</div>
						<div class="logo-element">OSP</div>
					</li>
					<!-- Home -->
					<li><a href="../index.html"> <i class="fa fa-diamond"></i> <span class="nav-label">Home Page</span>
					</a></li>
					<li><a href="#"> <i class="fa fa-bar-chart-o"></i> <span class="nav-label">Server Catalog</span><span class="fa arrow"></span>
					</a>
						<ul class="nav nav-second-level">
							<li><a href="../server/list.html"> My Server Catalog </a></li>
							<sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_IT','ROLE_READ_ONLY')">
								<li><a href="../serviceCatalog/adminList.html"> All Server Catalog </a></li>
							</sec:authorize>
						</ul></li>


					<li><a href="#"> <i class="fa fa-bar-chart-o"></i> <span class="nav-label">System Catalog</span><span class="fa arrow"></span>
					</a>
						<ul class="nav nav-second-level">
							<li><a href="../systemCatalog/list.html"> My System Catalog </a></li>
							<sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_IT','ROLE_READ_ONLY')">
								<li><a href="../systemCatalog/adminList.html"> All System Catalog </a></li>
							</sec:authorize>
						</ul></li>


					<!-- Inventory -->
					<li><a href="#"> <i class="fa fa-bar-chart-o"></i> <span class="nav-label">Inventory</span><span class="fa arrow"></span>
					</a>
						<ul class="nav nav-second-level">
							<li><a href="../vm/list.html">My VM</a></li>
							<li><a href="../physicalServer/list.html">My Physical Device</a></li>
							<%-- <c:if test="${principal.name=='Gary Nie (EXT-CN)' }"> --%>
                            <li><a href="../kubernetes/list.html">My Kubernetes Namespace List</a></li>
                            <%-- </c:if> --%>
							<sec:authorize access="hasAnyRole('ROLE_ADMIN', 'ROLE_IT', 'ROLE_READ_ONLY')">
								<li><a href="../vm/adminList.html"> <span class="nav-label">All VM List</span>
								</a></li>

								<li><a href="../physicalServer/adminList.html"> <span class="nav-label">All Physical Device</span>
								</a></li><%-- <c:if test="${principal.name=='Gary Nie (EXT-CN)' }"> --%>
                                <li><a href="../kubernetes/adminList.html"> <span class="nav-label">All Kubernetes Namespace List</span></a></li>
                                <%-- </c:if> --%>
								<li><a href="../lBVserver/list.html">L4</a></li>

								<li><a href="../vendor/list.html"> <span class="nav-label">Vendor</span></a></li>
								
                               

							</sec:authorize>




						</ul></li>



					<!-- Technology 
					<li><a href="mailbox.html"><i class="fa fa-envelope"></i>
							<span class="nav-label">Technology</span></a>
						<ul class="nav nav-second-level">
							<li><a href="mailbox.html">Technology</a></li>
							<li><a href="mail_detail.html">Technology Admin Page</a></li>
						</ul></li>
					-->
					<!-- MA Info -->
					<sec:authorize access="hasAnyRole('ROLE_OSP_ADMIN', 'ROLE_IT')">
						<c:if test="${principal.name=='Gary Nie (EXT-CN)' }">
							<li><a href="#"> <i class="fa fa-bar-chart-o"></i> <span class="nav-label">MA Information</span><span class="fa arrow"></span>
							</a>
								<ul class="nav nav-second-level">
									<li><a href="../maMgmt/listDevice.html">MA List</a></li>
								</ul></li>
						</c:if>

					</sec:authorize>


					<sec:authorize access="hasAnyRole('ROLE_ADMIN', 'ROLE_IT', 'ROLE_READ_ONLY')">
						<li><a href="#"> <i class="fa fa-user"></i> <span class="nav-label">Service Account</span><span class="fa arrow"></span>
						</a>
							<ul class="nav nav-second-level">



								<li><a href="../serviceAccount/treeView.html"> <i class="fa fa-user"></i> <span class="nav-label">Service Account Tree View</span>
								</a></li>

								<li><a href="../serviceAccount/list.html"> <i class="fa fa-user"></i> <span class="nav-label">Service Account Query View</span>
								</a></li>

								<li><a href="../serviceAccount/listActivity.html"> <i class="fa fa-user"></i> <span class="nav-label">Service Account Activity
											Query View</span>
								</a></li>
							</ul></li>
					</sec:authorize>





					<sec:authorize access="hasAnyRole('ROLE_OSP_ADMIN')">

					</sec:authorize>

					<!-- Home -->
					<li><a href="../restAPI/list.html"> <i class="fa fa-leaf"></i> <span class="nav-label">Rest API Reference</span>
					</a></li>

				</ul>

			</div>
		</nav>

		<div id="page-wrapper" class="gray-bg">
			<div class="row border-bottom">
				<nav class="navbar navbar-fixed-top gray-bg" role="navigation" style="margin-bottom: 0; padding-top: 10px;">


					<div class="navbar-header">
						<a href=".." title="Trend Micro" style=""> <img src="../img/product_banner.png">&nbsp;&nbsp; 
						<H4 style="display: inline-block; font-size: 22px;">PASSWORD MANAGER</H4>
						</a>
					</div>
					<ul class="nav navbar-top-links navbar-right">
						<li><a href="../logout" onclick="logout();return false;"> <i class="fa fa-sign-out"></i> Logout
						</a></li>
					</ul>

				</nav>
			</div>

			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">


					<h2 id="pageTitle">
						<sitemesh:write property='title'/>
					</h2>
					<!-- Bread Crumb
                    <ol class="breadcrumb">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a>UI Elements</a>
                        </li>
                        <li class="active">
                            <strong>Typography</strong>
                        </li>
                    </ol>
                     -->
				</div>
				<!-- Separator -->
				<div class="col-lg-2"></div>
			</div>
			<div id="wrapperContent" class="wrapper wrapper-content animated fadeInRight">
				<c:if test="${not empty errorMessage}">
					<div class="alert alert-danger alert-dismissable">
						<button aria-hidden="true" data-dismiss="alert" class="close" type="button">&times;</button>
						ERROR : ${errorMessage}
					</div>
				</c:if>
				<sitemesh:write property='body'/

			</div>
			<div class="footer">

				<div class="pull-right">
					<!-- 	10GB of <strong>250GB</strong> Free. -->
				</div>
				<div>
					<strong>Copyright</strong> &copy; 2015 Trend Micro Incorporated. All rights reserved.
				</div>
			</div>

		</div>
	</div>
	<div class="modal inmodal fade" id="myModal" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="modalTitle" class="modal-title">Modal title</h4>
				</div>
				<div id="modalBody" class="modal-body"></div>
				<!-- 
         		<div id="modalFooter" class="modal-footer">
                    <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                    <button id="myModalSaveBtn" type="button" class="btn btn-primary">Save</button>
                </div>
				 -->

			</div>
		</div>
	</div>

	<div class="modal inmodal fade" id="myModal2" role="dialog" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="modalTitle2" class="modal-title">Modal title</h4>
				</div>
				<div id="modalBody2" class="modal-body"></div>
				<!-- 
         		<div id="modalFooter" class="modal-footer">
                    <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                    <button id="myModalSaveBtn" type="button" class="btn btn-primary">Save</button>
                </div>
				 -->

			</div>
		</div>
	</div>





</body>
</html>