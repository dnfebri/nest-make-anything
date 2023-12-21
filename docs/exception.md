# Exception

This document provides examples and guidelines for creating error exceptions in your code. Error exceptions are used to handle and communicate errors, whether they are related to invalid fields or payload. There are two types of exceptions that can be thrown in your code:

1. Default/General Exceptions:

```ts
throw new ForbiddenException(`User is not active yet, we've already sent a link verification.`);

// Result
{
  "status_code": 403,
  "message": "User is not active yet, we've already sent a link verification.",
  "error": "Forbidden"
}
```

In this example, a `ForbiddenException` is thrown to indicate that the user is not yet active and a link verification has already been sent. The resulting error object includes a status code of 403, a message describing the error, and an "error" field set to "Forbidden."

2. Exceptions with Fields:

```ts
throw new ErrorException({
    password: 'incorrectPassword',
    // ...
}, HttpStatus.UNPROCESSABLE_ENTITY);

// Result
{
  "status_code": 422,
  "message": "Validation Error",
  "errors": {
    "password": "incorrectPassword"
  }
}
```

In this example, an `ErrorException` is thrown to indicate a validation error with the password field. The resulting error object includes a status code of 422, a general error message of "Validation Error," and an "errors" field containing the specific field error(s) as key-value pairs. In this case, the "password" field has an error message of "incorrectPassword."

By following these examples, you can create error exceptions in your code to handle various error scenarios and provide meaningful error messages for easier debugging and troubleshooting.
