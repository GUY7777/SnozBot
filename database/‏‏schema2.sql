CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT '!',
    welcomeChannelId VARCHAR(100) DEFAULT 'null',
    welcomeEmbedOrCanvas VARCHAR(100) DEFAULT 'null',
    verifyChannelId VARCHAR(100) DEFAULT 'null',
    verifyMessageId VARCHAR(100) DEFAULT 'null',
    verifyRole VARCHAR(100) DEFAULT 'null',
    ticketChannelId VARCHAR(100) DEFAULT 'null',
    ticketMessageId VARCHAR(100) DEFAULT 'null',
    modLog VARCHAR(100)
);
/*
CREATE TABLE GuildMembersXP (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    userId VARCHAR(30) NOT NULL,
    xp INT NOT NULL
);*/