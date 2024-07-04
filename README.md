## Setup

First thing first, create a dicord bot at the [Discord Developer Portal<img src="https://assets-global.website-files.com/5f8dd67f8fdd6f51f0b50904/636ab9fa4ac11bd72b7ffba1_ddevs-rebrand.png" width=20>](https://discord.com/developers/applications).
<br/>
After creating a bot, clone this repository.
<br/>
Open your terminal and run the command below to install all required node modules: 
```bash
npm install
```

Now install [MySQL database](https://www.mysql.com/downloads/), it will be used to store all the configuration of the servers the bot has joined.
<br/>
<img src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" width=100>
<br/>
After installing, run schema.sql, located inside the [database folder](https://github.com/GUY7777/SnozBot/tree/master/database).
<br/>
It will create the database and all the required tables within MySQL.

#### Update your .env file
Make sure to update your database credentials and your bot token:
```
DISCORD_BOT_TOKEN=tokenhere
DB_HOST=localhost
DB_USER=test
DB_PASS=test
DB_NAME=testdb
DB_PORT=3316
```

## Run the bot
Every time you want to run the bot simply run this command:
```bash
npm run dev
```
