import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaLetterboxd, FaSquareGithub, FaSquareLetterboxd } from "react-icons/fa6";
import styles from './footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <a target="_blank" href="https://github.com/cleitoncabral"><FaSquareGithub size='25px' /></a>
      <a target="_blank" href="https://www.linkedin.com/in/cleiton-cabral-5a577115a/"><FaLinkedin size='25px' /></a>
      <a target="_blank" href="https://letterboxd.com/cleitons/"><FaSquareLetterboxd size='25px' /></a>
    </footer>
  )
}