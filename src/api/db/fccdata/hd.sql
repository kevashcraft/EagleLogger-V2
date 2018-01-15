SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS fcc_l_amat_hd_tmp;
CREATE TABLE fcc_l_amat_hd_tmp (
  record_type char(2),
  usid numeric(9),
  uls char(14),
  ebf varchar(30),
  callsign char(10),
  status char(1),
  radio_service_code char(2),
  grant_date text,
  expired_date text,
  cancellation_date text,
  eligibility_rule_num char(10),
  reserved char(1),
  alien char(1),
  alien_government char(1),
  alien_corporation char(1),
  alien_officer char(1),
  alien_control char(1),
  revoked char(1),
  convicted char(1),
  adjudged char(1),
  reserved2 char(1),
  common_carrier char(1),
  non_common_carrier char(1),
  private_comm char(1),
  fixed char(1),
  mobile char(1),
  radiolocation char(1),
  satellite char(1),
  developmental_or_sta_or_demonstration char(1),
  interconnected_service char(1),
  certifier_first_name varchar(20),
  certifier_mi char(1),
  certifier_last_name varchar(20),
  certifier_suffix char(3),
  certifier_title char(40),
  female char(1),
  black_or_african_american char(1),
  native_american char(1),
  hawaiian char(1),
  asian char(1),
  white char(1),
  hispanic char(1),
  effective_date text,
  last_action_date text,
  auction_id text,
  broadcast_services_regulatory_status char(1),
  band_manager_regulatory_status char(1),
  broadcast_services_type_of_radio_service char(1),
  alien_ruling char(1),
  licensee_name_change char(1)
);

\copy fcc_l_amat_hd_tmp FROM 'tmp/HD.dat' DELIMITER '|'

INSERT INTO fcc_l_amat_hd (
  record_type,
  usid,
  uls,
  ebf,
  callsign,
  status,
  radio_service_code,
  grant_date,
  expired_date,
  cancellation_date,
  eligibility_rule_num,
  reserved,
  alien,
  alien_government,
  alien_corporation,
  alien_officer,
  alien_control,
  revoked,
  convicted,
  adjudged,
  reserved2,
  common_carrier,
  non_common_carrier,
  private_comm,
  fixed,
  mobile,
  radiolocation,
  satellite,
  developmental_or_sta_or_demonstration,
  interconnected_service,
  certifier_first_name,
  certifier_mi,
  certifier_last_name,
  certifier_suffix,
  certifier_title,
  female,
  black_or_african_american,
  native_american,
  hawaiian,
  asian,
  white,
  hispanic,
  effective_date,
  last_action_date,
  auction_id,
  broadcast_services_regulatory_status,
  band_manager_regulatory_status,
  broadcast_services_type_of_radio_service,
  alien_ruling,
  licensee_name_change
) SELECT
  record_type,
  usid,
  uls,
  ebf,
  callsign,
  status,
  radio_service_code,
  to_date(nullif(grant_date, ''), 'MM/DD/YYYY'),
  to_date(nullif(expired_date, ''), 'MM/DD/YYYY'),
  to_date(nullif(cancellation_date, ''), 'MM/DD/YYYY'),
  eligibility_rule_num,
  reserved,
  alien,
  alien_government,
  alien_corporation,
  alien_officer,
  alien_control,
  revoked,
  convicted,
  adjudged,
  reserved2,
  common_carrier,
  non_common_carrier,
  private_comm,
  fixed,
  mobile,
  radiolocation,
  satellite,
  developmental_or_sta_or_demonstration,
  interconnected_service,
  certifier_first_name,
  certifier_mi,
  certifier_last_name,
  certifier_suffix,
  certifier_title,
  female,
  black_or_african_american,
  native_american,
  hawaiian,
  asian,
  white,
  hispanic,
  to_date(nullif(effective_date, ''), 'MM/DD/YYYY'),
  to_date(nullif(last_action_date, ''), 'MM/DD/YYYY'),
  NULLIF(auction_id, '')::int,
  broadcast_services_regulatory_status,
  band_manager_regulatory_status,
  broadcast_services_type_of_radio_service,
  alien_ruling,
  licensee_name_change
FROM fcc_l_amat_hd_tmp;

\copy (SELECT * FROM fcc_l_amat_hd) TO 'tmp/fcc_l_amat_hd.csv' WITH CSV