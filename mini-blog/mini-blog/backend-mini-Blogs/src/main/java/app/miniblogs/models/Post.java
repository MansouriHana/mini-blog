package app.miniblogs.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="post")
@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class Post {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="post_id")
	private Long id;
	@Column(name="created_date")
	private Date CreatedDate;
	@Column(name="post_text")
	private String postText;
	
	@JsonIgnoreProperties(value="post",allowSetters=true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	 
	@JsonIgnoreProperties("post")
	@OneToMany(mappedBy="post")
	@JsonBackReference(value="postComment")
	private Set<Comment> comment;
	
	public Post() {
		super();
	}

	public Post(Long id, Date createdDate, String postText, User user, Set<Comment> comment) {
		super();
		this.id = id;
		CreatedDate = createdDate;
		this.postText = postText;
		this.user = user;
		this.comment = comment;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(Date createdDate) {
		CreatedDate = createdDate;
	}
	public String getPostText() {
		return postText;
	}
	public void setPostText(String postText) {
		this.postText = postText;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "Post [id=" + id + ", CreatedDate=" + CreatedDate + ", postText=" + postText + ", user=" + user
				+ ", comment=" + comment + "]";
	}
	public Set<Comment> getComment() {
		return comment;
	}
	public void setComment(Set<Comment> comment) {
		this.comment = comment;
	}
	
	
	
	
}
