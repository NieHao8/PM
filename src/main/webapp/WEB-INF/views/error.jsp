<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<sec:authentication var="principal" property="principal" />
<!DOCTYPE html>
<html>

<head>

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<!-- <meta http-equiv="refresh" content="0; url=${ctxRoot}" /> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>REAL+ | 500 Error</title>

<link href="../css/bootstrap.min.css" rel="stylesheet">
<link href=../font-awesome/css/font-awesome.css" rel="stylesheet">

<link href="../css/animate.css" rel="stylesheet">
<link href="../css/style.css" rel="stylesheet">
<!-- Mainly scripts -->
<script src="../js/jquery-2.1.1.js"></script>
<script src="../js/bootstrap.min.js"></script>
</head>

<body class="gray-bg">
	<content tag="pageTitle">System Error Page</content>

	<div class="animated fadeInDown" style="text-align: left;">
		<c:set var="now" value="<%=new java.util.Date()%>" />
		<h1>Message : ${ex.message}</h1>
		<h1>Time : ${now}</h1>
		<h1>User : ${principal.name }</h1>
		<h3 class="font-bold"></h3>

		<div style="display:none">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Error Details</h5>
					<div class="ibox-tools">
						<a class="collapse-link"> <i class="fa fa-chevron-down"></i>
						</a>

					</div>
				</div>
				<div class="ibox-content">

					<div class="error-desc">

						<%
						    ((Exception) request.getAttribute("ex")).printStackTrace(new java.io.PrintWriter(out));
						%>
					</div>
				</div>
			</div>
		</div>
</body>

</html>
