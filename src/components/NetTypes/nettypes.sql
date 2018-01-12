DROP TABLE IF EXISTS nettypes;
CREATE TABLE nettypes (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  name varchar(32),
  description varchar(256),
  freq varchar(32),
  starttime time,
  nts boolean DEFAULT false NOT NULL,
  skywarn boolean DEFAULT false NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);
