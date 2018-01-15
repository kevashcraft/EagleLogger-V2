INSERT INTO callsigns (
  frn, callsign, name,
  first_name, middle_initial, last_name,
  email, phone, address, zip_code_id,
  valid_start, valid_end
) SELECT DISTINCT ON (fcc_l_amat_en.frn)
  fcc_l_amat_en.frn,
  TRIM(fcc_l_amat_en.callsign),
  initcap(fcc_l_amat_en.first_name),
  initcap(fcc_l_amat_en.first_name),
  initcap(fcc_l_amat_en.middle_initial),
  initcap(fcc_l_amat_en.last_name),
  fcc_l_amat_en.email,
  fcc_l_amat_en.phone,
  initcap(fcc_l_amat_en.address),
  zip_codes.id,
  fcc_l_amat_hd.grant_date,
  coalesce(fcc_l_amat_hd.cancellation_date, fcc_l_amat_hd.expired_date)
FROM fcc_l_amat_en
LEFT JOIN fcc_l_amat_hd ON fcc_l_amat_hd.usid = fcc_l_amat_en.usid
LEFT JOIN zip_codes ON zip_codes.zip_code = fcc_l_amat_en.zip_code
WHERE frn > 0
ORDER BY fcc_l_amat_en.frn, fcc_l_amat_hd.grant_date DESC, fcc_l_amat_en.usid DESC
ON CONFLICT (frn) DO UPDATE SET
  callsign = TRIM(excluded.callsign),
  first_name = excluded.first_name,
  middle_initial = excluded.middle_initial,
  last_name = excluded.last_name,
  email = excluded.email,
  phone = excluded.phone,
  address = excluded.address,
  valid_start = excluded.valid_start,
  valid_end = excluded.valid_end
;

\copy (SELECT * FROM callsigns) TO 'tmp/callsigns.csv' WITH CSV


