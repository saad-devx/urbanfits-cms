import styles from '@/styles/Loader.module.css'
export default function BounceLoader() {
    return <div className="w-10 mx-2 md:mx-4 flex justify-around">
        <i className={styles.pl1__a}></i>
        <i className={styles.pl1__b}></i>
        <i className={styles.pl1__c}></i>
    </div>
}