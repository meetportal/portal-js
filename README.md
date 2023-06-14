![Portal Banner](https://meetportal.github.io/portal-js/media/portal-js-banner.svg)

[![NPM Version](https://img.shields.io/npm/v/@meetportal/portal-js.svg?style=for-the-badge)](https://www.npmjs.com/package/@meetportal/portal-js)

> Portal is currently in beta. If you would like to participate in the beta, please [contact us](https://meetportal.com/contact).

Portal improves your productivity and streamlines your browsing experience. With Portal, you can extends a website or online application with additional applications and services. Portal provides productivity applications enabling you to save time, improve your productivity. Portal JS provides an API for applications and services to interact with Portal. Portal JS is designed to be used in any JavaScript or TypeScript application. To learn more about Portal visit [meetportal.com](https://meetportal.com).

## Full documentation

For full documentation, please visit the [Portal library documentation](https://meetportal.github.io/portal-js/).

## Features

- Users can add bookmarks, notes, and tasks to any website or online application.
- Users can extend a website or online application with additional applications and services available from [Portal's marketplace](https://marketplace.meetportal.com).
- Developers can create applications and services that can be used in any website or online application, and can be distributed through the Portal Marketplace.
- We welcome contributions from the community. We are a small team looking for help in building the future of the web. If you are interested in contributing, [join us on Slack!](https://meetportal.slack.com/)

## Installation

The recommended way for using Portal is to install it directly into your application.

```bash
npm install @meetportal/portal-js
```

## CDN

If you prefer, you can add Portal JS as a script in the head of your HTML page. You won't get the autocompletion as you would if you installed it directly into your application.

```html
<script src="https://cdn.jsdelivr.net/npm/@meetportal/portal-js@latest/dist/portal.iife.js"></script>
```

# Quick start

Portal JS provides an API that connects your application to Portal. You can perform actions and subscribe to events. JavaScript and TypeScript are both supported.

## Using Portal in an application

The reference to Portal uses a `usePortalClient` singleton. This function will return a `PortalClient` object. This object provides the API for interfacing with Portal.

> **Note:** The `usePortalClient` function is not a React hook. It is a singleton that returns the same object each time it is called.

```typescript
import { inPortal, usePortalClient } from '@meetportal/portal-js'

async function main() {
  // check if application is running in Portal before calling Portal JS functions
  if (inPortal) {
    const response = await usePortalClient().echo('Hello, world!')
    console.log(response) // "Hello, world!"
  }
}

main()
```

## Create a Portal service

Portal can also run code as a background service. Each service runs as a independent web worker. Portal services are useful when you want to subscribe to events or perform actions without relying on an application being in an open state. Services are always running unlike applications which only run when they are open. These services can be registered alongside an application or standalone.

Portal provides a [starter kit for creating a service](https://github.com/meetportal/portal-service-starter). The starter kit provides a template for creating a service. It also provides a `build` script that will compile your service to host on the web.

```typescript
import { usePortalService } from '@meetportal/portal-js'

async function main() {
  const response = await usePortalService().echo('Hello, world!')
  console.log(response) // "Hello, world!"
}

main()
```

## Subscribe to events

There are many events Portal provides as part of the API. These events may require any additional permissions. Events will differ between an application and service, so refer to the documentation.

_Example of subscribing to Portal in an application_

```typescript
import { Resource, usePortalClient } from '@meetportal/portal-js'

const unsubscribe = usePortalClient().onResourceChange('customer', (resource?: Resource) => {
  // subscribing to an event will immediately return the current value
  console.log('customer changed --', resource)
  if (resource) {
    console.log('customer id:', resource.id)
    // you can use the unsubscribe function to stop listening to events
    unsubscribe()
  }
})
```

## Using subscribe method

You can subscribe to additional Portal events. These events may require permissions in order to use them. Refer to the documentation.

> **Note:** The `subscribe` events differ between the PortalClient and PortalService.

_Example of subscribing to Portal in a service_

```typescript
import { PortalEvent, usePortalService } from '@meetportal/portal-js'

const unsubscribe = usePortalService().subscribe(PortalEvent.URL_CHANGE, '*', (url: string) => {
  // subscribing to an event will immediately return the current value
  console.log('url changed --', url)
  if (url === 'https://example.com') {
    // you can use the unsubscribe function to stop listening to events
    unsubscribe()
  }
})
```

# Would you like to use Portal for a specific industry?

We have created industry specific libraries that extend Portal JS. These are designed to be used in specific industries in order to provide standardization and additional functionality.

These libraries are currently in beta. If you would like to contribute to these libraries or add a new one feel free to fork the repository and submit a pull request. Don't forget to [join us on Slack!](https://meetportal.slack.com/)

- [Construction](https://meetportal.github.io/projects-js/)
- [DentalCare (EDR)](https://meetportal.github.io/dentalcare-js/)
- [Education (SIS)](https://meetportal.github.io/learning-js/)
- [HealthCare (EMR/EHR)](https://meetportal.github.io/healthcare-js/)
- [Insurance (InsurTech)](https://meetportal.github.io/insurance-js/)
- [Legal](https://meetportal.github.io/legal-js/)

If you have a suggestion for a new industry you would like to add, please [create an issue](https://github.com/meetportal/portal-js/issues) and let us know.

# Contributing

We welcome contributions from the community. We are a small team looking for help in building the future of the web. If you are interested in contributing, [join us on Slack!](https://meetportal.slack.com/)
