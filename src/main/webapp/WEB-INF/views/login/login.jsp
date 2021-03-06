<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>LOGIN</title>

<link href="../css/bootstrap.min.css" rel="stylesheet">
<link href="../font-awesome/css/font-awesome.css" rel="stylesheet">

<link href="../css/animate.css" rel="stylesheet">
<link href="../css/style.css" rel="stylesheet">

</head>

<body class="gray-bg">

	<div class="middle-box text-center loginscreen animated fadeInDown">
		<div>
			<div>

				<h1 class="logo-name">P\M</h1>

			</div>
			<h3>Password Management</h3>
			<form class="m-t" role="form" method="post"  action="j_spring_security_check">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" name="username" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" name="password" required="">
                </div>
                <div class="form-group">
                    
                        <div class="checkbox i-checks"><label> <input type="checkbox"  name="remember-me"><i></i> Remember me </label></div>
                    
                </div>
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                 
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
 				
 				<!-- 
                <a href="#"><small>Forgot password?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
                 -->
            </form>
			<p class="m-t">
				<small>Inspinia we app framework base on Bootstrap 3 &copy;
					2014</small>
			</p>
		</div>
	</div>

	<!-- Mainly scripts -->
	<script src="../js/jquery-2.1.1.js"></script>
	<script src="../js/bootstrap.min.js"></script>

</body>

</html>
