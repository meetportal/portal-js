![Portal Banner](https://meetportal.github.io/portal-js/media/portal-js-banner.svg)

[![NPM Version](https://img.shields.io/npm/v/@meetportal/portal-js.svg?style=for-the-badge)](https://www.npmjs.com/package/@meetportal/portal-js)

Portal is a platform that extends a website or online application with additional features using background services and external applications. Portal JS provides an API for applications and services to interact with Portal. Portal JS is designed to be used in any JavaScript or TypeScript application.

Users use Portal by installing the Portal browser extension or browser (in development). Portal can also be added to a website or online application by adding an additional Portal's hosting library to their website allowing users to use Portal without installing the browser extension or browser.

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

## Using Portal in your application

Portal JS only works when inside a Portal environment. The application can perform a check using the helper below. This is useful when you want to change your application's UI based on it existing standalone or as a Portal application.

```typescript
import { inPortal } from '@meetportal/portal-js'

if (inPortal) {
  console.log('app is in portal')
} else {
  console.log('app is not in Portal')
}
```

The reference to Portal uses a `usePortal` hook. This hook will return a `PortalClient` object. This object provides the API for interacting with Portal.

```typescript
import { inPortal, usePortal } from '@meetportal/portal-js'

async function main() {
  if (inPortal) {
    const response = await usePortal().echo('Hello, world!')
    console.log(response) // "Hello, world!"
  }
}

main()
```

> **Note:** The `usePortal` is a singleton. It will only create one instance of the `PortalClient` object. This means your application can call `usePortal` from anywhere and it will always return the same object.

## Create a Portal service

Portal can run code as a background service. Each service runs as a independent web worker. Portal services are useful when you want to subscribe to events or perform actions without the need of a user interface (UI). Services are always running unlike applications which only run when they are open.

```typescript
import { usePortalService } from '@meetportal/portal-js'

async function main() {
  const service = usePortalService()
  const response = await service.echo('Hello, world!')
  console.log(response) // "Hello, world!"
}

main()
```

## Subscribe to events

There are many events Portal provides as part of the API. These events do not require any additional permissions. The events will differ between a Portal Application and Service, so refer to the documentation.

```typescript
import { Resource } from '@meetportal/portal-js'

portal.onResourceChange('customer', (resource?: Resource) => {
  console.log('customer changed', resource)
})
```

> **Note:** All events that are subscribed to will immediately return the current value on initialization.

> **Note:** All event subscriptions will return an `unsubscribe` function. This function can be called to unsubscribe from the event.

## Using subscribe method

You can subscribe to additional Portal events. These events may require permissions in order to use them. Refer to the documentation.

> **Note:** The `subscribe` events differ between the PortalClient and PortalService.

```typescript
import { PortalEvent } from '@meetportal/portal-js'

const unsubscribe = portal.subscribe(PortalEvent.URL_CHANGE, '*', (url: string) => {
  console.log('url changed:', url)
  unsubscribe()
})
```

# Additional resources

Though you can use Portal JS directly, it is recommended to use one of the industry specific libraries. These libraries provide additional functionality for the industry they are designed for as well as standardize resources and events.

- [Construction](https://meetportal.github.io/projects-js/)
- [DentalCare (EDR)](https://meetportal.github.io/dentalcare-js/)
- [Education (SIS)](https://meetportal.github.io/learning-js/)
- [HealthCare (EMR/EHR)](https://meetportal.github.io/healthcare-js/)
- [Insurance (InsurTech)](https://meetportal.github.io/insurance-js/)
- [Legal](https://meetportal.github.io/legal-js/)

If you have a suggestion for a new industry you would like to add, please [create an issue](https://github.com/meetportal/portal-js/issues) and let us know.

<div class="footer">2023-present &copy; Orango, LLC. All rights reserved.</div>
