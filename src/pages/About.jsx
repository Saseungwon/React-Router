import queryString from "query-string";

export default function About(props) {
  // localhost:3000/about?name=mark
  // 위 url에서 name이 mark 인 것을 가져오기

  // 방법1 : URLSearchParams 사용

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

  //
  // 방법2 : queryString 사용
  const query = queryString.parse(searchParams);
  console.log(query);
  return (
    <div>
      <h2>About 페이지 입니다.</h2>
      {query.name && <p>name 은 {query.name} 입니다.</p>}
    </div>
  );
}
