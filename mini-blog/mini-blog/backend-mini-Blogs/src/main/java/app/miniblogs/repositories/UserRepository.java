package app.miniblogs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import app.miniblogs.models.User;

public interface UserRepository extends JpaRepository<User,String>{

	User findByUsername(String username);

}
