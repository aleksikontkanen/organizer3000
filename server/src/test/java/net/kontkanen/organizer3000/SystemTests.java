package net.kontkanen.organizer3000;

import net.kontkanen.organizer3000.model.TodoList;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SystemTests {

    // @Test -- Test commented out due CircleCI issues at the moment. Localhost:8080 refuses the connection.
    public void TestCreateReadDelete() {
        RestTemplate restTemplate = new RestTemplate();

        String url = "http://localhost:8080/todolist";

        // Clean up, dunno why H2 DB doesn't drop before testing
        List<TodoList> oldTodos = Arrays.asList(restTemplate.getForEntity(url, TodoList[].class).getBody());
        for (int i = 0; i < oldTodos.size(); i++) {
            restTemplate.delete(url + "/" + oldTodos.get(i).getId());
        }

        TodoList todoList = new TodoList("TodoList");
        ResponseEntity<TodoList> entity = restTemplate.postForEntity(url, todoList, TodoList.class);

        TodoList[] todoLists = restTemplate.getForObject(url, TodoList[].class);
        Assertions.assertThat(todoLists).extracting(TodoList::getName).containsOnly("TodoList");

        restTemplate.delete(url + "/" + entity.getBody().getId());
        Assertions.assertThat(restTemplate.getForObject(url, TodoList[].class)).isEmpty();
    }
}
