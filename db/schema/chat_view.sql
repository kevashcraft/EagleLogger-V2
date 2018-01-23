DROP VIEW IF EXISTS chat_view;
CREATE VIEW chat_view AS
  SELECT
    chat.*,
    callsigns.callsign ||
      COALESCE(' (' || callsigns.name || ')', '') as title
  FROM chat
  JOIN users ON users.id = chat.user_id
  JOIN callsigns ON callsigns.id = users.callsign_id
;
