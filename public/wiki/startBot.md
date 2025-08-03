# Start Bot

Creates a new API connection to the server.

## Parameters

| Name        | Type   | Description                                                          |
| ----------- | ------ | -------------------------------------------------------------------- |
| Server Url  | String | The URL of the server to connect to.                                 |
| Username    | String | The username to use when connecting to the server.                   |
| Password    | String | The password to use when connecting to the server.                   |
| Environment | String | The environment to connect to. Either `Production` or `Development`. |

## Output

| Type          | Description               |
| ------------- | ------------------------- |
| api_connector | The API connector object. |

## Example

```blocks
start_bot("http://localhost:3000", "iris", "password", "test")
```
