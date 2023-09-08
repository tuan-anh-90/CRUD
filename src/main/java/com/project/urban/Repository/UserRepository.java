package com.project.urban.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.urban.Entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
