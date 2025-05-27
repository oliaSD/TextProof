package ru.semernik.olga.userservice.io.output.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.semernik.olga.userservice.configuration.feign.FeignClientConfiguration;
import ru.semernik.olga.userservice.io.output.dto.EmailRequest;


@FeignClient(value = "email", url = "${api.mail.base_url}", configuration = FeignClientConfiguration.class)
public interface EmailFeignClient {

  @RequestMapping(method = RequestMethod.POST, value = "/send/user")
  Void sendToUser(@RequestBody EmailRequest emailRequest);
}
