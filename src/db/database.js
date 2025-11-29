// db.js
import { open } from '@op-engineering/op-sqlite';

const db = open({
  name: 'todos.db',
});

export const initDB = () => {
  db.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      completed INTEGER DEFAULT 0
    );
  `);
};

export const getTodos = async () => {
  const result = await db.execute('SELECT * FROM todos ORDER BY id DESC');
  return Array.isArray(result.rows) ? result.rows : [];
};


export const addTodo = (title, description) => {
  
  db.execute(
    'INSERT INTO todos (title, description) VALUES (?, ?)',
    [title, description]
  );
};

export const toggleTodoDB = (id, completed) => {
  
  return db.execute(
    "UPDATE todos SET completed=? WHERE id=?",
    [completed ? 1 : 0, id]
  );
};

export const updateTodo = (id, title, description) => {
  db.execute(
    'UPDATE todos SET title = ?, description = ? WHERE id = ?',
    [title, description, id]
  );
};

export const deleteTodo = (id) => {
  db.execute('DELETE FROM todos WHERE id = ?', [id]);
};
