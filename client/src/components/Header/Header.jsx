import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
           <h2>Welcome to superhero manager!</h2> 
        </header>
    );
}

export default Header;