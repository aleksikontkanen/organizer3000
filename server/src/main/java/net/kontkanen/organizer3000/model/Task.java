package net.kontkanen.organizer3000.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank
	private String name;
	private String description;
	@NotNull
	private TaskPriority priority;
	@NotNull
	private TaskState state;
	@NotNull
	private Date startTime;
	private Date completionTime;
	private Date expirationTime;

	public Task() { }

	public Task(
		String name,
		String description,
		TaskPriority priority,
		TaskState state,
		Date startTime,
		Date completionTime,
		Date expirationTime
	) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.state = state;
		this.startTime = startTime;
		this.completionTime = completionTime;
		this.expirationTime = expirationTime;
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TaskPriority getPriority() {
		return this.priority;
	}

	public void setPriority(TaskPriority priority) {
		this.priority = priority;
	}

	public TaskState getState() {
		return this.state;
	}

	public void setState(TaskState state) {
		this.state = state;
	}

	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getCompletionTime() {
		return this.completionTime;
	}

	public void setCompletionTime(Date completionTime) {
		this.completionTime = completionTime;
	}

	public Date getExpirationTime() {
		return this.expirationTime;
	}

	public void setExpirationTime(Date expirationTime) {
		this.expirationTime = expirationTime;
	}
}
