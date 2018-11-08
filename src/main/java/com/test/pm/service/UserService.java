package com.test.pm.service;

import com.test.pm.model.User;

public interface UserService {
	
	public void add(User user);

	public User findUserByName(String name);
	
	public User login(String name,String password);

}
