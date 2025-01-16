# Single Front Door Core
Local development support for orchestrating all Single Front Door microservices.

## Prerequisites
* Docker
* Docker Compose
* Node.js 22.13 LTS - We recommend using [NVM](https://github.com/nvm-sh/nvm)

## Onboarding Guide

For new software developers joining the SFD team, there is an [onboarding guide](https://github.com/DEFRA/fcp-fd-core/blob/main/onboarding-guide/README.md) to get an instance of the local service up and running.

## Repositories
### Frontends
- [fcp-fd-landing-page](https://github.com/defra/fcp-fd-landing-page)
- [fcp-fd-messages](https://github.com/DEFRA/fcp-fd-messages)

### Backends
- [fcp-fd-auth](https://github.com/defra/fcp-fd-auth)
- [fcp-fd-comms](https://github.com/defra/fcp-fd-comms)
- [fcp-fd-file-processor](https://github.com/DEFRA/fcp-fd-file-processor)
- [fcp-fd-file-receiver](https://github.com/DEFRA/fcp-fd-file-receiver)
- [fcp-fd-ingress](https://github.com/defra/fcp-fd-ingress)
- [fcp-fd-messages-processor](https://github.com/DEFRA/fcp-fd-messages-processor)
- [fcp-fd-probe](https://github.com/DEFRA/fcp-fd-probe)
- [fcp-fd-probe-alerts](https://github.com/DEFRA/fcp-fd-probe-alerts)

### Customer
- [fcp-fd-data](https://github.com/defra/fcp-fd-data)
- [fcp-fd-customer-receiver-messages](https://github.com/DEFRA/fcp-fd-customer-receiver-messages)

## Local Development
### Cloning Repositories
This project contains a script to clone all the required repositories. This works by checking the service-compose directory for the services and cloning them if they do not exist.

To clone the repositories, run the following command:

```bash
npm run clone
```

### Starting the Services
This project creates a single docker-compose project that orchestrates all microservices and performs any necessary setup such as database migrations.

All configuration is stored in the `.env` file. Before starting the services, ensure that the `.env` file is correctly configured. See the `.env.example` file for an example configuration.

If you need assistance with finding the correct values for the `.env` file, please refer to the [onboarding guide](#onboarding-guide) or ask another developer for help.

To start the services, run the following command:

```bash
docker-compose up --build
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

> [!IMPORTANT]
> The service_name folder on the container side must use snake_case.
> For example, if the service name is `fcp-fd-new-service`, the bind mount should be `/liquibase/services/fcp_fd_new_service/changelog`.
> ```yaml
> volumes:
>   - ../repos/fcp-fd-new-service/changelog:/liquibase/services/fcp_fd_new_service/changelog

```yaml
    volumes:
      - ../repos/{service-name}/changelog:/liquibase/services/{service_name}/changelog
```

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