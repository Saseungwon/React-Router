import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Links from "./components/Links";
import NavLinks from "./components/NavLinks";
import Login from "./pages/Login";
import { Redirect } from "react-router-dom";

const isLogin = false;

function App() {
  // Route 컴포넌트에 path와 컴포넌트를 설정하여 나열해준다.
  // BrowserRouter로 Route 들을 감싸준다.
  // 브라우저에서 요청한 경로에 Route의 Path가 들어있으면 해당 component를 보여준다.

  // exact를 추가적으로 사용해서 완전히 똑같은 path와 url이어야 매칭되게 해줌
  return (
    <BrowserRouter>
      {/* a 태그가 아니라 Link to로 화면 이동하기... 로딩표시 X 새로운 파일다운 X, 페이지 이동 더 효율적으로 가능 */}
      {/* Links.jsx를 가져와서 랜더링만 해주면 됨 */}
      <Links />
      {/* Switch 사용해 url 맞는 게 없으면 not found로, 가장 넓은 경로를 맨 밑으로 -> 루트경로는 맨밑 */}
      <NavLinks />
      <Switch>
        <Route
          path="/login"
          render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
        />
        <Route path="/login" component={Login} />
        {/* id 받아서 사용가능 */}
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={Home} />
        {/* 다 찾지 못했을 때 여기로 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
