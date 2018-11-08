package com.test.pm.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.pm.dao.UserRepository;
import com.test.pm.model.User;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	@Autowired
	private UserRepository userDAO;
	@Override
	public void add(User user) {
		
		userDAO.save(user);
	}
	@Override
	public User findUserByName(String name) {
		User user=userDAO.findByUserName(name);
		if(user==null) {
			return null;
		}
		return userDAO.findOne(user.getId());
	}
	@Override
	public User login(String name, String password) {
		
		return userDAO.login(name, password);
	}
	

}
