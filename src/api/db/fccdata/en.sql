SET client_min_messages TO WARNING;

DROP TABLE IF EXISTS fcc_l_amat_en_tmp;
CREATE TABLE fcc_l_amat_en_tmp (
  record_type char(2),
  usid numeric(9),
  uls text,
  ebf varchar(30),
  callsign char(10),
  type char(2),
  licensee_id char(9),
  name varchar(200),
  first_name varchar(20),
  middle_initial char(1),
  last_name varchar(20),
  suffix char(3),
  phone char(10),
  fax char(10),
  email varchar(50),
  address varchar(60),
  city varchar(20),
  state char(2),
  zip_code char(9),
  po_box varchar(20),
  attention_line varchar(35),
  sgin char(3),
  frn text,
  applicant_type char(1),
  applicant_type_other char(40),
  status_code char(1),
  status_date varchar(30)
);

\copy fcc_l_amat_en_tmp FROM 'tmp/EN.dat' DELIMITER '|'

INSERT INTO fcc_l_amat_en (
  record_type,
  usid,
  uls,
  ebf,
  callsign,
  type,
  licensee_id,
  name,
  first_name,
  middle_initial,
  last_name,
  suffix,
  phone,
  fax,
  email,
  address,
  city,
  state,
  zip_code,
  po_box,
  attention_line,
  sgin,
  frn,
  applicant_type,
  applicant_type_other,
  status_code,
  status_date
) SELECT
  record_type,
  usid,
  uls,
  ebf,
  callsign,
  type,
  licensee_id,
  name,
  first_name,
  middle_initial,
  last_name,
  suffix,
  phone,
  fax,
  email,
  address,
  city,
  state,
  zip_code,
  po_box,
  attention_line,
  sgin,
  CASE WHEN TRIM(frn) = ''
    THEN 0
    ELSE frn::bigint
  END,
  applicant_type,
  applicant_type_other,
  status_code,
  to_date(nullif(status_date, ''), 'MM/DD/YYYY')
FROM fcc_l_amat_en_tmp;

\copy (SELECT * FROM fcc_l_amat_en) TO 'tmp/fcc_l_amat_en.csv' WITH CSV