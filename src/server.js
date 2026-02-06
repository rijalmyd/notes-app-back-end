import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.use(cors({
  origin: true
}));

app.use(express.json());
app.use('/', routes);

app.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});