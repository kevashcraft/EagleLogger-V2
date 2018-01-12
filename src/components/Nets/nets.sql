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

DROP VIEW IF EXISTS nets_view;
CREATE VIEW nets_view AS
  SELECT
    nets.id as net_id,
    nets.id,
    nets.created,
    nets.nettype_id,
    nets.started,
    nets.stopped,
    nets.deleted,
    nettypes.name,
    nettypes.description,
    nettypes.freq,
    nettypes.starttime,
    nettypes.nts,
    nettypes.skywarn,
    nettypes.description ||
      COALESCE(' (' || nettypes.freq || ')', '') ||
      COALESCE(' @ ' || nettypes.starttime, '')
      as title
  FROM nets
  JOIN nettypes ON nettypes.id = nets.nettype_id
;
