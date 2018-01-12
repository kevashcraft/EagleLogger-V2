DROP TABLE IF EXISTS nets;
CREATE TABLE nets (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  nettype_id int REFERENCES nettypes(id) NOT NULL,
  started timestamp,
  stopped timestamp,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
