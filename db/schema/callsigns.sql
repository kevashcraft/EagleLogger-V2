DROP TABLE IF EXISTS callsigns;
CREATE TABLE callsigns (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  frn char(10),
  callsign varchar(6),
  name varchar(128),
  first_name varchar(128),
  middle_initial varchar(128),
  last_name varchar(128),
  email varchar(128),
  phone varchar(16),
  address varchar(256),
  spotter_id varchar(16),
  zip_code_id int REFERENCES zip_codes (id),
  valid_start date,
  valid_end date,
  PRIMARY KEY (id),
  UNIQUE (frn)
);

CREATE INDEX callsigns_callsign_idx ON callsigns(callsign);
CREATE INDEX callsigns_name_idx ON callsigns(name);
