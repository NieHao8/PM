package com.test.pm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


import com.test.pm.model.User;
import com.test.pm.service.RoleService;
import com.test.pm.service.UserService;

@Controller
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	
	@Secured(value= {"ROLE_ADMIN"})
	@RequestMapping("/user/add.html")
	public String add(Model model) {
		User user=new User();
		
		user.setMail("@163.com");
		user.setName("hak");
		user.setPhone("990");
		//user.setPassword("321");
		user.setRole(roleService.findRoleByName("USER"));
		userService.add(user);
		return "home/home";
	}
	
	@Secured(value= {"ROLE_USER"})
	@RequestMapping("/user/list.html")
	public String list(Model model) {
		System.out.println("list");
		return "home/home";
	}

}
