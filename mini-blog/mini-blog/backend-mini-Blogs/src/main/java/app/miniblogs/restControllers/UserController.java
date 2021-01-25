package app.miniblogs.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;



import app.miniblogs.authentication.JwtTokenUtil;
import app.miniblogs.authentication.JwtUserDetailsService;
import app.miniblogs.models.JwtRequest;
import app.miniblogs.models.JwtResponse;
import app.miniblogs.models.User;
import app.miniblogs.repositories.UserRepository;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value="/api/auth",consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
public class UserController {
        
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	@Autowired
	private UserRepository userRepository;
	

	@GetMapping(value="/getUsers",  produces = {"application/json"})
	public List<User> getAllPosts(){
		return userRepository.findAll();
	}

	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> createAuthetication(@RequestBody JwtRequest authenticationRequest) throws Exception{
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		System.out.println("4444444444444444444444444444444444444444444444");
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		/*JwtUserDetails jwsUserDetails = new JwtUserDetails();
		jwsUserDetails.setUsername(authenticationRequest.getUsername());*/
		System.out.println("Username22222 => "+userDetails.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
        System.out.println("token "+token);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}		
	}
	
	@PostMapping( "/register")
	public ResponseEntity<?> saveUser(@RequestBody User user) throws Exception {
		System.out.println(user);
		return ResponseEntity.ok(userDetailsService.save(user));
	}
	@GetMapping(value="/currentUser/{token}")
	public User getCurrentUser(@PathVariable String token) {
		System.out.println(jwtTokenUtil.getUsernameFromToken(token));
		return userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(token));
		
	}
}
