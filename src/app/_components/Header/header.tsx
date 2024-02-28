import Link from "next/link";
import styles from "./Header.module.css";
import Container from "../Container/container";
import Image from "next/image";

const Header = () => {
  return (
    <Container>
      <div className={styles.horizontalMenu}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginTop: "8px",
          }}
        >
          <Link href="/">
            <Image
              src={`/logo.png`}
              style={{ display: "block" }}
              alt="Logo"
              width="24"
              height="40"
            />
          </Link>
        </div>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            paddingLeft: "30%",
            marginTop: "16px",
            paddingRight: "16px",
          }}
        >
          <li>
            <Link href="/notes">Notes</Link>
          </li>
          <li>
            <Link href="/writings">Writings</Link>
          </li>
          <li>
            <Link href="/logs">Logs</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <Image
          src={`/toggle.png`}
          style={{ display: "block", marginTop: "10px" }}
          alt="Toggle"
          width="24"
          height="40"
        />
      </div>
    </Container>
  );
};

export default Header;
