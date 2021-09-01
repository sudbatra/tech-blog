const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({
    helpers
});
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const session = require('express-session');
const routes = require(path.join(__dirname,'./controllers'));
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const sess = {
    secret: process.env.SECRET_DB,
    cookie: { expires: 10*60*1000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
