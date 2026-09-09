require('dotenv').config();

const fs = require('fs');
const path = require('path');

const requestLog = path.join(__dirname, 'request.log');
const errorLog = path.join(__dirname, 'error.log');

const { isCelebrateError } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode}\n`;

    fs.appendFile(requestLog, log, (err) => {
      if (err) {
        console.error('Erro ao registrar requisição:', err);
      }
    });
  });

  next();
});

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    req.headers.origin === 'http://localhost:3000' ||
      req.headers.origin === 'https://web-project-around-auth-iota.vercel.app'
      ? req.headers.origin
      : 'null',
  );
  
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
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
  const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${err.stack || err.message}\n`;

  fs.appendFile(errorLog, log, (logError) => {
    if (logError) {
      console.error('Erro ao registrar erro:', logError);
    }
  });

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
