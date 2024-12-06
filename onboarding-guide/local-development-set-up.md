# Local Development Set Up
The SFD has a pretty large number of repositories that we're currently developing and prototyping. The following instructions should get you set up so that you can run the Single Front Door service locally. There is some information, such as environment variables, that can't be provided/shared publicly in this guide, but the team will provide all of the environment variables needed to get the SFD up and running locally. 

1. Clone the [fcp-fd-core](https://github.com/defra/fcp-fd-core) repository from GitHub. This makes local development a lot easier because you'll be able to build, start, and stop multiple Docker containers for each of our micro-services with a single command. The core also enables you to checkout to main branches and pull latest updates.

2. As instructed by the [README](https://github.com/DEFRA/fcp-fd-core/blob/main/README.md), run the `./clone` command to get all repos cloned to your local machine.

3. Before continuing with the rest of the instructions in the `README` there a couple of steps that need to be completed:
	- You'll need all of the environment variables for all our microservices so that the Docker containers can build successfully. Ask anyone on the development team and they'll give you everything you need.
	- Secondly, some of our microservices require Azure Service Bus infrastructure. Each developer has their own individual topics/subscriptions and queues as this makes local development a lot easier. To create your own Service Bus infrastructure, clone the [ffc-azure-service-bus-scripts-repo](https://github.com/DEFRA/ffc-azure-service-bus-scripts). You'll also need to install [yq](https://github.com/mikefarah/yq) to be able to run the commands from this repository. The commands needed contain information such as the names of resource groups, subscriptions etc. that can't be shared publicly so ask a member of the team and these commands will be provided to you.
	- As an alternative to the above suggestion, it is recommended to use the official Service Bus emulator. Information on this emulator can be found in the [FCP Development Guide](https://defra.github.io/ffc-development-guide/development-patterns/events-and-messages/#local-development).

4. Once your `.env` file set up is complete and your Service Bus infrastructure is provisioned, you can follow the rest of the instructions in the core's `README`. Namely, you'll need to build and then start all the Docker containers:
```
./build
./start
```
If at any stage you come into any errors and have issues with troubleshooting, don't hesitate to reach out to the team and we'll get it sorted.
***
 There are two environment variables which you won't receive values for: `DEV_AUTH_PUBLIC_KEY` and `DEV_AUTH_PRIVATE_KEY`. These are only needed when `DEFRA_ID_ENABLED` is set to `false` and the `fcp-fd-auth` service will automatically generate values for both of these variables on start up.