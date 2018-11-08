package com.test.pm;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.eclipse.jetty.server.Authentication.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.test.pm.service.UserService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private UserService UserService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/home/home.html", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		UserService.add(new com.test.pm.model.User());
		return "home/home";
	}
	
	@RequestMapping(value="/login/login.html")
	public String login(Model model) {
		System.out.println("login");
		return "login/login";
	}
	
	@RequestMapping(value="/**")
	public String index(Model model) {
		System.out.println("index");
		return "index";
	}
	
}
