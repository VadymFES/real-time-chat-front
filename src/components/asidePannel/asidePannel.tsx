import styles from './asidePannel.module.css';


interface AsidePanelProps {
  // props
}

const AsidePannel: React.FC<AsidePanelProps> = () => {
  return (
    <div className={styles.asidePannel}>
      <div className={styles.asidePannelContent}>

        <button className={styles.userAvatar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.95262 20.6192C7.20286 19.369 8.89856 18.6666 10.6667 18.6666H21.3333C23.1014 18.6666 24.7971 19.369 26.0474 20.6192C27.2976 21.8695 28 23.5652 28 25.3333V28C28 28.7363 27.403 29.3333 26.6667 29.3333C25.9303 29.3333 25.3333 28.7363 25.3333 28V25.3333C25.3333 24.2724 24.9119 23.255 24.1618 22.5049C23.4116 21.7547 22.3942 21.3333 21.3333 21.3333H10.6667C9.6058 21.3333 8.58839 21.7547 7.83824 22.5049C7.08809 23.255 6.66667 24.2724 6.66667 25.3333V28C6.66667 28.7363 6.06971 29.3333 5.33333 29.3333C4.59695 29.3333 4 28.7363 4 28V25.3333C4 23.5652 4.70238 21.8695 5.95262 20.6192Z" fill="#12229D" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16 5.33329C13.7909 5.33329 12 7.12415 12 9.33329C12 11.5424 13.7909 13.3333 16 13.3333C18.2091 13.3333 20 11.5424 20 9.33329C20 7.12415 18.2091 5.33329 16 5.33329ZM9.33333 9.33329C9.33333 5.65139 12.3181 2.66663 16 2.66663C19.6819 2.66663 22.6667 5.65139 22.6667 9.33329C22.6667 13.0152 19.6819 16 16 16C12.3181 16 9.33333 13.0152 9.33333 9.33329Z" fill="#12229D" />
          </svg>
        </button>


        <span className={styles.vectorDevider}>
          <svg xmlns="http://www.w3.org/2000/svg" width="82" height="2" viewBox="0 0 82 2" fill="none">
            <path d="M80.5 2C81.0523 2 81.5 1.55228 81.5 1C81.5 0.447715 81.0523 0 80.5 0V2ZM0.5 2L80.5 2V0L0.5 0L0.5 2Z" fill="#233DFF" />
          </svg>
        </span>

        <button className={styles.userAvatarActive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.16669 2.66671C3.16669 1.93033 3.76364 1.33337 4.50002 1.33337H28.5C29.2364 1.33337 29.8334 1.93033 29.8334 2.66671V18.6667C29.8334 19.0203 29.6929 19.3595 29.4428 19.6095L24.1095 24.9429C23.8594 25.1929 23.5203 25.3334 23.1667 25.3334H17.0523L12.1095 30.2762C11.7282 30.6575 11.1547 30.7716 10.6564 30.5652C10.1582 30.3588 9.83335 29.8727 9.83335 29.3334V25.3334H4.50002C3.76364 25.3334 3.16669 24.7364 3.16669 24V2.66671ZM5.83335 4.00004V22.6667H11.1667C11.9031 22.6667 12.5 23.2637 12.5 24V26.1144L15.5572 23.0572C15.8073 22.8072 16.1464 22.6667 16.5 22.6667H22.6144L27.1667 18.1144V4.00004H5.83335ZM15.1667 8.00004C15.9031 8.00004 16.5 8.59699 16.5 9.33337V14.6667C16.5 15.4031 15.9031 16 15.1667 16C14.4303 16 13.8334 15.4031 13.8334 14.6667V9.33337C13.8334 8.59699 14.4303 8.00004 15.1667 8.00004ZM21.8334 8.00004C22.5697 8.00004 23.1667 8.59699 23.1667 9.33337V14.6667C23.1667 15.4031 22.5697 16 21.8334 16C21.097 16 20.5 15.4031 20.5 14.6667V9.33337C20.5 8.59699 21.097 8.00004 21.8334 8.00004Z" fill="#233DFF" />
          </svg>
        </button>


        <button className={styles.userAvatar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M12.5 5V19" stroke="#233DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 12H19.5" stroke="#233DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default AsidePannel;