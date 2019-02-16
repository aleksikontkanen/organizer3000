package net.kontkanen.organizer3000.controller;

import net.kontkanen.organizer3000.service.TodoListService;
import net.kontkanen.organizer3000.model.TodoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/todolist")
public class TodoListController {

	@Autowired
	TodoListService todoListService;

	@PostMapping
	ResponseEntity<TodoList> create(@Valid @RequestBody TodoList todoList) {
		return new ResponseEntity(this.todoListService.save(todoList), HttpStatus.OK);
	}

	@GetMapping
	Iterable<TodoList> read() {
		return this.todoListService.findAll();
	}

	@GetMapping("/{id}")
	Optional<TodoList> findById(@PathVariable Integer id) {
		return this.todoListService.findById(id);
	}

	@PutMapping
	ResponseEntity<TodoList> update(@RequestBody TodoList todoList) {
		if (this.todoListService.findById(todoList.getId()).isPresent()) {
			return new ResponseEntity(this.todoListService.save(todoList), HttpStatus.OK);

		} else {
			return new ResponseEntity(todoList, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	ResponseEntity delete(@PathVariable Integer id) {
		if (this.todoListService.findById(id).isPresent()) {
			this.todoListService.deleteById(id);
			return new ResponseEntity(HttpStatus.OK);

		} else {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
