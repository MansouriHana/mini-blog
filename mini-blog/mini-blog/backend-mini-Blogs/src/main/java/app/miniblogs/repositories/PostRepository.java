package app.miniblogs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.miniblogs.models.Post;

public interface PostRepository extends JpaRepository<Post,Long>{

	//@Query("DELETE FROM Comment c, Post p WHERE c.id=:id and p.id=:id")
	void deleteById(Long id);

}
