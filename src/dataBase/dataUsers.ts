import { User } from "../models/User";
import {Task} from "../models/Task";

export const users = [
    new User("Assis", "Junior", "assis@mail.com", "123456"),
    new User("Maria", "José", "maria@mail.com", "123456")
]

users[0].task.push(new Task("Task 1", users[0].id, true));
users[0].task.push(new Task("Task 2", users[0].id, false));
users[1].task.push(new Task("Task 1", users[1].id, true));
users[1].task.push(new Task("Task 2", users[1].id, false));
users[1].task.push(new Task("Task 3", users[1].id, false));