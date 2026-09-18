require('dotenv').config();

// Os logs são enviados para o console.
// Em produção, o Vercel coleta esses logs automaticamente.

const { isCelebrateError } = require('celebrate');

const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

let dbPromise;

function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!dbPromise) {
    dbPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        console.log('Conectado ao MongoDB');
      })
      .catch((err) => {
        dbPromise = null;
        throw err;
      });
  }

  return dbPromise;
}

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(
      `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode}`,
    );
  });

  next();
});

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://web-project-around-auth-iota.vercel.app',
  ];

  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  if (req.method === 'OPTIONS') return res.sendStatus(204);

  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api', authRouter);
app.use(auth);

app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso requisitado não encontrado',
  });
});

app.use((err, req, res, next) => {
  console.error(
    `${new Date().toISOString()} ${req.method} ${req.originalUrl}`,
    err,
  );

  next(err);
});

app.use((err, req, res, _next) => {
  console.error('Erro:', err);

  if (isCelebrateError(err)) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido',
    });
  }

  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({
      message: 'Recurso não encontrado',
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'E-mail já cadastrado' });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Ocorreu um erro no servidor',
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
