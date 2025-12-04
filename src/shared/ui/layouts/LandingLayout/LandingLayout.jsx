import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import './LandingLayout.css';

export const LandingLayout = ({ children }) => {
  return (
    <div className="landing-layout">
      <Header />
      <main className="landing-layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};