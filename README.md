# Single Front Door Core
Local development support for orchestrating all Single Front Door microservices.

## Prerequisites

Ensure you have satisfied the prerequisites of all individual repositories.

## Onboarding Guide

For new software developers joining the SFD team, there is an [onboarding guide](https://github.com/DEFRA/fcp-fd-core/blob/main/onboarding-guide/README.md) to get an instance of the local service up and running.

## Repositories
### Frontends
- [fcp-fd-landing-page](https://github.com/defra/fcp-fd-landing-page)
- [fcp-fd-messages](https://github.com/DEFRA/fcp-fd-messages)

### Backends
- [fcp-fd-auth](https://github.com/defra/fcp-fd-auth)
- [fcp-fd-ingress](https://github.com/defra/fcp-fd-ingress)
- [fcp-fd-messages-processor](https://github.com/DEFRA/fcp-fd-messages-processor)
- [fcp-fd-file-receiver](https://github.com/DEFRA/fcp-fd-file-receiver)
- [fcp-fd-file-processor](https://github.com/DEFRA/fcp-fd-file-processor)

### Customer
- [fcp-fd-data](https://github.com/defra/fcp-fd-data)
- [fcp-fd-customer-receiver-messages](https://github.com/DEFRA/fcp-fd-customer-receiver-messages)

## Scripts

### Clone

Clone all repositories from GitHub.  Repositories will cloned in the parent directory of this repository.

[`./clone`](clone)

### Update

Switch to `main` branch in every repository and pull latest changes with `git pull`.

[`./update`](update)

### Build

Build/rebuild Docker container for all microservices.

[`./build`](build)

### Start

Run all services.

Runs `Seed` script if `fcp-fd-scripts` repository is cloned.

[`./start`](start)

#### Optional arguments
- `-f` - include Azure Functions
- `-s` - include Statement services
- `-S` - only statement services

### Stop

Stop all services.

[`./stop`](stop)

#### Optional arguments

Any valid `docker-compose down` argument.

### Seed

Seed customer mapping data from private repository to `fcp-fd-business` if `fcp-fd-scripts` repository is cloned.

[`./seed`](seed)

### Open

Open all services in Visual Studio Code.

[`./open`](open)

#### Optional arguments
- `-f` - include Azure Functions
- `-s` - include Statement services
- `-S` - only statement services

### Latest versions

List latest GitHub release version for each microservice.

[`./latest-versions`](latest-versions)

### Environment versions

List current environment version for each microservice hosted in Kubernetes. Further guidance on how to utilise the `./environment-versions` script is also [available on Confluence](https://eaflood.atlassian.net/wiki/spaces/SFD/pages/5056823438/Environment+versions+Using+kubectl+with+the+fcp-fd-core+repo).

[`./environment-versions`](environment-versions)

#### Options
- `-c | --cluster` - Kubernetes cluster context name
- `-n | --namespace` - Kubernetes namespace

#### Resources
`./resources/cosmos-upload`  

Upload multiple items to a local emulator instance of Cosmos. Insert information as prompted. Currently the items uploaded match only the messages and queries schemas.

### Resource quota

Determine the Kubernetes resource usage for a namespace based on all microservices running at maximum capacity and scaling.

[`./resource-quota`](resource-quota)