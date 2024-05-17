import psycopg2
from .configs import host, database, port, user, password

            
# Insert data into db
def populate_table(table_name, data):
    with psycopg2.connect(host=host, port=port, database=database, user=user, password=password) as conn:
        with conn.cursor() as cur:
            # Prepare the SQL query
            columns = ", ".join(data.columns)
            values_placeholder = ", ".join(["%s"] * len(data.columns))
            query = f"INSERT INTO {table_name} ({columns}) VALUES ({values_placeholder})"
            # Prepare the data
            data_tuples = [tuple(x) for x in data.to_records(index=False)]
            # Execute the query
            cur.executemany(query, data_tuples)
            # Commit the transaction
            conn.commit()


