FROM python:3.7-slim

COPY . /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
RUN pip install -r requirements.txt

# Installing the wait script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

CMD /wait && python runserver.py