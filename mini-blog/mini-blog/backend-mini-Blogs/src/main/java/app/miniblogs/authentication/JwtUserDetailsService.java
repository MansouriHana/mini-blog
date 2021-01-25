package app.miniblogs.authentication;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.miniblogs.models.ConnectedUser;
import app.miniblogs.models.User;
import app.miniblogs.repositories.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder bcryptEncoder;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user= userRepository.findByUsername(username);
		
		
		if(user==null) {
			throw new UsernameNotFoundException("User not found with username "+username);
		}
		System.out.println("userName=>"+user.getUsername());
		System.out.println("password=>"+user.getPassword());
		org.springframework.security.core.userdetails.User userauth = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
		System.out.println(userauth);
		 return userauth;
	}
	
	public User save(User user) {
		System.out.println(user);
		user.setUsername(user.getUsername());
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
}
