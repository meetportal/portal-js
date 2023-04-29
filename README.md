![Portal Banner](https://meetportal.github.io/portal-js/media/portal_banner.png)

## What is Portal?

Portal is an **Operating System as a Service (OSaaS)** that runs on top of an application. It extends the host application by using background services and embedding external applications into the same workspace. The host application, services and embedded applications all communicate with each other in real time. They share information as `resources`. This is accomplished by using a `request / response model` driven by a `permissions level security` architecture.

## Why integrate your application into Portal?

Portal handles the complexities of integrating into hosting applications for multiple industries. Portal integrates into primary applications for

- HealthCare (EMR/EHR)
- DentalCare (EDR)
- Education (SIS)
- Insurance (InsurTech)
- Legal
- Construction
- more...

This means you can integrate once into Portal and support multiple environments for one or more industries.

## Portal JS

Portal JS provides functionality for web applications integrating into Portal.

[Portal JS API Documentation](https://meetportal.github.io/portal-js/) can be found here

### Installation

The recommended way for using Portal is to install it directly into your application. It has a small footprint of ~5k (~2k gzip).

```bash
npm install @meetportal/portal-js
```

### CDN

If you prefer, you can add Portal JS as a script in the head of your HTML page. You won't get the autocompletion as you would if you installed it directly into your application.

```html
<script src="https://cdn.jsdelivr.net/npm/@meetportal/portal-js@latest/dist/portal.iife.js"></script>
```

## Quick start

Portal JS provides an API that connects your application to Portal. You can perform actions and subscribe to events. JavaScript and TypeScript are both supported.

### Using Portal in your application

The reference to Portal uses a `usePortal` hook. This hook will return a `PortalClient` object. This object provides the API for interacting with Portal.

```typescript
import { usePortal } from '@meetportal/portal-js'

const portal = usePortal()
const response = await portal.echo('Hello, world!')
console.log(response) // "Hello, world!"
```

> **Note:** The `usePortal` is a singleton. It will only create one instance of the `PortalClient` object. This means your application can call `usePortal` from anywhere and it will always return the same object.

Portal JS only works when inside a Portal environment. The application can perform a check using the helper below. This is useful when you want to change your application's UI based on it existing standalone or as a Portal application.

```typescript
import { inPortal } from '@meetportal/portal-js'

if (inPortal) {
  console.log('we are in Portal')
} else {
  console.log('we are not in Portal')
}
```

### Creating a service for Portal

Portal can run code as a background service. Each service runs as a independent web worker. Portal services are useful when you want to subscribe to events or perform actions without the need of a user interface (UI). Services are always running unlike applications which only run when they are open.

```typescript
import { PortalService } from '@meetportal/portal-js'

async function myService(portal: PortalService) {
  const response = portal.echo('Hello, world!')
  console.log(response) // 'Hello, world!'
}
```

### Subscribing using Portal events

There are many events Portal provides as part of the API. These events do not require any additional permissions. The events will differ between a Portal Application and Service, so refer to the documentation.

```typescript
import { Resource } from '@meetportal/portal-js'

portal.onResourceChange('patient', (patient?: Resource) => {
  console.log('patient changed', patient)
})
```

> **Note:** All events that are subscribed to will immediately return the current value on initialization.

> **Note:** All event subscriptions will return an `unsubscribe` function. This function can be called to unsubscribe from the event.

### Subscribing using subscribe method

You can subscribe to additional Portal events. These events may require permissions in order to use them. Refer to the documentation.

> **Note:** The `subscribe` events differ between the PortalClient and PortalService.

```typescript
import { PortalEvent } from '@meetportal/portal-js'

const unsubscribe = portal.subscribe(PortalEvent.URL_CHANGE, '*', (url: string) => {
  console.log('url changed:', url)
  unsubscribe()
})
```

<div class="footer">2023-present &copy; Orango, Inc. All rights reserved.</div>
