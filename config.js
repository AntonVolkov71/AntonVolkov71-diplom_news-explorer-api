const PORT = process.env.NODE_ENV === 'production'
  ? process.env.PORT
  : 3000;

const DATABASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017/diplom_news';

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'super-strong-secret';

module.exports = { PORT, DATABASE_URL, JWT_SECRET };

