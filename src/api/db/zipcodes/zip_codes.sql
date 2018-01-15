SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS zip_codes_tmp;
CREATE TEMPORARY TABLE zip_codes_tmp (
  zip text,
  type text,
  decommissioned text,
  primary_city text,
  acceptable_cities text,
  unacceptable_cities text,
  state text,
  county text,
  timezone text,
  area_codes text,
  world_region text,
  country text,
  latitude text,
  longitude text,
  irs_estimated_population_2014 text
);

\copy zip_codes_tmp FROM './zip_codes.csv' WITH CSV

DROP TABLE IF EXISTS zip_codes;
CREATE TABLE zip_codes (
  id serial NOT NULL,
  created timestamp DEFAULT current_timestamp NOT NULL,
  zip_code char(5),
  city varchar(128),
  state varchar(128),
  county varchar(128),
  timezone varchar(128),
  deleted boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO zip_codes (
  zip_code,
  city,
  state,
  county,
  timezone
) SELECT
  zip,
  primary_city,
  state,
  county,
  timezone
FROM zip_codes_tmp;

