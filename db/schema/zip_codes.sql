DROP TABLE IF EXISTS zip_codes;
CREATE TABLE zip_codes (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  zip_code char(5),
  city varchar(128),
  state varchar(128),
  county varchar(128),
  timezone varchar(128),
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
