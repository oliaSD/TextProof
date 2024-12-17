package ru.semernik.olga.paperservice.io.input;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import ru.semernik.olga.paperservice.configuration.security.SecurityConfiguration;
import ru.semernik.olga.paperservice.paper.dto.CheckPaperResponse;
import ru.semernik.olga.paperservice.paper.dto.GetPapersResponse;
import ru.semernik.olga.paperservice.paper.dto.StatusPaperResponse;
import ru.semernik.olga.paperservice.service.CheckPaperService;
import ru.semernik.olga.paperservice.service.GetAllPaperService;
import ru.semernik.olga.paperservice.service.StatusPaperService;
import ru.semernik.olga.paperservice.service.UploadPaperService;
import ru.semernik.olga.paperservice.utils.TestFactory;
import uk.co.jemos.podam.api.PodamFactory;

@ActiveProfiles("unit-test")
@WebMvcTest(controllers = {PaperController.class})
@Import(SecurityConfiguration.class)
@ExtendWith(MockitoExtension.class)
public class PaperControllerTest {

  private final String UPLOAD_PAPER = "/papers/upload/{username}";
  private final String CHECK_PAPER = "/papers/check/{username}/{paperId}";
  private final String CHECKS_PAPER = "/papers/checks/{username}";
  private final String GET_PAPER = "/papers/get/{username}";
  private final String DELETE_PAPER = "/papers/delete/{username}/{paperId}";
  private final String STATUS_PAPER = "/papers/status/{username}/{paperId}";

  private final String USERNAME = "user";
  private final Long PAPER_ID = 1L;

  private final PodamFactory factory = TestFactory.factory;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private CheckPaperService checkPaperService;

  @MockBean
  private UploadPaperService uploadPaperService;

  @MockBean
  private StatusPaperService statusPaperService;

  @MockBean
  private GetAllPaperService getAllPaperService;

  @Test
  public void upload() {
    //Given
  }

  @Test
  public void check() throws Exception {
    //Given
    CheckPaperResponse response = factory.manufacturePojo(CheckPaperResponse.class);

    when(checkPaperService.check(PAPER_ID, USERNAME)).thenReturn(response);
    //When
    var result = mockMvc.perform(post(CHECK_PAPER, USERNAME, PAPER_ID));

    //Then
    result.andExpect(status().is(HttpStatus.OK.value()))
        .andExpect(content().json(objectMapper.writeValueAsString(response)));

    verify(checkPaperService).check(PAPER_ID, USERNAME);
  }

  @Test
  public void getChecks() throws Exception {
    //Given
    StatusPaperResponse response = factory.manufacturePojo(StatusPaperResponse.class);

    when(statusPaperService.getAllPaperStatus(USERNAME)).thenReturn(List.of(response));
    //When
    var result = mockMvc.perform(get(CHECKS_PAPER, USERNAME));

    //Then
    result.andExpect(status().is(HttpStatus.OK.value()))
        .andExpect(content().json(objectMapper.writeValueAsString(List.of(response))));

    verify(statusPaperService).getAllPaperStatus(USERNAME);
  }

  @Test
  public void statusRes() throws Exception {
    //Given
    StatusPaperResponse response = factory.manufacturePojo(StatusPaperResponse.class);

    when(statusPaperService.getPaperStatus(USERNAME, PAPER_ID)).thenReturn(response);
    //When
    var result = mockMvc.perform(get(STATUS_PAPER, USERNAME, PAPER_ID));

    //Then
    result.andExpect(status().is(HttpStatus.OK.value()))
        .andExpect(content().json(objectMapper.writeValueAsString(response)));

    verify(statusPaperService).getPaperStatus(USERNAME, PAPER_ID);
  }

  @Test
  public void getCheck() throws Exception {
    //Given
    GetPapersResponse response = factory.manufacturePojo(GetPapersResponse.class);

    when( getAllPaperService.getPapers(USERNAME)).thenReturn(response);
    //When
    var result = mockMvc.perform(get(GET_PAPER, USERNAME));

    //Then
    result.andExpect(status().is(HttpStatus.OK.value()))
        .andExpect(content().json(objectMapper.writeValueAsString(response)));

    verify(getAllPaperService).getPapers(USERNAME);
  }

}
