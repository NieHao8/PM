package com.test.pm.dao;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import com.test.pm.model.Role;

public interface RoleRepository  extends GraphRepository<Role>{
	
	@Query("match (r:Role) where r.name={0} return r")
	public Role add(String name);

}
