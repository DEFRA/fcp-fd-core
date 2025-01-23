# Builder Stage
FROM node:22.13.0-alpine3.21

ARG LIQUIBASE_VERSION=4.28.0
ARG LB_SHA256=97dd07eaca0406a09e1ae19b407eea42a7e944c7f4571922bffce71b43b75ce8

# Create setup user
RUN addgroup -S setup && \
    adduser -S setup -G setup

# Create directory for Liquibase
RUN mkdir /liquibase && chown setup /liquibase

# Install PostgreSQL client
RUN apk --update add \ 
    openjdk17-jre \
    postgresql-client \
    curl \
    bash

# Download and install Liquibase
WORKDIR /liquibase

RUN wget -q -O liquibase-${LIQUIBASE_VERSION}.tar.gz "https://github.com/liquibase/liquibase/releases/download/v${LIQUIBASE_VERSION}/liquibase-${LIQUIBASE_VERSION}.tar.gz" && \
    echo "$LB_SHA256 *liquibase-${LIQUIBASE_VERSION}.tar.gz" | sha256sum -c - && \
    tar -xzf liquibase-${LIQUIBASE_VERSION}.tar.gz && \
    rm liquibase-${LIQUIBASE_VERSION}.tar.gz && \
    ln -s /liquibase/liquibase /usr/local/bin/liquibase && \
    liquibase --version

# Set LIQUIBASE_HOME environment variable
ENV LIQUIBASE_HOME=/liquibase

COPY --chown=setup:setup scripts/ /scripts

# Set user and group
USER setup:setup

WORKDIR /scripts

RUN npm install ffc-messaging@2.10.1

ENTRYPOINT ["/scripts/run-setup.sh"]
