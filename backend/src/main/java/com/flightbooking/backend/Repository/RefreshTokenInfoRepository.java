package com.flightbooking.backend.Repository;

import com.flightbooking.backend.Model.RefreshTokenInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefreshTokenInfoRepository extends CrudRepository<RefreshTokenInfo, String> {
    List<RefreshTokenInfo> findByUsername(String username);

}