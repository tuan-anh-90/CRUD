package com.project.urban.Service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.project.urban.DTO.UserDTO;
import com.project.urban.Entity.User;
import com.project.urban.Exception.ErrorConstant;
import com.project.urban.Exception.InvalidDataException;
import com.project.urban.Repository.UserRepository;
import com.project.urban.Service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDTO createUser(UserDTO userDTO) {
		String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
		ModelMapper modelMapper = new ModelMapper();
		User user = modelMapper.map(userDTO, User.class);
		user.setPassword(hashedPassword);
		User savedUser = userRepository.save(user);
		UserDTO savedUserDTO = modelMapper.map(savedUser, UserDTO.class);

		return savedUserDTO;
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<UserDTO> allUsers = new ArrayList<>();
		List<User> users = userRepository.findAll();
		if (users.isEmpty()) {
			throw new InvalidDataException(ErrorConstant.NOT_FOUND, ErrorConstant.USER_NOT_FOUND);
		}
		ModelMapper modelMapper = new ModelMapper();
		for (User user : users) {
			UserDTO userDTO = modelMapper.map(user, UserDTO.class);
			allUsers.add(userDTO);
		}
		return allUsers;
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO) {
		User existingUser = userRepository.findById(userDTO.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

		ModelMapper modelMapper = new ModelMapper();
		modelMapper.map(userDTO, existingUser);

		User updatedUser = userRepository.save(existingUser);

		UserDTO updatedUserDTO = modelMapper.map(updatedUser, UserDTO.class);
		return updatedUserDTO;
	}

	@Override
	public void deleteUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
		userRepository.deleteById(user.getId());

	}

}
