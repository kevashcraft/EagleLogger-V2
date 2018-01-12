DROP TABLE IF EXISTS checkins;
CREATE TABLE checkins (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  net_id int REFERENCES nets(id) NOT NULL,
  callsign_id int REFERENCES callsigns(id) NOT NULL,
  traffic boolean DEFAULT false NOT NULL,
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);

DROP VIEW IF EXISTS checkins_view;
CREATE VIEW checkins_view AS
  SELECT
    checkins.*,
    checkins.id as checkin_id,
    callsigns.created as callsign_created,
    callsigns.callsign as callsign
  FROM checkins
  JOIN callsigns ON callsigns.id = checkins.callsign_id
;

