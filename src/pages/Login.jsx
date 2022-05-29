import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <div>
      <h2>Login 페이지 입니다.</h2>
      {/* LoginButton에  props를 넘겨줘야 해서 */}
      <LoginButton />
    </div>
  );
}
