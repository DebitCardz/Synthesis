FROM denoland/deno:1.13.2

RUN mkdir /app
RUN mkdir /app/secrets
RUN mkdir /app/src
COPY app.sh /app
COPY secrets/** /app/secrets
COPY src/** /app/src