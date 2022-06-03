## React Router

#### SPA 라우팅 과정 (Single Page Application)

1. 브라우저에서 최초에 / 경로로 요청을 하면
2. React Web App을 내려준다.
3. 내려받은 React App에서 / 경로에 맞는 컴포넌트를 보여준다.
4. React App에서 다른 페이지로 이동하는 동작을 수행하면
5. 새로운 경로에 맞는 컴포넌트를 보여준다.

- 설치

  ```bash
  npm i react-router-dom
  ```

- cra에 기본 내장된 패키지 아니다.
- react-router-dom은 facebook의 공식 패키지는 아니다.
- 가장 대표적인 라우팅 패키지

App.js

```js
function App() {
  // Route 컴포넌트에 path와 컴포넌트를 설정하여 나열해준다.
  // BrowserRouter로 Route 들을 감싸준다.
  // 브라우저에서 요청한 경로에 Route의 Path가 들어있으면 해당 component를 보여준다.

  // exact를 추가적으로 사용해서 완전히 똑같은 path와 url이어야 매칭되게 해줌
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}
```

Home.jsx

```jsx
export default function Home() {
  return <div>Home 페이지 입니다.</div>;
}
```

#### Dynamic Routing1 (동적 라우팅)

- 주소창에 profile 뒤 id를 받아서 사용 가능

App.js

```js
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      // 이렇게 :id 같이 받아서 사용할 수 있다.
      <Route path="/profile/:id" component={Profile} />
    </BrowserRouter>
  );
}
```

Profile.jsx

```jsx
export default function Profile(props) {
  const id = props.match.params.id;
  console.log(id, typeof id);
  return (
    <div>
      <h2>Profile 페이지 입니다.</h2>
      {id && <p>id 는 {id}입니다.</p>}
      {/* id가 있으면? 출력 */}
    </div>
  );
}
```

#### Dynamic Routing1 (동적 라우팅)

localhost:3000/about?name=mark
위 url에서 name이 mark 인 것을 가져오기

- 방법 1 : URLSearchParams 사용

  ```jsx
  export default function About(props) {
    // localhost:3000/about?name=mark
    // 위 url에서 name이 mark 인 것을 가져오기
    console.log(props);
    /*
    props :
    {history: {…}, location: {…}, match: {…}, staticContext: undefined}
    history: {length: 8, action: 'POP', location: {…}, createHref: ƒ, push: ƒ, …}
    location: {pathname: '/about', search: '?name=mark', hash: '', state: undefined}
    match: {path: '/about', url: '/about', isExact: true, params: {…}}
    */
    const searchParams = props.location.search;
    console.log(searchParams);
    // URLSearchParams는 내장객체라 그냥 쓰면 됨
    const obj = new URLSearchParams(searchParams);
    console.log(obj); //          |?name=mark
    // .get으로 "프로퍼티" 이름으로 그냥 사용하면 됨
    console.log(obj.get("name")); // mark

    return <div>About 페이지 입니다.</div>;
  }
  ```

- 방법2 : queryString import해서 사용

  ```jsx
  // 방법2 : queryString 사용
  const query = queryString.parse(searchParams);
  console.log(query);
  return (
    <div>
      <h2>About 페이지 입니다.</h2>
      {query.name && <p>name 은 {query.name} 입니다.</p>}
    </div>
  );
  ```

#### Switch와 NotFound

React Route에서 제공하는 Swicth 컴포넌트를 이용해 NotFound를 처리하는 방법

- 여러 Route 중 순서대로 먼저 맞는 하나만 보여준다.
- exact를 뺄 수 있는 로직을 만들 수 있다.
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트를 설정해서, Not Found 페이지를 만들 수 있다.

```js
<BrowserRouter>
  {/* Switch 사용해 url 맞는 게 없으면 not found로, 가장 넓은 경로를 맨 밑으로 -> 루트경로는 맨밑 */}
  <Switch>
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    <Route path="/" exact component={Home} />
    {/* 다 찾지 못했을 때 여기로 */}
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```

#### JSX 링크로 라우팅 이동하기

1. Link로 하는 방법
   Link 라고 하는 react-router-dom으로 라우팅 이동 가능
   a태그를 사용하지는 않았지만 실제로 돌아갈 때는 a태그로 들어간다.
   서버에서 이동하는 게 아니라 클라이언트 사이드에서만 뷰를 전환할 수 있도록 해줘서 속도가 빠르다.

- Links.jsx

```jsx
// react-router-dom 에서 import 해서 사용
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/profile/1">Profile/1</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/about?name=mark">About?name=mark</Link>
      </li>
    </ul>
  );
}
```

- App.js

```js
<BrowserRouter>
  {/* a 태그가 아니라 Link to로 화면 이동하기... 로딩표시 X 새로운 파일다운 X, 페이지 이동 더 효율적으로 가능 */}
  {/* Links.jsx를 가져와서 랜더링만 해주면 됨 */}
  <Links />
  <Switch>
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```

2. navigation Link로 하는 방법

import {NavLink} from 'react-router-dom';
activeClassName, activeStyle 처럼 active 상태에 대한 스타일 지정 가능
Route의 path처럼 동작하기 때문에 exact가 있다.

- NavLinks.jsx

```jsx
export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink to="/" exact activeStyle={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" exact activeStyle={activeStyle}>
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile/1" activeStyle={activeStyle}>
          Profile/1
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          activeStyle={activeStyle}
          isActive={(match, location) => {
            console.log(match, location);
            return match !== null && location.search === "";
          }}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about?name=mark"
          activeStyle={activeStyle}
          isActive={(match, location) => {
            return location.search === "?name=mark";
          }}
        >
          About?name=mark
        </NavLink>
      </li>
    </ul>
  );
}
```

- App.js

```js
<BrowserRouter>
  <Links />
  // Navlinks 랜더링
  <NavLinks />
  <Switch>
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    <Route path="/" exact component={Home} />
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```

#### JS로 라우팅 이동하기

react-router-dom에서 제공하는 withRouter 컴포넌트를 사용해서 하위 route에서 사용할 props를 담아줄 수 있다.

- LoginButton.jsx

```jsx
// withRouter를 사용하면 route에서 연결된 props를 다 넣어준다.
import { withRouter } from "react-router-dom";

// withRouter에 function을 넣어서 사용
export default withRouter(function LoginButton(props) {
  console.log(props);
  function login() {
    setTimeout(() => {
      props.history.push("/");
    }, 1000);
  }
  return <button onClick={login}>로그인하기</button>;
});
```

#### Redirect 컴포넌트

- <Redirect />
  to로 지정된 경로로 Redirect 됨

```jsx
import { Redirect } from "react-router-dom";

//jsx
<Redirect to="/" />;
```

```js
<Route
  path="/login"
  render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
/>
```

<br>

#### React Router Hook
