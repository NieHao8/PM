package com.test.pm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.pm.dao.RoleRepository;
import com.test.pm.model.Role;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleRepository roleDAO;

	@Override
	public Role findRoleByName(String name) {
		
		return roleDAO.add(name);
	}

}
