import { Pool } from 'pg';
 
class AuthenticationRepositories {
 constructor() {
   this.pool = new Pool();
 }
 
 async addRefreshToken(token) {
  const query = {
    text: 'INSERT INTO authentications VALUES($1)',
    values: [token]
  };
  await this.pool.query(query);
 }

 async deleteRefreshToken(token) {
  const query = {
    text: 'DELETE FROM authentications WHERE token = $1',
    values: [token]
  };
  await this.pool.query(query);
 }

 async verifyRefreshToken(token) {
  const query = {
    text: 'SELECT EXISTS (SELECT 1 FROM authentications WHERE token = $1)',
    values: [token]
  };
  const { rows } = await this.pool.query(query);
  return rows[0].exists;
 }
}
 
export default new AuthenticationRepositories();