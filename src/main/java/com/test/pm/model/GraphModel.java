package com.test.pm.model;


import org.apache.commons.collections.ComparatorUtils;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.neo4j.ogm.annotation.GraphId;

public abstract class GraphModel implements java.io.Serializable, Comparable<GraphModel> {
	
	@GraphId
	private Long id;
	
	
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	@Override
	public boolean equals(Object obj) {
		if(obj instanceof GraphModel && this.getId() != null){
//		    	System.out.println(this.getId() + "vs" +((GraphModel)obj).getId()  );
			return this.getId().equals( ((GraphModel)obj).getId()  );
		}else{
			return super.equals(obj);
		}
	}
	

	@Override
	public int compareTo(GraphModel o) {
		
		if(o == null || o.getId() == null){
			return 1;
		}else if(this.id == null){
			return -1;
		}else{
			return this.getId().compareTo(o.getId());
		}
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	
	
	
}
