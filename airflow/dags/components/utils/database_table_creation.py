import psycopg2
from .configs import host, database, port, user, password

def check_table(table_name):
    with psycopg2.connect(host=host, port=port, database=database, user=user, password=password) as conn:
        with conn.cursor() as cur:
            # Check if table exists
            cur.execute(f"select * from information_schema.tables where table_name='{table_name}'")
            if bool(cur.rowcount):
                # If table exists, delete all records
                cur.execute(f"delete from {table_name}")
                

# Establish db connection and create table
def create_table(table_name, columns):
    with psycopg2.connect(host=host, port=port, database=database, user=user, password=password) as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                create table if not exists {table_name}(
                {','.join(columns)})""")



# upload  table
def upload_table():
    with psycopg2.connect(host=host, port=port, database=database, user=user, password=password) as conn:
        with conn.cursor() as cur:
            cur.execute(f"""
                        COPY gold_post_data TO '/var/lib/postgresql/csv/gold_post_data.csv' DELIMITER ',' CSV HEADER;
                """)
                    