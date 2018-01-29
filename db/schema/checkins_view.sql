DROP VIEW IF EXISTS checkins_view;
CREATE VIEW checkins_view AS
  SELECT
    checkins.id,
    checkins.deleted,
    checkins.net_id,
    checkins.traffic,
    checkins.callsign_id,
    checkins.id as checkin_id,
    users.email,
    callsigns.created as callsign_created,
    callsigns.callsign as callsign,
    callsigns.callsign ||
      COALESCE(' (' || string_agg(titles.title, ', ' order by title) || ')', '')
      as title,
    COALESCE(users.name, callsigns.name) ||
      COALESCE(' in ' || zip_codes.county, '') as subtitle
  FROM checkins
  JOIN callsigns ON callsigns.id = checkins.callsign_id
  LEFT JOIN callsign_titles ON callsign_titles.callsign_id = callsigns.id
    AND NOT callsign_titles.deleted
  LEFT JOIN titles ON titles.id = callsign_titles.title_id
    AND NOT titles.deleted
  LEFT JOIN users ON users.callsign_id = checkins.callsign_id
  LEFT JOIN zip_codes ON zip_codes.id = COALESCE(users.zip_code_id, callsigns.zip_code_id)
  GROUP BY
    checkins.id,
    callsigns.id,
    users.id,
    zip_codes.id
;
