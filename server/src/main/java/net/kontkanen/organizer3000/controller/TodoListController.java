package net.kontkanen.organizer3000.controller;

import net.kontkanen.organizer3000.service.TodoListService;
import net.kontkanen.organizer3000.model.TodoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class TodoListController {

	@Autowired
	TodoListService todoListService;

	@PostMapping("/todolist")
	TodoList create(@RequestBody TodoList todoList) {
		return this.todoListService.save(todoList);
	}

	@GetMapping("/todolist")
	Iterable<TodoList> read() {
		return this.todoListService.findAll();
	}

	@GetMapping("/todolist/{id}")
	Optional<TodoList> findById(@PathVariable Integer id) {
		return this.todoListService.findById(id);
	}

	@PutMapping("/todolist")
	TodoList update(@RequestBody TodoList todoList) {
		return this.todoListService.save(todoList);
	}

	@DeleteMapping("/todolist/{id}")
	void delete(@PathVariable Integer id) {
		this.todoListService.deleteById(id);
	}
}
