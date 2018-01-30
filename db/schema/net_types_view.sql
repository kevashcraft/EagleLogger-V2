DROP VIEW IF EXISTS net_types_view;
CREATE VIEW net_types_view AS
  SELECT
    net_types.id as net_type_id,
    net_types.id,
    net_types.created,
    net_types.name,
    net_types.description,
    net_types.frequency,
    TO_CHAR(net_types.start_time, 'HH24:MI') as start_time,
    net_types.nts,
    net_types.skywarn,
    net_types.name ||
      COALESCE(' at ' || TO_CHAR(net_types.start_time, 'HH24:MI'), '') ||
      COALESCE(' on ' || net_types.frequency || 'MHz', '')
      as title,
    net_types.deleted
  FROM net_types
  ORDER BY net_types.name ASC
;
