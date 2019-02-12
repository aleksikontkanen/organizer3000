package net.kontkanen.organizer3000.service;

import net.kontkanen.organizer3000.model.TodoList;
import org.springframework.data.repository.CrudRepository;

public interface TodoListService extends CrudRepository<TodoList, Integer> {

}
