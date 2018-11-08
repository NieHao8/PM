package com.test.pm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ServerController {
	
	@RequestMapping("/server/list.html")
	public String list(Model model) {
		System.out.println("server list");
		
		return "server/myList";
	}

}
