DROP DATABASE IF EXISTS contact_list;
CREATE DATABASE contact_list;

\c contact_list;

CREATE TABLE contacts (
  id serial PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  dob varchar,
  eye_color varchar,
  telephone_number varchar
);
