// withRouter를 사용하면 route에서 연결된 props를 다 넣어준다.
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// export default withRouter(function LoginButton(props) {
//   console.log(props);
//   function login() {
//     setTimeout(() => {
//       props.history.push("/");
//     }, 1000);
//   }
//   return <button onClick={login}>로그인하기</button>;
// });

export default function LoginButton(props) {
  const history = useHistory();
  function login() {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }
  return <button onClick={login}>로그인하기</button>;
}
