package org.olga.semernik.groupservice.controller.feignClient;

import org.olga.semernik.groupservice.configuration.feign.FeignClientConfiguration;
import org.olga.semernik.groupservice.controller.dto.EmailRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@FeignClient(value = "email", url = "${api.mail.base_url}", configuration = FeignClientConfiguration.class)
public interface EmailFeignClient {

  @RequestMapping(method = RequestMethod.POST, value = "/send/group")
  Void sendToUser(@RequestBody EmailRequest emailRequest);
}
