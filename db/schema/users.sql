DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  callsign_id int REFERENCES callsigns(id) NOT NULL,
  password_hash varchar(64) NOT NULL,
  email varchar(128),
  name varchar(64),
  radio varchar(256),
  antenna varchar(256),
  zip_code_id int REFERENCES zip_codes(id),
  active boolean DEFAULT false NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (callsign_id),
  UNIQUE (email)
);
