package org.olga.semernik.groupservice.controller.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties.FeignClientConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ru.semernik.olga.groupservice.group.dto.FindUserResponse;

@FeignClient(value = "user", url = "${api.user.base_uri}", configuration = FeignClientConfiguration.class)
public interface UserFeignClient {

  @RequestMapping(method = RequestMethod.GET, value = "/findByUsername")
  FindUserResponse findUser(@RequestParam("username") String username);

  @RequestMapping(method = RequestMethod.GET, value = "/findByEmail")
  FindUserResponse findUserByEmail(@RequestParam("email") String email);
}
