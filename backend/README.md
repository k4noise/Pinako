## Installation

```bash
$ npm install
```

## Before run

Create .env file with content

```
HOST=
DBUSER=
DBPASS=
DATABASE=
JWT_SECRET=
```

Place your values in this order:

- database host (default = localhost)
- database user (default = pinako)
- database user password
- database name (default = postgres, recommended = pinako)
- random phrase for encrypt jwt

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API description

<details>
 <summary>Few words about authorization
 </summary>
 This server use JWT with refresh tokens. Tokens are created at server with cookies with httpOnly option. When making requests to the server, ensure that a cookie is attached to the request.
 </details>

<details>
 <summary>Register user: <code>POST</code> <code><b>/</b></code> <code>auth/users</code></summary>

##### Parameters

> | name     | type     | description   |
> | -------- | -------- | ------------- |
> | login    | required | User login    |
> | password | required | User password |

##### Responses

> | http code | response                                                                       |
> | --------- | ------------------------------------------------------------------------------ |
> | `201`     | `No response`                                                                  |
> | `400`     | `{"code":"400","message":"Bad Request"}`                                       |
> | `422`     | `{errors: 'field': ['field should be not a empty', 'field must be a string']}` |

</details>

<details>
 <summary>Login user: <code>POST</code> <code><b>/</b></code> <code>auth/login</code></summary>

##### Parameters

> | name     | type     | description   |
> | -------- | -------- | ------------- |
> | login    | required | User login    |
> | password | required | User password |

##### Responses

**Attention:** User avatar url, given to success response, has relative path. Full path: {serverAddress}/static/{avatarUrl}

Success response create 2 cookies: accessToken and refreshToken.

> | http code | response                                                                       |
> | --------- | ------------------------------------------------------------------------------ |
> | `201`     | `{id: id, avatarUrl: '/default.png'}`                                          |
> | `400`     | `{"code":"400","message":"Bad Request"}`                                       |
> | `422`     | `{errors: 'field': ['field should be not a empty', 'field must be a string']}` |

</details>

<details>
 <summary>Logout user: <code>POST</code> <code><b>/</b></code> <code>auth/logout</code></summary>

##### Parameters

None, cookie with access token is required

##### Responses

> | http code | response                                                                       |
> | --------- | ------------------------------------------------------------------------------ |
> | `201`     | `No response`                                                                  |
> | `400`     | `{"code":"400","message":"Bad Request"}`                                       |
> | `401`     | `{"code":"401","message":"Unauthorized"}`                                      |
> | `422`     | `{errors: 'field': ['field should be not a empty', 'field must be a string']}` |

</details>

<details>
 <summary>Refresh user tokens: <code>POST</code> <code><b>/</b></code> <code>auth/refresh</code></summary>

##### Parameters

None, cookie with refresh token is required

##### Responses

> | http code | response                                  |
> | --------- | ----------------------------------------- |
> | `200`     | `No response`                             |
> | `401`     | `{"code":"401","message":"Unauthorized"}` |
> | `403`     | `{"error": "Wrong refresh token"}`        |

</details>

---

<details>
 <summary>Get all users: <code>GET</code> <code><b>/</b></code> <code>users</code></summary>

##### Parameters

None

##### Responses

> | http code | response                                                                                               |
> | --------- | ------------------------------------------------------------------------------------------------------ |
> | `200`     | `[ {"id": 1,"login": "login", "displayName": "login", "about": "", "avatarUrl": "/default.jpg" },...]` |

</details>

<details>
 <summary>Get specific user data: <code>GET</code> <code><b>/</b></code> <code>users/{userId}</code></summary>

##### Parameters

None

##### Responses

> | http code | response                                                                                                                       |
> | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
> | `200`     | `[ {"id": 1,"login": "login", "password": "password", "displayName": "login", "about": "", "avatarUrl": "/default.jpg" },...]` |
> | `409`     | `{ "statusCode": 409, "message": "User don't exists" }`                                                                        |

</details>

<details>
 <summary>Update user data: <code>PATCH</code> <code><b>/</b></code> <code>users/update</code></summary>

##### Parameters

Cookie with access token is required

> | name        | type     | description              |
> | ----------- | -------- | ------------------------ |
> | password    | required | User password            |
> | displayName | optional | User visible name        |
> | about       | optional | User visible description |
> | avatarUrl   | optional | User avatar url          |
> | newPassword | optional | New user password        |

##### Responses

> | http code | response                                                |
> | --------- | ------------------------------------------------------- |
> | `200`     | `None`                                                  |
> | `400`     | `{"code":"400","message":"Bad Request"}`                |
> | `401`     | `{ "statusCode": 401, "message": "Wrong password" }`    |
> | `401`     | `{ "statusCode": 401, "message": "Unauthorized" }`      |
> | `409`     | `{ "statusCode": 409, "message": "User don't exists" }` |
> | `422`     | `{errors: 'field': ['field must be a string']}`         |

</details>

<details>
 <summary>Delete user: <code>DELETE</code> <code><b>/</b></code> <code>users/delete</code></summary>

##### Parameters

None, cookie with access token is required

##### Responses

> | http code | response                                                |
> | --------- | ------------------------------------------------------- | --- |
> | `200`     | `None`                                                  |
> | `401`     | `{ "statusCode": 401, "message": "Unauthorized" }`      |     |
> | `409`     | `{ "statusCode": 409, "message": "User don't exists" }` |

</details>

---
