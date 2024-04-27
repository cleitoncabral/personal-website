import styles from './loading.module.css'
export default function Loading () {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      <h3>Carregando...</h3>
    </div>
  )
}