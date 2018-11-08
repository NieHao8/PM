package com.test.pm.config;


import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.neo4j.ogm.MetaData;
import org.neo4j.ogm.metadata.ClassInfo;
import org.neo4j.ogm.metadata.FieldInfo;
import org.neo4j.ogm.metadata.ObjectAnnotations;
import org.neo4j.ogm.session.Session;
import org.neo4j.ogm.session.SessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.fasterxml.jackson.databind.ObjectMapper;



/**
 */
@Configuration
@EnableNeo4jRepositories("com.test.pm.dao")
@EnableTransactionManagement
@ImportResource("classpath:properties-config.xml")
public class Neo4jContext extends Neo4jConfiguration {

//	public static final String NEO4J_HOST = "http://localhost:";
//	public static final int    NEO4J_PORT = 7474;
	
	@Value("${neo4j.host}")
	private String NEO4J_HOST ;
	@Value("${neo4j.port}")
	private String NEO4J_PORT;
	@Value("${neo4j.username}")
	private String USERNAME;
	@Value("${neo4j.password}")
	private String PASSWORD;
		
	
	
//	@Bean
//	public SessionFactory getSessionFactory() {
//	    return new SessionFactory(getConfiguration(), <packages> );
//	}
	
	@Bean
	public org.neo4j.ogm.config.Configuration getConfiguration() {
	   org.neo4j.ogm.config.Configuration config = new org.neo4j.ogm.config.Configuration();
	   config
	       .driverConfiguration()
	       .setDriverClassName("org.neo4j.ogm.drivers.http.driver.HttpDriver")
	       .setURI(NEO4J_HOST+":"+NEO4J_PORT).setCredentials(USERNAME, PASSWORD);
	   return config;
	}
	
	
	@Override
	public SessionFactory getSessionFactory() {
	    
	    
	    SessionFactory sf =  new SessionFactory(getConfiguration(),"com.test.pm.model");
	    
//	    MetaData md = sf.metaData();
//	    
//	    ClassInfo cin = md.classInfo("PhysicalServer");
//	    
//	    Collection<FieldInfo> relationsipFields = cin.relationshipFields();
//	    
//	    Collection<String> labels  = cin.staticLabels();
//	    
//	    Collection<FieldInfo> propertyFields = cin.propertyFields();
//	    
//	    cin.identityField();
//	    
//	    System.out.println();
//	    System.out.println();
//	    System.out.println();
//	    System.out.println("======================  PhysicalServer Metadata   =================");
//	    System.out.println(" Labels : ");
//	    for(String label : labels){
//		System.out.println(label);
//	    }
//	    System.out.println();
//
//	    System.out.println("======================= Properties =========================");
//	    for(FieldInfo fin : propertyFields){
//		System.out.println(fin.getName());
//	    }
//	    System.out.println();
//	    System.out.println("====================== Relationships ==========================");
//	    for(FieldInfo fin : relationsipFields){
//		System.out.println("<<Relationship>>");
//		System.out.println(fin.relationship());
//		System.out.println(fin.relationshipDirection(fin.relationship()));
//		ObjectAnnotations oanno = fin.getAnnotations();
////		System.out.println(oanno.get("type").getName());
////		System.out.println(oanno.get("direction").getName());
//		System.out.println("<</Relationship>>");
//		System.out.println();
//	    }
//	    
//	    System.out.println();
//	    System.out.println();
//	    System.out.println();
	    return sf;
	    
	    
	    
	}

	
	
//	/***
//	 * This is the Neo4jTemplate wrapper, using wrapper is to prevent the same bean type in spring bean factory
//	 * And this is the one for those doesn't query database from web request 
//	 * @return
//	 * @throws Exception
//	 */
//	@Bean
//	@Scope(value = "singleton")
//	 public Neo4jTemplateWrapper getNeo4jTemplate() throws Exception {
//	     return new Neo4jTemplateWrapper(super.getSession());
//	 }
	
	

	@Bean
	@Override
	@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
	public Session getSession() throws Exception {
		return super.getSession();
	}
	

	
	

	
}

