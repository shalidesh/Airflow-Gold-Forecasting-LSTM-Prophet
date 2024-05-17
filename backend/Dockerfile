FROM python:3.8
WORKDIR /backend
COPY . /backend
RUN pip install -r requirements.txt
EXPOSE 5000
# Run app.py when the container launches
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
