const express = require('express');
const sequelize = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
