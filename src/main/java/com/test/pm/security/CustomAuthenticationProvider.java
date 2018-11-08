package com.test.pm.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.intercept.RunAsUserToken;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.pm.model.User;
import com.test.pm.service.UserService;
import com.test.pm.security.UserDetailServiceImpl;;


public class CustomAuthenticationProvider implements AuthenticationProvider {
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
	@Autowired
	private UserService userService;
	@Autowired
	private UserDetailsService userDetailsService; 

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		User u=userService.login(username, password);
		if(u==null) {
			throw new  UsernameNotFoundException("Username does not exist!");
		}
		User user = (User) userDetailsService.loadUserByUsername(u.getName());
		Authentication auth = new RunAsUserToken("key", user, password,user.getAuthorities(),RunAsUserToken.class  );
		return auth;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return true;
	}

}
