SET client_min_messages TO WARNING;

INSERT INTO nettypes (name, description, freq, starttime) VALUES
  ('Test Alpha', 'The alpha net!', '123.45MHz', '21:00:00'),
  ('Test Beta', 'The best beta net', '33.22MHz', '22:00:00'),
  ('Test Gamma', 'Not gamma radiation!?', '1390KHz', '20:30:00'),
  ('Test Delta', 'Delta for lyfe!?', '446.420MHz', '21:00:00')
;

INSERT INTO nets (nettype_id, started, stopped) VALUES
  (1, current_timestamp - interval '1 hours', NULL),
  (2, current_timestamp - interval '2 hours', NULL),
  (3, current_timestamp - interval '3 hours', current_timestamp - interval '2 hours'),
  (4, current_timestamp - interval '4 hours', current_timestamp - interval '3 hours')
;

