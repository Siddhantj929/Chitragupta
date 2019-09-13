FROM ubuntu:latest

# Updating the container packages
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

# Specifying work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing required packages
COPY requirements.txt /usr/src/app/
RUN pip install -r requirements.txt

# Adding wait function to wait for postgres setup
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

# Start the process
EXPOSE 5000
CMD /wait && python runserver.py
