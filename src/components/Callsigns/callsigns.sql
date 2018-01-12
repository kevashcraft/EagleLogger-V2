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
