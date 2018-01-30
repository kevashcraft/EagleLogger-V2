DROP TABLE IF EXISTS nets CASCADE;
CREATE TABLE nets (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  net_type_id int REFERENCES net_types(id) NOT NULL,
  ncs_id int REFERENCES callsigns(id) NOT NULL,
  started timestamp WITH TIME ZONE,
  stopped timestamp,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);
