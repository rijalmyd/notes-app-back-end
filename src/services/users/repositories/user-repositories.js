import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { AuthenticationError } from '../../../exceptions/index.js';

class UserRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createUser({ username, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt, updatedAt]
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)',
      values: [username]
    };

    const { rows } = await this._pool.query(query);
    return rows[0].exists;
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username]
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname, created_at, updated_at FROM users WHERE id = $1',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    return rows[0];
  }
}

export default new UserRepositories();
