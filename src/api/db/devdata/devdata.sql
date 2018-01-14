SET client_min_messages TO WARNING;

TRUNCATE net_types CASCADE;
TRUNCATE nets CASCADE;
TRUNCATE callsigns CASCADE;
TRUNCATE checkins CASCADE;

INSERT INTO net_types (name, description, freq, starttime) VALUES
  ('Test AAAAA', 'Test Net AAAAA', '123.45MHz', current_timestamp),
  ('Test BBBBB', 'Test Net BBBBB', '123.45MHz', current_timestamp),
  ('Test CCCCC', 'Test Net CCCCC', '123.45MHz', current_timestamp),
  ('Test DDDDD', 'Test Net DDDDD', '123.45MHz', current_timestamp),
  ('Test EEEEE', 'Test Net EEEEE', '123.45MHz', current_timestamp),
  ('Test FFFFF', 'Test Net FFFFF', '123.45MHz', current_timestamp),
  ('Test GGGGG', 'Test Net GGGGG', '123.45MHz', current_timestamp),
  ('Test HHHHH', 'Test Net HHHHH', '123.45MHz', current_timestamp),
  ('Test IIIII', 'Test Net IIIII', '123.45MHz', current_timestamp),
  ('Test JJJJJ', 'Test Net JJJJJ', '123.45MHz', current_timestamp),
  ('Test KKKKK', 'Test Net KKKKK', '123.45MHz', current_timestamp),
  ('Test LLLLL', 'Test Net LLLLL', '123.45MHz', current_timestamp),
  ('Test MMMMM', 'Test Net MMMMM', '123.45MHz', current_timestamp),
  ('Test NNNNN', 'Test Net NNNNN', '123.45MHz', current_timestamp),
  ('Test OOOOO', 'Test Net OOOOO', '123.45MHz', current_timestamp),
  ('Test PPPPP', 'Test Net PPPPP', '123.45MHz', current_timestamp),
  ('Test QQQQQ', 'Test Net QQQQQ', '123.45MHz', current_timestamp),
  ('Test RRRRR', 'Test Net RRRRR', '123.45MHz', current_timestamp),
  ('Test SSSSS', 'Test Net SSSSS', '123.45MHz', current_timestamp),
  ('Test TTTTT', 'Test Net TTTTT', '123.45MHz', current_timestamp),
  ('Test UUUUU', 'Test Net UUUUU', '123.45MHz', current_timestamp),
  ('Test VVVVV', 'Test Net VVVVV', '123.45MHz', current_timestamp),
  ('Test WWWWW', 'Test Net WWWWW', '123.45MHz', current_timestamp),
  ('Test XXXXX', 'Test Net XXXXX', '123.45MHz', current_timestamp),
  ('Test YYYYY', 'Test Net YYYYY', '123.45MHz', current_timestamp),
  ('Test ZZZZZ', 'Test Net ZZZZZ', '123.45MHz', current_timestamp)
;

INSERT INTO nets (net_type_id, started, stopped) VALUES
  (1, current_timestamp - interval '1 hours', NULL),
  (2, current_timestamp - interval '2 hours', NULL),
  (3, current_timestamp - interval '3 hours', current_timestamp - interval '2 hours'),
  (4, current_timestamp - interval '4 hours', current_timestamp - interval '3 hours')
;

