# next.config.js.md

### 실행한 모드에 따라 다른 설정 적용

```js
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (phase) => {
  let nextconfig = {};

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    nextconfig = {
      compress: false,
      env: {
        customKey: "do-values",
        mongodb_username: "yoojacha",
        mongodb_password: "23456",
        mongodb_clustername: "cluster1",
        mongodb_database: "yoojacha_blog",
      },
    };
  }

  if (phase === PHASE_PRODUCTION_SERVER) {
    nextconfig = {
      compress: false,
      env: {
        customKey: "my-values",
        mongodb_username: "yoojacha",
        mongodb_password: "123456",
        mongodb_clustername: "cluster0",
        mongodb_database: "yoojacha_blog",
      },
    };
  }

  return nextconfig;
};
```

### Environment Variables

```js
module.exports = {
  env: {
    customValue: "my-value",
  },
};

function App() {
  return <h2>{process.env.customValue}</h2>;
}
```

### Base Path

```js
// url의 prefix 넣기
module.exports = {
  basePath: "/docs",
};
```

### Rewrites

```js
// Rewrites are applied to client-side routing (사용자에게만 보여줌)
// url이 이동하지만 안 이동하는 것처럼 보여지게 할 수 있음
// API KEY 숨기기 가능
// return의 key로 beforeFiles, afterFiles, fallback를 주어 동작 방식 설정 가능
module.exports = {
  async rewrites() {
    return [
      {
        source: `/api/drama`,
        destination: `http://api.moviedb.org/3/drama/popular?api_key=${process.env.API_KEY}}`,
      },
    ];
  },
};
```

### Redirects

```js
// 특정 URL 진입 시 다른 URL로 이동 시키는 것
module.exports = {
  async redirects() {
    return [
      {
        source: `/old-blog/:path*`,
        destination: `/new-blog/:path*`,
        permanent: false,
        // true시 클라이언트/검색 엔진이 리디렉션을 영구적으로 캐시하도록 지시하는 308 상태 코드를 사용
        // false시 임시 상태 코드로 캐시되지 않은 307 상태 코드를 사용
        basePath: false,
        locale: false,
        has: [
          {
            type: "header",
            key: "x-authorized",
            value: "(?<authorized>yes|true)",
          },
        ],
      },
    ];
  },
};

// Path Matching
// Wildcard Path Matching
// Regex Path Matching
// Header, Cookie, and Query Matching
// Redirects with basePath support
// Redirects with i18n support
```

### next.js의 routes 확인 순서

1. headers
2. redirects
3. beforeFiles
4. public directory, \_next/static files, non-dynamic pages
5. afterFiles
6. fallback

### Custom Headers

```js
module.exports = {
  async headers() {
    return [
      {
        source: "/about",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
          {
            key: "x-another-custom-header",
            value: "my other custom header value",
          },
        ],
      },
    ];
  },
};
```

### Compression

```js
// Next.js provides gzip compression to compress rendered content and static files.
module.exports = {
  compress: false,
};
```

### Disabling x-powered-by

```js
// X-Powered-By는 어떤 기술로 개발되었는 뜻을 가짐
// 보안상의 이유
module.exports = {
  poweredByHeader: false,
};
```

### Disabling HTTP Keep-Alive

```js

```

### Setting a custom build directory

```js

```

### Configuring onDemandEntries

```js

```

### Ignoring ESLint

```js

```

### Ignoring TypeScript Errors

```js

```

### exportPathMap

```js

```

### Trailing Slash

```js

```

### React Strict Mode

```js

```

### URL Imports

```js

```

### Build Indicator

```js

```

### 이미지 외부 소스 링크 설정

```js
module.exports = () => {
  return {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "dummyimage.com",
          port: "",
        },
      ],
    },
  };
};
```
