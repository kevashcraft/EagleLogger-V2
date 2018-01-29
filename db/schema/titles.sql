DROP TABLE IF EXISTS titles CASCADE;
CREATE TABLE titles (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  title varchar(64) NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (title)
);

INSERT INTO titles (title) VALUES
  ('ARRL Section Manager'),
  ('Assistant EagleNet Manager'),
  ('EagleNet Manager'),
  ('Emergency Coordinator'),
  ('Official Emergency Station'),
  ('Official Relay Station'),
  ('Technical Specialist'),
  ('Alternate NCS'),
  ('Sunday NCS'),
  ('Monday NCS'),
  ('Tuesday NCS'),
  ('Wednesday NCS'),
  ('Thursday NCS'),
  ('Friday NCS'),
  ('Saturday NCS'),
  ('SKYWARN NCS')
;

DROP TABLE IF EXISTS callsign_titles;
CREATE TABLE callsign_titles (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  callsign_id int REFERENCES callsigns(id) NOT NULL,
  title_id int REFERENCES titles (id) NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  UNIQUE (callsign_id, title_id)
);
