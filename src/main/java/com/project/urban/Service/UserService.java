package com.project.urban.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.urban.DTO.UserDTO;

@Service
public interface UserService {

	UserDTO createUser(UserDTO userDTO);
	
	List<UserDTO> getAllUsers();
	
	UserDTO updateUser(UserDTO userDTO);
	
	void deleteUser(Long userId);
}
