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
    {/* id 받아서 사용가능 */}
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    <Route path="/" exact component={Home} />
    {/* 다 찾지 못했을 때 여기로 */}
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```
