FROM python:3.7-slim

# Updating the container packages
RUN python -m pip install --upgrade pip

# Specifying work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing required packages
COPY requirements.txt /usr/src/app/
RUN python -m pip install --upgrade setuptools
RUN python -m pip install -r requirements.txt

# Adding wait function to wait for postgres setup
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

# Start the process
EXPOSE 5001
CMD /wait \
   && python3 runserver.py
