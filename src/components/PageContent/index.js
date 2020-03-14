/* import "MyProfile" from "./MyProfile";
import "MyGames" from "./MyGames"; */
import About from "./About";
/* import "Guide" from "./Guide";
import "Game" from "./Game";
import "Login" from "./Login";
import "Register" from "./Register"; */
import "components/PageContent.scss";


export default function PageContent(props) {
  return (
    { props.view === 3 && (
      <About
      />
    )}
  );
}