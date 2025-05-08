import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Herosection';
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import { SignIn } from './components/Signin';
import { SignUp } from './components/SignUp';
import { HowItWorks } from './components/HowitWorks';
import FAQSection from './components/FAQs';
import { motion, AnimatePresence } from 'motion/react';
import { ChatContainer } from './components/Chat/ChatContainer';
import { NewHero } from './components/NewHero';
import { FileUpload } from './components/FileUpload';

export type AuthMode = 'signin' | 'signup' | null;

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  return (
    <div className="relative">
      <Navbar onGetStarted={() => setAuthMode('signin')} />
      <div className={authMode ? 'blur-sm' : ''} >
        <NewHero />
        <HowItWorks />
        <div className="bg-black">
          <Pricing />
          <FAQSection />
        </div>
        <Footer />
      </div>

      <AnimatePresence>
        {authMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setAuthMode(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="w-full max-w-md px-4" onClick={(e) => e.stopPropagation()}>
                {authMode === 'signin' ? (
                  <SignIn onSignUp={() => setAuthMode('signup')} onClose={() => setAuthMode(null)} />
                ) : (
                  <SignUp onSignIn={() => setAuthMode('signin')} onClose={() => setAuthMode(null)} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

    // <div className="min-h-screen">
    //   <ChatContainer />
    // </div>
    // <FileUpload/>
 
  );
}

export default App;