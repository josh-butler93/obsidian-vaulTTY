Pulling the Database Image
- Command:
  - podman pull docker.io/library/postgres:latest
  - podman pull postgres:latest 

Create a Persistent Volume
- Command:
  - podman volume create pgdata
  - podman volume ls

Run PostgresSQL container
- Command: 
  - podman run -d --name postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=mydb -v pgdata:/var/lib/postgresql/data -p 5432:5432 # <change as needed> docker.io/library/postgres:latest or postgres:latest 

What each part does
-d → run in background
--name postgres-db → container name
-e → environment variables (sets up DB credentials)
  - user: admin
  - password: secret
  - database: mydb
-v pgdata:/var/lib/postgresql/data → persistent storage
-p 5432:5432 → expose DB port

Verify it's running
- Command:
  - podman ps

Connect to the database
- Command:
  - podman exec -it postgres-db psql -U admin -d mydb
    - psql = Running the PostgresSQL client tool 
- Command: 
  - podman exec -it postgres-db bash 
    - once inside the container run the below command 
      - Command:
        - psql -U admin -d mydb

Once in the database run the below commands ->
- Command:
  - \l          -- list databases
  - \dt         -- list tables
  - SELECT 1;   -- test query
  - \q          -- exit the database

Adding some data to the database
- Command: 
  - podman exec -it postgres-db psql -U admin -d mydb
    - the above command logs you back into the database

Now create a table and insert data: #=data added to the database

#CREATE TABLE test (id SERIAL PRIMARY KEY, name TEXT);

#INSERT INTO test (name) VALUES ('Beowulf');

#SELECT * FROM test;

Restarting Containers 
- Command:
  - podman restart <container_name> 
  - podman restart postgres-db

Check if data is still there
- Command:
  - podman exec -it postgres-db psql -U admin -d mydb
  - SELECT * FROM test;
