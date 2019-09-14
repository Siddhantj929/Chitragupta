FROM ubuntu:latest

# Updating the container packages
RUN apt-get update \
   && apt-get install -y python3-pip python3-dev \
   && cd /usr/local/bin \
   && ln -s /usr/bin/python3 python \
   && pip3 install --upgrade pip

# Specifying work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing required packages
COPY requirements.txt /usr/src/app/
RUN pip3 install --upgrade setuptools
RUN pip3 install -r requirements.txt

# Adding wait function to wait for postgres setup
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

# Start the process
EXPOSE 5000
CMD /wait && python3 runserver.py
