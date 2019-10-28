define({ "api": [
  {
    "type": "get",
    "url": "/auth/logout",
    "title": "",
    "description": "<p>Clear jwt cookie value</p>",
    "group": "Auth",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Cookie cleared</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/auth.route.js",
    "groupTitle": "Auth",
    "name": "GetAuthLogout"
  },
  {
    "type": "post",
    "url": "/auth/signin",
    "title": "",
    "description": "<p>Log in user account</p>",
    "group": "Auth",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>User email</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>User password</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user.gender",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "user.phone",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "user.age",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "user.createdAt",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "user.updatedAt",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<ul> <li>Bearer json web token</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>APIError</li> </ul>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<ul> <li>Error description</li> </ul>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>Error status code</li> </ul>"
          }
        ],
        "Unprocessable Entity 422": [
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "value",
            "description": "<ul> <li>Error value</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Error message</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "param",
            "description": "<ul> <li>Error parameter</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "location",
            "description": "<ul> <li>Error location</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthSignin"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "",
    "description": "<p>Create new user account</p>",
    "group": "Auth",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>User email</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>User name</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>User password</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<ul> <li>User phone</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<ul> <li>User age</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<ul> <li>User gender</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>This email is already taken</li> </ul>"
          }
        ],
        "Unprocessable Entity 422": [
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "value",
            "description": "<ul> <li>Error value</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Error message</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "param",
            "description": "<ul> <li>Error parameter</li> </ul>"
          },
          {
            "group": "Unprocessable Entity 422",
            "type": "Object[]",
            "optional": false,
            "field": "location",
            "description": "<ul> <li>Error location</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/auth.route.js",
    "groupTitle": "Auth",
    "name": "PostAuthSignup"
  },
  {
    "type": "get",
    "url": "/api/ble/device/:mac",
    "title": "",
    "description": "<p>Get device data with MAC address</p>",
    "group": "BLE",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mac",
            "description": "<ul> <li>MAC address to get device data</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result._id",
            "description": "<ul> <li>MongoDb object id</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result.macAdd",
            "description": "<ul> <li>Connecting MAC address of BLE</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result.serial",
            "description": "<ul> <li>Connecting serial of BLE</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String[]",
            "optional": false,
            "field": "result.connectionTime",
            "description": "<ul> <li>Connection time of connecting BLE device</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result.softwareRevision",
            "description": "<ul> <li>Connecting software revision of BLE</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "result.hardwareRevision",
            "description": "<ul> <li>Connecting hardware revision of BLE</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "result.createdAt",
            "description": "<ul> <li>Created time of data</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "result.updatedAt",
            "description": "<ul> <li>Last updated time of data</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "StatusMessage StatusCode": [
          {
            "group": "StatusMessage StatusCode",
            "type": "Type",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Description</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/ble.route.js",
    "groupTitle": "BLE",
    "name": "GetApiBleDeviceMac"
  },
  {
    "type": "get",
    "url": "/api/ble/mac",
    "title": "",
    "description": "<p>Get MAC address by spawning a shell command 'bluetoothctl'</p>",
    "name": "MAC_Addresses",
    "group": "BLE",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String[]",
            "optional": false,
            "field": "addresses",
            "description": "<ul> <li>MAC addresses received by spawning shell command</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/ble.route.js",
    "groupTitle": "BLE"
  },
  {
    "type": "get",
    "url": "/api/ble/start-python",
    "title": "",
    "description": "<p>Start python script</p>",
    "name": "Start_python",
    "group": "BLE",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Successful to start python and save device data</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Invalid MI Band 2 MAC address</li> </ul>"
          }
        ],
        "Internal  Server Error 500": [
          {
            "group": "Internal  Server Error 500",
            "optional": false,
            "field": "err",
            "description": "<ul> <li>Error starting python client script</li> </ul>"
          }
        ],
        "ERR_CONNECTION_REFUSED": [
          {
            "group": "ERR_CONNECTION_REFUSED",
            "optional": false,
            "field": "err",
            "description": "<ul> <li>Error when connection between server and BLE is down</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/ble.route.js",
    "groupTitle": "BLE"
  },
  {
    "type": "get",
    "url": "/api/data/warning/mail",
    "title": "",
    "description": "<p>Send mail to user whenever heart rate is out of the safety level</p>",
    "group": "Data",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Successfully send mail to user</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "uri",
            "description": "<ul> <li>RegExp(/https:/)</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/data.route.js",
    "groupTitle": "Data",
    "name": "GetApiDataWarningMail"
  },
  {
    "type": "get",
    "url": "/api/data/warning/sms",
    "title": "",
    "description": "<p>Send message to user whenever heart rate is out of the safety level</p>",
    "group": "Data",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Successfully send message to user</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/data.route.js",
    "groupTitle": "Data",
    "name": "GetApiDataWarningSms"
  },
  {
    "type": "get",
    "url": "/api/news",
    "title": "",
    "description": "<p>Get news health posts crawled</p>",
    "group": "News",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "href",
            "description": "<ul> <li>Link to the original post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "title",
            "description": "<ul> <li>Title of the post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "src",
            "description": "<ul> <li>Thumbnail of post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "alt",
            "description": "<ul> <li>Alternative link of thumbnail</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Crawl more data</li> </ul>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Error getting cached crawled data</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/news.route.js",
    "groupTitle": "News",
    "name": "GetApiNews"
  },
  {
    "type": "get",
    "url": "/api/news/date?date",
    "title": "",
    "description": "<p>Get news health post by date</p>",
    "group": "News",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "dd/mm/yyyy",
            "optional": false,
            "field": "date",
            "description": "<ul> <li>Date to get news health post</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<ul> <li>date to get news health posts</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "href",
            "description": "<ul> <li>Link to the original post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "title",
            "description": "<ul> <li>Title of the post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "src",
            "description": "<ul> <li>Thumbnail of post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "alt",
            "description": "<ul> <li>Alternative link of thumbnail</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/news.route.js",
    "groupTitle": "News",
    "name": "GetApiNewsDateDate"
  },
  {
    "type": "post",
    "url": "/api/news/crawl",
    "title": "",
    "description": "<p>Crawl data from baomoi.com for healthy news posts</p>",
    "group": "News",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "href",
            "description": "<ul> <li>Link to the original post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "title",
            "description": "<ul> <li>Title of the post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "src",
            "description": "<ul> <li>Thumbnail of post</li> </ul>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "alt",
            "description": "<ul> <li>Alternative link of thumbnail</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "INTERNAL_SERVER_ERROR 500": [
          {
            "group": "INTERNAL_SERVER_ERROR 500",
            "type": "String",
            "optional": false,
            "field": "error.msg",
            "description": "<ul> <li>Exceed Timeout</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/news.route.js",
    "groupTitle": "News",
    "name": "PostApiNewsCrawl"
  },
  {
    "type": "put",
    "url": "/api/news/crawl",
    "title": "",
    "description": "<p>Save crawled data to database</p>",
    "group": "News",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Successfully update news health posts data</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<ul> <li>Id of document</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "crawlerURI",
            "description": "<ul> <li>Crawled site</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "crawlDate",
            "description": "<ul> <li>Crawled date</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<ul> <li>Document created time</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<ul> <li>Document last updated time</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Object[]",
            "optional": false,
            "field": "href",
            "description": "<ul> <li>Link to the original post</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Object[]",
            "optional": false,
            "field": "title",
            "description": "<ul> <li>Title of the post</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Object[]",
            "optional": false,
            "field": "src",
            "description": "<ul> <li>Thumbnail of post</li> </ul>"
          },
          {
            "group": "Created 201",
            "type": "Object[]",
            "optional": false,
            "field": "alt",
            "description": "<ul> <li>Alternative link of thumbnail</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/news.route.js",
    "groupTitle": "News",
    "name": "PutApiNewsCrawl"
  },
  {
    "type": "delete",
    "url": "/api/user/all",
    "title": "",
    "description": "<p>Delete all user in database with role user</p>",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "deletedCount",
            "description": "<ul> <li>Number of account deleted</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Object",
            "optional": false,
            "field": "APIErorr",
            "description": "<ul> <li>Invalid user id</li> </ul>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "type": "String",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>No users found</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/user.route.js",
    "groupTitle": "User",
    "name": "DeleteApiUserAll"
  },
  {
    "type": "get",
    "url": "/api/user",
    "title": "",
    "description": "<p>Get current user</p>",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "type": "String",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/user.route.js",
    "groupTitle": "User",
    "name": "GetApiUser"
  },
  {
    "type": "get",
    "url": "/api/user/all",
    "title": "",
    "description": "<p>Get all users</p>",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "age",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "type": "String",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/user.route.js",
    "groupTitle": "User",
    "name": "GetApiUserAll"
  },
  {
    "type": "get",
    "url": "/api/user/id/:id",
    "title": "",
    "description": "<p>Get user by user id</p>",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Valid mongoose id</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": ""
          },
          {
            "group": "OK 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Object",
            "optional": false,
            "field": "APIError",
            "description": "<ul> <li>Invalid user id</li> </ul>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "type": "String",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ],
        "For Bidden 403": [
          {
            "group": "For Bidden 403",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>What are you trying to do?</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes/api/user.route.js",
    "groupTitle": "User",
    "name": "GetApiUserIdId"
  },
  {
    "type": "get",
    "url": "/",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/401",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "Get401"
  },
  {
    "type": "get",
    "url": "/403",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "Get403"
  },
  {
    "type": "get",
    "url": "/404",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "Get404"
  },
  {
    "type": "get",
    "url": "/ble",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "GetBle"
  },
  {
    "type": "get",
    "url": "/fag",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "GetFag"
  },
  {
    "type": "get",
    "url": "/news",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_fitness_tracker_src_api_routes_main_route_js",
    "name": "GetNews"
  }
] });
