DROP TABLE IF EXISTS callsigns;
CREATE TABLE callsigns (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  callsign varchar(10) NOT NULL,
  frn char(10) NOT NULL,
  active boolean DEFAULT true NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (callsign, frn)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(128),
  name varchar(64),
  radio varchar(256),
  antenna varchar(256),
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);

DROP TABLE IF EXISTS nettypes;
CREATE TABLE nettypes (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  name varchar(32),
  nts boolean DEFAULT false NOT NULL,
  skywarn boolean DEFAULT false NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);
