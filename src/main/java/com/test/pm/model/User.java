package com.test.pm.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.Transient;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@NodeEntity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="jacksonId")
public class User extends GraphModel implements UserDetails {
	
	private String name;
	
	private String mail;
	
	private String phone;
	
	@Transient
	private String username;
	@Transient
	private String password;
	@Transient
	private List<GrantedAuthority>  grantedAuthorities= null;
	
	@Relationship(type="ROLE", direction=Relationship.OUTGOING)
	private Role role;
	
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	

	public List<GrantedAuthority> getGrantedAuthorities() {
		return grantedAuthorities;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.grantedAuthorities;
		 
	}
	
public List<String> getAuthorityStringList() {
	List<String> auths = new ArrayList<String>();
	if(this.getAuthorities() != null){
		for( GrantedAuthority auth :  this.getAuthorities()){
			auths.add(auth.getAuthority());
	 	}
	}
	
	return auths;
	}

public  <T> void setGrantedAuthorities(List<T> authorities) {
	if(authorities == null)   this.grantedAuthorities = null;
	this.grantedAuthorities = new ArrayList<GrantedAuthority>();
	for(T auth : authorities){
		if(auth instanceof String){
			this.grantedAuthorities.add(new SimpleGrantedAuthority((String)auth));
		}else if(auth instanceof GrantedAuthority){
			this.grantedAuthorities = (List<GrantedAuthority>) authorities;
		}
		
	}
}

	@Override
	public String getPassword() {
		
		return password;
	}

	@Override
	public String getUsername() {
		
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
