package com.test.pm.model;


import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import org.neo4j.ogm.annotation.NodeEntity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@NodeEntity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="jacksonId")
public class Role  extends GraphModel implements java.io.Serializable {

	private String name;
	
	public Role(){}
	public Role(String name){
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	@Override
	public int compareTo(GraphModel o) {
		
		if(o instanceof Role){
			
			Role a = (Role) o;
			
			if(a == null ){
				return 1;
			}else if(this.name == null){
				return -1;
			}else{
				return getName().compareTo(a.getName());
			}
		}else{
			return super.compareTo(o);
		}
		
	}
	
	
	
	
}
