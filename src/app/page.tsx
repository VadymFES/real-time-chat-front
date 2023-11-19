import styles from './page.module.css';
import AsidePannel from '../components/asidePannel/asidePannel';
import ChatMenu from '../components/chatMenu/chatMenu';
import MainContent from '../components/mainContent/mainContent';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Aside pannel */}
      <div className={styles.aside}>
        <AsidePannel />
      </div>
      
      {/* Chat Menu */}
      <div className={styles.chatMenu}>
        <ChatMenu />
      </div>
      
      {/* Main Chat Content */}
      <div className={styles.mainContent}>
        <MainContent />
      </div>
    </main>
  );
}
