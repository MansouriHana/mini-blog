package app.miniblogs.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.miniblogs.models.Post;
import app.miniblogs.models.User;
import app.miniblogs.repositories.PostRepository;

@RestController
@RequestMapping(value="/api/blog",consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
@CrossOrigin(origins = "http://localhost:3000/")
public class PostController {

	@Autowired
	private PostRepository postRepository;
	
	@GetMapping(value="/getAllPosts",  produces = {"application/json"})
	public List<Post> getAllPosts(){
		return postRepository.findAll();
	}
	@PostMapping("/addPost")
	public ResponseEntity<Post> addPost(@RequestBody Post post){
		System.out.println(post);
		System.out.println(post.getCreatedDate());
		postRepository.save(post);
		return new ResponseEntity<Post>(post, HttpStatus.CREATED);	
	}
	@DeleteMapping("/deletePost/{id}")
	public ResponseEntity<?> deletePost(@PathVariable Long id){
		postRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
