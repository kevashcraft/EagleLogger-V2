FROM postgres:latest

ARG PGINIT_DIR=/docker-entrypoint-initdb.d/

ENV DB_NAME=eaglelogger
ENV PGINIT_DIR=${PGINIT_DIR}

COPY . ${PGINIT_DIR}
