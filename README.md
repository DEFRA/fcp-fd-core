# Single Front Door Core
Local development support for orchestrating all Single Front Door microservices.

## Prerequisites
* Docker
* Docker Compose
* Node.js 22.13 LTS - We recommend using [NVM](https://github.com/nvm-sh/nvm) for Unix-based systems or [NVM-Windows](https://github.com/coreybutler/nvm-windows).

## Onboarding Guide

For new software developers joining the SFD team, there is an [onboarding guide](https://github.com/DEFRA/fcp-fd-core/blob/main/onboarding-guide/README.md) to get an instance of the local service up and running.

## Repositories
| Service | Type | Quality gate |
| --- | --- | --- |
| [fcp-fd-comms](https://github.com/defra/fcp-fd-comms) | Backend | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fcp-fd-comms&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fcp-fd-comms) |
| [fcp-fd-file-processor](https://github.com/DEFRA/fcp-fd-file-processor) | Backend | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fcp-fd-file-processor&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fcp-fd-file-processor) |
| [fcp-fd-file-retriever](https://github.com/DEFRA/fcp-fd-file-retriever) | Backend | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fcp-fd-file-retriever&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fcp-fd-file-retriever) |
| [fcp-fd-data](https://github.com/defra/fcp-fd-data) | Customer | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fcp-fd-data&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fcp-fd-data) |

## Local Development

You will need to clone this repository before running any scripts.
```bash
git clone https://github.com/DEFRA/fcp-fd-core

cd fcp-fd-core

npm install
```

### Cloning Repositories
This project contains a script to clone all the required repositories. This works by checking the service-compose directory for the services and cloning them if they do not exist.

To clone the repositories, run the following command:

```bash
npm run clone
```

### Starting the Services
A single docker-compose project has been created that orchestrates all microservices, dependencies, and performs any necessary setup tasks such as database migrations.

All configuration is stored in the `.env` file. Before starting the services, ensure that the `.env` file is correctly configured. See the `.env.example` file for an example configuration.

If you need assistance with finding the correct values for the `.env` file, please refer to the [onboarding guide](#onboarding-guide) or ask another developer for help.

To start all services, run the following command:

```bash
docker-compose --profile fcp-fd up --build
```

To stop the services, run the following command:

```bash
docker-compose down
```

The services can still be started individually directly from their respective repositories. However, this project is intended to streamline local development by having a common entry point for all services.

## Adding a New Service
Adding a new service to the core project is partially automated. The `add-service` script will scaffold a new microservice docker-compose project in the `service-compose` directory.

To add a new service, run the following command:

```bash
npm run add-service
```

### Databases
Database migrations are run by the local-setup container automatically when the services are started. If you are adding a new service that requires a database, you will need to let the local-setup container know where the Liquibase changelog files are located.

To do this, add a bind mount to `local-setup/fcp-fd-local-setup.yml` for the changelog directory of the new service.

```yaml
volumes:
    - ../repos/{service-name}/changelog:/liquibase/services/{service_name}/changelog
```

> [!IMPORTANT]
> The service_name folder on the container side must use snake_case.
> For example, if the service name is `fcp-fd-new-service`, the bind mount should be `/liquibase/services/fcp_fd_new_service/changelog`.
> ```yaml
> volumes:
>   - ../repos/fcp-fd-new-service/changelog:/liquibase/services/fcp_fd_new_service/changelog

## Script Documentation
This project contains a number of scripts to streamline local microservice development.

### Add Service
Scaffolds a new microservice docker-compose project in the `service-compose` directory.

```bash
npm run add-service
```

### Clone
Clones the repositories for each microservice into the parent directory.

```bash
npm run clone
```

### Latest Versions
List latest GitHub release version for each microservice.

```bash
npm run latest-versions
```

### Pull
Pulls the latest remote changes for each microservice.

```bash
npm run pull
```

### Update
Switches to and pulls the latest main branch for each microservice.

```bash
npm run update
```