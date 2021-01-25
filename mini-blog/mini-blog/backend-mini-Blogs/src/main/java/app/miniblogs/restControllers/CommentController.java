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

import app.miniblogs.models.Comment;
import app.miniblogs.models.Post;
import app.miniblogs.repositories.CommentRepository;

@RestController
@RequestMapping(value="/api/blog",consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
@CrossOrigin(origins = "http://localhost:3000/")
public class CommentController {
	
	@Autowired
	private CommentRepository commentRepository;
	@GetMapping(value="/userComments/{postId}")
	public List<Comment> getCommentsByUser( @PathVariable Long postId){
		return commentRepository.findByUserAndPost( postId);
	}
	@PostMapping(value="/addComment",  produces = {"application/json"})
	public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
		System.out.println(comment);
		if(comment!=null) {
			System.out.println(comment);
			commentRepository.save(comment);
			return new ResponseEntity<Comment>(comment, HttpStatus.CREATED);	
		}else {
			return null;
		}
	}
	@DeleteMapping("/deleteComment/{id}")
	public ResponseEntity<?> deleteComment(@PathVariable Long id){
		commentRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
