package com.project.urban.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column(name = "username")
	@NotBlank(message = "username is required")
	
	private String username;
	
	@Column(name = "password", length = 250, nullable = false)
	@NotBlank(message = "Password is required")
	private String password;
	
	@Column(name = "name", length = 50, nullable = false)
	@Size(max = 50, message = "Your name must be less than 50 characters")
	@NotBlank(message = "Your name is required")
	private String name;
	
}