INSERT INTO callsigns (callsign, frn) VALUES
  ('AA0AAA', '0000000000'),
  ('BB0BBB', '0000000000'),
  ('CC0CCC', '0000000000'),
  ('DD0DDD', '0000000000'),
  ('EE0EEE', '0000000000'),
  ('FF0FFF', '0000000000'),
  ('GG0GGG', '0000000000'),
  ('HH0HHH', '0000000000'),
  ('II0III', '0000000000'),
  ('JJ0JJJ', '0000000000'),
  ('KK0KKK', '0000000000'),
  ('LL0LLL', '0000000000'),
  ('MM0MMM', '0000000000'),
  ('NN0NNN', '0000000000'),
  ('OO0OOO', '0000000000'),
  ('PP0PPP', '0000000000'),
  ('QQ0QQQ', '0000000000'),
  ('RR0RRR', '0000000000'),
  ('SS0SSS', '0000000000'),
  ('TT0TTT', '0000000000'),
  ('UU0UUU', '0000000000'),
  ('VV0VVV', '0000000000'),
  ('WW0WWW', '0000000000'),
  ('XX0XXX', '0000000000'),
  ('YY0YYY', '0000000000'),
  ('ZZ0ZZZ', '0000000000'),
  ('AA1AAA', '0000000000'),
  ('BB1BBB', '0000000000'),
  ('CC1CCC', '0000000000'),
  ('DD1DDD', '0000000000'),
  ('EE1EEE', '0000000000'),
  ('FF1FFF', '0000000000'),
  ('GG1GGG', '0000000000'),
  ('HH1HHH', '0000000000'),
  ('II1III', '0000000000'),
  ('JJ1JJJ', '0000000000'),
  ('KK1KKK', '0000000000'),
  ('LL1LLL', '0000000000'),
  ('MM1MMM', '0000000000'),
  ('NN1NNN', '0000000000'),
  ('OO1OOO', '0000000000'),
  ('PP1PPP', '0000000000'),
  ('QQ1QQQ', '0000000000'),
  ('RR1RRR', '0000000000'),
  ('SS1SSS', '0000000000'),
  ('TT1TTT', '0000000000'),
  ('UU1UUU', '0000000000'),
  ('VV1VVV', '0000000000'),
  ('WW1WWW', '0000000000'),
  ('XX1XXX', '0000000000'),
  ('YY1YYY', '0000000000'),
  ('ZZ1ZZZ', '0000000000'),
  ('AA2AAA', '0000000000'),
  ('BB2BBB', '0000000000'),
  ('CC2CCC', '0000000000'),
  ('DD2DDD', '0000000000'),
  ('EE2EEE', '0000000000'),
  ('FF2FFF', '0000000000'),
  ('GG2GGG', '0000000000'),
  ('HH2HHH', '0000000000'),
  ('II2III', '0000000000'),
  ('JJ2JJJ', '0000000000'),
  ('KK2KKK', '0000000000'),
  ('LL2LLL', '0000000000'),
  ('MM2MMM', '0000000000'),
  ('NN2NNN', '0000000000'),
  ('OO2OOO', '0000000000'),
  ('PP2PPP', '0000000000'),
  ('QQ2QQQ', '0000000000'),
  ('RR2RRR', '0000000000'),
  ('SS2SSS', '0000000000'),
  ('TT2TTT', '0000000000'),
  ('UU2UUU', '0000000000'),
  ('VV2VVV', '0000000000'),
  ('WW2WWW', '0000000000'),
  ('XX2XXX', '0000000000'),
  ('YY2YYY', '0000000000'),
  ('ZZ2ZZZ', '0000000000'),
  ('AA3AAA', '0000000000'),
  ('BB3BBB', '0000000000'),
  ('CC3CCC', '0000000000'),
  ('DD3DDD', '0000000000'),
  ('EE3EEE', '0000000000'),
  ('FF3FFF', '0000000000'),
  ('GG3GGG', '0000000000'),
  ('HH3HHH', '0000000000'),
  ('II3III', '0000000000'),
  ('JJ3JJJ', '0000000000'),
  ('KK3KKK', '0000000000'),
  ('LL3LLL', '0000000000'),
  ('MM3MMM', '0000000000'),
  ('NN3NNN', '0000000000'),
  ('OO3OOO', '0000000000'),
  ('PP3PPP', '0000000000'),
  ('QQ3QQQ', '0000000000'),
  ('RR3RRR', '0000000000'),
  ('SS3SSS', '0000000000'),
  ('TT3TTT', '0000000000'),
  ('UU3UUU', '0000000000'),
  ('VV3VVV', '0000000000'),
  ('WW3WWW', '0000000000'),
  ('XX3XXX', '0000000000'),
  ('YY3YYY', '0000000000'),
  ('ZZ3ZZZ', '0000000000'),
  ('AA4AAA', '0000000000'),
  ('BB4BBB', '0000000000'),
  ('CC4CCC', '0000000000'),
  ('DD4DDD', '0000000000'),
  ('EE4EEE', '0000000000'),
  ('FF4FFF', '0000000000'),
  ('GG4GGG', '0000000000'),
  ('HH4HHH', '0000000000'),
  ('II4III', '0000000000'),
  ('JJ4JJJ', '0000000000'),
  ('KK4KKK', '0000000000'),
  ('LL4LLL', '0000000000'),
  ('MM4MMM', '0000000000'),
  ('NN4NNN', '0000000000'),
  ('OO4OOO', '0000000000'),
  ('PP4PPP', '0000000000'),
  ('QQ4QQQ', '0000000000'),
  ('RR4RRR', '0000000000'),
  ('SS4SSS', '0000000000'),
  ('TT4TTT', '0000000000'),
  ('UU4UUU', '0000000000'),
  ('VV4VVV', '0000000000'),
  ('WW4WWW', '0000000000'),
  ('XX4XXX', '0000000000'),
  ('YY4YYY', '0000000000'),
  ('ZZ4ZZZ', '0000000000'),
  ('AA5AAA', '0000000000'),
  ('BB5BBB', '0000000000'),
  ('CC5CCC', '0000000000'),
  ('DD5DDD', '0000000000'),
  ('EE5EEE', '0000000000'),
  ('FF5FFF', '0000000000'),
  ('GG5GGG', '0000000000'),
  ('HH5HHH', '0000000000'),
  ('II5III', '0000000000'),
  ('JJ5JJJ', '0000000000'),
  ('KK5KKK', '0000000000'),
  ('LL5LLL', '0000000000'),
  ('MM5MMM', '0000000000'),
  ('NN5NNN', '0000000000'),
  ('OO5OOO', '0000000000'),
  ('PP5PPP', '0000000000'),
  ('QQ5QQQ', '0000000000'),
  ('RR5RRR', '0000000000'),
  ('SS5SSS', '0000000000'),
  ('TT5TTT', '0000000000'),
  ('UU5UUU', '0000000000'),
  ('VV5VVV', '0000000000'),
  ('WW5WWW', '0000000000'),
  ('XX5XXX', '0000000000'),
  ('YY5YYY', '0000000000'),
  ('ZZ5ZZZ', '0000000000'),
  ('AA6AAA', '0000000000'),
  ('BB6BBB', '0000000000'),
  ('CC6CCC', '0000000000'),
  ('DD6DDD', '0000000000'),
  ('EE6EEE', '0000000000'),
  ('FF6FFF', '0000000000'),
  ('GG6GGG', '0000000000'),
  ('HH6HHH', '0000000000'),
  ('II6III', '0000000000'),
  ('JJ6JJJ', '0000000000'),
  ('KK6KKK', '0000000000'),
  ('LL6LLL', '0000000000'),
  ('MM6MMM', '0000000000'),
  ('NN6NNN', '0000000000'),
  ('OO6OOO', '0000000000'),
  ('PP6PPP', '0000000000'),
  ('QQ6QQQ', '0000000000'),
  ('RR6RRR', '0000000000'),
  ('SS6SSS', '0000000000'),
  ('TT6TTT', '0000000000'),
  ('UU6UUU', '0000000000'),
  ('VV6VVV', '0000000000'),
  ('WW6WWW', '0000000000'),
  ('XX6XXX', '0000000000'),
  ('YY6YYY', '0000000000'),
  ('ZZ6ZZZ', '0000000000'),
  ('AA7AAA', '0000000000'),
  ('BB7BBB', '0000000000'),
  ('CC7CCC', '0000000000'),
  ('DD7DDD', '0000000000'),
  ('EE7EEE', '0000000000'),
  ('FF7FFF', '0000000000'),
  ('GG7GGG', '0000000000'),
  ('HH7HHH', '0000000000'),
  ('II7III', '0000000000'),
  ('JJ7JJJ', '0000000000'),
  ('KK7KKK', '0000000000'),
  ('LL7LLL', '0000000000'),
  ('MM7MMM', '0000000000'),
  ('NN7NNN', '0000000000'),
  ('OO7OOO', '0000000000'),
  ('PP7PPP', '0000000000'),
  ('QQ7QQQ', '0000000000'),
  ('RR7RRR', '0000000000'),
  ('SS7SSS', '0000000000'),
  ('TT7TTT', '0000000000'),
  ('UU7UUU', '0000000000'),
  ('VV7VVV', '0000000000'),
  ('WW7WWW', '0000000000'),
  ('XX7XXX', '0000000000'),
  ('YY7YYY', '0000000000'),
  ('ZZ7ZZZ', '0000000000'),
  ('AA8AAA', '0000000000'),
  ('BB8BBB', '0000000000'),
  ('CC8CCC', '0000000000'),
  ('DD8DDD', '0000000000'),
  ('EE8EEE', '0000000000'),
  ('FF8FFF', '0000000000'),
  ('GG8GGG', '0000000000'),
  ('HH8HHH', '0000000000'),
  ('II8III', '0000000000'),
  ('JJ8JJJ', '0000000000'),
  ('KK8KKK', '0000000000'),
  ('LL8LLL', '0000000000'),
  ('MM8MMM', '0000000000'),
  ('NN8NNN', '0000000000'),
  ('OO8OOO', '0000000000'),
  ('PP8PPP', '0000000000'),
  ('QQ8QQQ', '0000000000'),
  ('RR8RRR', '0000000000'),
  ('SS8SSS', '0000000000'),
  ('TT8TTT', '0000000000'),
  ('UU8UUU', '0000000000'),
  ('VV8VVV', '0000000000'),
  ('WW8WWW', '0000000000'),
  ('XX8XXX', '0000000000'),
  ('YY8YYY', '0000000000'),
  ('ZZ8ZZZ', '0000000000'),
  ('AA9AAA', '0000000000'),
  ('BB9BBB', '0000000000'),
  ('CC9CCC', '0000000000'),
  ('DD9DDD', '0000000000'),
  ('EE9EEE', '0000000000'),
  ('FF9FFF', '0000000000'),
  ('GG9GGG', '0000000000'),
  ('HH9HHH', '0000000000'),
  ('II9III', '0000000000'),
  ('JJ9JJJ', '0000000000'),
  ('KK9KKK', '0000000000'),
  ('LL9LLL', '0000000000'),
  ('MM9MMM', '0000000000'),
  ('NN9NNN', '0000000000'),
  ('OO9OOO', '0000000000'),
  ('PP9PPP', '0000000000'),
  ('QQ9QQQ', '0000000000'),
  ('RR9RRR', '0000000000'),
  ('SS9SSS', '0000000000'),
  ('TT9TTT', '0000000000'),
  ('UU9UUU', '0000000000'),
  ('VV9VVV', '0000000000'),
  ('WW9WWW', '0000000000'),
  ('XX9XXX', '0000000000'),
  ('YY9YYY', '0000000000'),
  ('ZZ9ZZZ', '0000000000')
;

INSERT INTO checkins (net_id, callsign_id)
  SELECT nets.id, callsigns.id
  FROM nets
  LEFT JOIN callsigns ON callsigns.id % (nets.id + 1) = 0
;
