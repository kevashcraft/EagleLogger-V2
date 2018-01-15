DROP TABLE IF EXISTS nets;
CREATE TABLE nets (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  net_type_id int REFERENCES net_types(id) NOT NULL,
  started timestamp WITH TIME ZONE,
  stopped timestamp,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
