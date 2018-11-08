package com.test.pm.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.pm.model.User;
import com.test.pm.service.UserService;


public class UserDetailServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user=userService.findUserByName(username);
		
		if (user != null) {

		    List<String> auths = user.getAuthorityStringList();
		    auths.add(user.getRole().getName());
		    if(user.getRole().getName().equals("ROLE_ADMIN"))
		    {
		    	auths.add("ROLE_USER");
		    }
		    user.setGrantedAuthorities(auths);
		}
		if(user==null) {
			throw new  UsernameNotFoundException("Username does not exist!");
		}
		System.out.println("user"+user);
		return user;
	}

}
