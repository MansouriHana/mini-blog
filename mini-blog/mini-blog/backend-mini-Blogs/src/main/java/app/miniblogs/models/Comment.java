package app.miniblogs.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="comment")
public class Comment {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="comment_id")
	private Long id;
	@Column(name="created_date")
	private Date CreatedDate;
	@Column(name="comment_text")
	private String commentText;
	
	@JsonIgnoreProperties(value="comment",allowSetters=true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	 
	@JsonIgnoreProperties(value="comment",allowSetters=true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="post_id")
	private Post post;
	
	public Comment() {
		super();
	}

	public Comment(Long id, Date createdDate, String commentText, User user, Post post) {
		super();
		this.id = id;
		this.CreatedDate = createdDate;
		this.commentText = commentText;
		this.user = user;
		this.post = post;
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
		this.CreatedDate = createdDate;
	}

	public String getCommentText() {
		return commentText;
	}

	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", CreatedDate=" + CreatedDate + ", commentText=" + commentText + ", user=" + user
				+ ", post=" + post + "]";
	}
	
	
}
