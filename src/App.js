//import logo from './logo.svg';
import React, { useEffect, useRef, useState,Component } from 'react';
import './App.css';

import CoreBot from "./Components/CoreBot.js";



///call afther render
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  

  return position;
};

class App extends Component {



  constructor(props) {
    super(props);
    this.Cbot = React.createRef()

    this.state = {


    }
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CoreBot ref={this.Cbot} id="corebot" />
          <div>
            Version 0.1  <span className="tooltip">Gearless
              <span className="tooltiptext">
                Don't do much but can follow thecursor
              </span>

            </span>

       


          </div>
        </header>

      </div>

    );
  }
}


export default App;
