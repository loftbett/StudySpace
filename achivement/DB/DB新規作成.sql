CREATE DataBase achivement_management;

CREATE USER loftbett WITH PASSWORD 'karakuri' SUPERUSER;

GRANT ALL PRIVILEGES ON DATABASE achivement_management TO loftbett;
GRANT USAGE ON SCHEMA public to loftbett;
GRANT USAGE ON SCHEMA pg_catalog to loftbett;

ALTER ROLE loftbett IN DATABASE achivement_management SET search_path TO public;


-- ERから各テーブルを作成した後

