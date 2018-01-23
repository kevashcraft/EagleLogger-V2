DROP TABLE IF EXISTS checkins;
CREATE TABLE checkins (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  net_id int REFERENCES nets(id) NOT NULL,
  callsign_id int REFERENCES callsigns(id) NOT NULL,
  traffic boolean DEFAULT false NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(net_id, callsign_id)
);
