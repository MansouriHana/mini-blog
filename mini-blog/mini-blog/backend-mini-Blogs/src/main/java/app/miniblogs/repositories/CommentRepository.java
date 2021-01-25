package app.miniblogs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import app.miniblogs.models.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>  {

	@Query("SELECT new app.miniblogs.models.Comment(c.id,c.CreatedDate,c.commentText, c.user, c.post) from Comment c  WHERE  c.post.id= :postId")
	List<Comment> findByUserAndPost(Long postId);

}
