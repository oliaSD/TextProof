package ru.semernik.olga.paperservice.io.input;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;
import ru.semernik.olga.paperservice.configuration.BaseSpringBootContext;
import ru.semernik.olga.paperservice.configuration.PostgresContainer;
import ru.semernik.olga.paperservice.dao.repository.PapersRepository;
import ru.semernik.olga.paperservice.paper.dto.FileMetadata;
import ru.semernik.olga.paperservice.paper.dto.UploadPaperResponse;
import ru.semernik.olga.paperservice.service.CheckPaperService;
import ru.semernik.olga.paperservice.utils.TestFactory;
import uk.co.jemos.podam.api.PodamFactory;

public class PaperControllerIntegrationTest extends BaseSpringBootContext {

  @Rule
  public PostgreSQLContainer<?> postgreSQLContainer = PostgresContainer.getInstance();

  private final String UPLOAD_PAPER = "/papers/upload/{username}";
  private final String CHECK_PAPER = "/papers/check/{username}/{paperId}";
  private final String CHECKS_PAPER = "/papers/checks/{username}";
  private final String GET_PAPER = "/papers/get/{username}";
  private final String DELETE_PAPER = "/papers/delete/{username}/{paperId}";
  private final String STATUS_PAPER = "/papers/status/{username}/{paperId}";

  private final String USERNAME = "user";
  private final Long PAPER_ID = 1L;

  @Autowired
  private WebApplicationContext webApplicationContext;

  private final PodamFactory factory = TestFactory.factory;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @MockBean
  private CheckPaperService checkPaperService;

  @Autowired
  private PapersRepository papersRepository;

  @BeforeEach
  public void setUp() {
    LocalDateTime fixedTime = LocalDateTime.now(ZoneOffset.UTC);
    mockStatic(LocalDateTime.class);
    when(LocalDateTime.now(ZoneOffset.UTC)).thenReturn(fixedTime);
  }

  @Test
  @Transactional
  public void upload() throws Exception {
    //Given
    MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    MockMultipartFile testFile = new MockMultipartFile("paper", "testPaper.pdf", "text/plain",
        "some xml".getBytes());

    FileMetadata fileMetadata = new FileMetadata();
    fileMetadata.fileName("testPaper.pdf");
    fileMetadata.fileExtension("text/plain");
    fileMetadata.size(8L);
    fileMetadata.createdDate(LocalDateTime.now(ZoneOffset.UTC).toString());
    fileMetadata.paperId(1L);
    fileMetadata.wordCount(8L);
    UploadPaperResponse response = new UploadPaperResponse(USERNAME, fileMetadata);

    //When
    var result = mockMvc.perform(
        multipart(UPLOAD_PAPER, USERNAME)
            .file(testFile));

    //Then
    result.andExpect(status().is(HttpStatus.CREATED.value()))
        .andExpect(content().json(objectMapper.writeValueAsString(response)));

    assertNotNull(papersRepository.findByUsernameAndId(USERNAME, PAPER_ID));
  }
}
