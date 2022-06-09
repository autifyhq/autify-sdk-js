# Autify SDK for JavaScript

**NOTE: This package is primarily designed for [Autify CLI](https://github.com/autifyhq/autify-cli) so far.**

## Install

```shell
npm install @autifyhq/autify-sdk
```

## Usage

```javascript
import { WebClient } from "@autifyhq/autify-sdk";

const client = new WebClient(token);
await client.listCapabilities(projectId);
```
