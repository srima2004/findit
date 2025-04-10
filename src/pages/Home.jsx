import Navbar from "../components/Navbar"
import About from "../components/About";

function Home(){
    return (
      <main>
        <Navbar />
        <div className="particle-container">
       
        </div>
        <div className="hero">
          <h1>Find-It</h1>
          <a href="/find">
            <button>Find item</button>
          </a>
        </div>
        <About />
      </main>
    );
} 
export default Home; 