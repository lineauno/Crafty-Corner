import React from 'react';
import About from './components/About';
import Skills from './components/Skills';
import PersonalInfo from './components/PersonalInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Student Profile Page</h1>
      </header>
      <main className="profile-container">
        
        {}
        <section className="profile-section">
          <About />
        </section>
        
        <section className="profile-section">
          <Skills />
        </section>
        
        <section className="profile-section">
          <PersonalInfo />
        </section>
        
      </main>
    </div>
  );
}

export default App;