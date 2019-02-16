package net.kontkanen.organizer3000;

import net.kontkanen.organizer3000.model.TodoList;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SystemTests {

    @Test
    public void TestCreateReadDelete() {
        RestTemplate restTemplate = new RestTemplate();

        String url = "http://localhost:8080/todolist";

        TodoList todoList = new TodoList("TodoList");
        ResponseEntity<TodoList> entity = restTemplate.postForEntity(url, todoList, TodoList.class);

        TodoList[] todoLists = restTemplate.getForObject(url, TodoList[].class);
        Assertions.assertThat(todoLists).extracting(TodoList::getName).containsOnly("TodoList");

        restTemplate.delete(url + "/" + entity.getBody().getId());
        Assertions.assertThat(restTemplate.getForObject(url, TodoList[].class)).isEmpty();
    }
}
