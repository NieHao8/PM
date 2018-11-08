<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<sec:authentication var="principal" property="principal" />
<html>
<head>
	<title>Home</title>
	<script type="text/javascript" src="../js/jquery-2.1.1.js"></script>
</head>
<body>
<script type="text/javascript">
$(function(){
	alert("123")
})

</script>
<h1>
	Hello world!  
</h1>

<P>  The time on the server is ${serverTime}. hello ${principal.name } and Gary Nie</P>

<sec:authorize access="hasAnyRole('ROLE_ADMIN')">
<p>you is my VIP</p>
</sec:authorize>
</body>
</html>
