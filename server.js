const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { db, Friend } = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json())


// GET /api/friends
app.get('/api/friends', async(req, res, next) => {
  try {
    const list = await Friend.findAll({
      order: [['rating','DESC']]
    });
    res.json(list);
  }
  catch(err) {
    next(err);
  }
});

// PUT /api/friends/:id
app.put('/api/friends/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    friend.rating = parseInt(req.body.rating);
    friend.save();
    res.json(friend);
  }
  catch(err) {
    next(err);
  }
});

// POST /api/friends
app.post('/api/friends', async (req, res, next) => {
  try {
    if (req.body.name === '') {
      console.error('Jeez, you really should know the names of your friends.');
      res.status(400);
    }
    else {
      const newFriend = await Friend.findOrCreate({
        where: { name: req.body.name }
      })
      if (newFriend[1]) {
        res.status(201).json(newFriend[0])
      } else {
        res.status(400).json('Duplicate friend!');
        console.error('You can\'t have two friends with the same name, dummy! Too confusing.');
      }
    }
  }
  catch(err) {
    next(err);
  }
});

// DELETE /api/friends/:id
app.delete('/api/friends/:id', async(req, res, next) => {
  try {
    const confirmDelete = await Friend.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(confirmDelete);
  }
  catch(err) {
    next(err);
  }
});

// Error handlers
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.send('Server Error');
});

const PORT = process.env.PORT || 3000;

const init = async function() {
  try {
    await db.sync({force: true});
    await Promise.all([
      Friend.create({ name: 'Amy', rating: 9 }),
      Friend.create({ name: 'Alex' }),
      Friend.create({ name: 'Jon', rating: 10 })
    ]);

    app.listen(PORT, function() {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  catch(err) {
    console.error(err);
  }
}

init();
