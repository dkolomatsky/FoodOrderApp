import headerLogo from "../assets/logo.jpg";
import Button from "./UI-items/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="a food site" />
        <h1>DK restaurant</h1>
      </div>
      <nav>
        <Button onlyText="true">Cart(0)</Button>
      </nav>
    </header>
  );
}
