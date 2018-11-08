package com.test.pm.dao;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.test.pm.model.User;


@Repository
public interface UserRepository extends GraphRepository<User> {
	
	@Query("match (u:User) where u.userId =~ {0} return u ")
	public User findByUserId(String userId);
	
	@Query("match (u:User) where u.name =~ {0} return u ")
	public User findByUserName(String name);
	
	@Query("match (u:User) where u.name =~ {0} and u.password={1} return u ")
	public User login(String name,String password);

}
