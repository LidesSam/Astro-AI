import React, { Component} from 'react';
import '../App.css';
import './Styles/RobotStyle.css';
//import GearP from './GearProgram.js';

import glassImg from "../images/bots/V1O/glass.svg"
import headImg from "../images/bots/V1O/head.svg"
import eyeImg from "../images/bots/V1O/m-eye.svg"
//simple teplate to create react components fast.

//import utility from './Util.js';






class CoreBot extends Component {
    
    constructor(props) {
        super(props);
        this.timer = 0;
        this.state = {
            time: new Date(),
            gears: [],
            doLookNow:false,
            stamina: 40,
            eyeXtranslate:"0%",
            eyeYtranslate:"-50%",
            ticks:0,
            onReturn:false,
            botState:"recover",
            lookin:false
            

            /**
           *   example props set
           *    id: props.id,
            value: props.value,
            callback: props.callback,
            callbackEdit: props.callbackEdit,
            checked: props.checked,

            inEdit: false
            */

        }
      // setInterval(this.LookAt(50,50), 1000)

    }

    /**
     * Cnponent will
     */
    componentWillMount(){
        // set up timer
        this.timer = setTimeout(() => {
            var ntick=this.state.ticks+1
            if (ntick>=10){ntick-=10}
            this.setState({
                time: new Date(),
                ticks:ntick
            });
            if(this.state.stamina<100){
                if(this.state.botState==="wait" || this.state.botState==="recover"){
                    let updateStamina = this.state.stamina+2;
                    this.setState({stamina:updateStamina});
                }
                if(this.state.botState==="looking"){
                    let updateStamina = this.state.stamina-5;
                    this.setState({stamina:updateStamina});
                }
            }
            this.stateControl();
            this.componentWillMount();
        }
        , Math.floor(Date.now() / 1000) * 1000 + 1000 - Date.now());
    }

    componentWillUnmount(){
        // remove timer
        clearTimeout(this.timer);
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar las props):
        if (this.props.eyeXtranslate !== prevProps.eyeXtranslate) {
          this.fetchData(this.props.eyeXtranslate );
        }
        if (this.props.eyeYtranslate !== prevProps.eyeYtranslate) {
            this.fetchData(this.props.eyeYtranslate );
          }
      }

    CalculateAngle(centerX,centerY,pointX,pointY){
        var deltaX = centerX-pointX
        var deltaY = centerY-pointY
        var AngDeg = Math.atan(deltaX,deltaY)

        return AngDeg;
        
    }
 
/**Mouseee events}
 * 
 */

  
    //=(e)=>
    onMouseMove = (e) =>{
        //container data// Bot interface 
        if(this.state.botState==="wait"){
            this.setState({botState:"looking"})
        }
        if(this.state.botState==="looking"){
            let bi = document.getElementById("botInt")
            let cont={
                x:bi.offsetLeft,
                y:bi.offsetTop,
                width:bi.offsetWidth,
                height:bi.offsetHeight
            }
            let factor=0.9;
            let px=e.clientX - cont.x;
            px = Math.round(((px/cont.width*100)-100)*factor).toString()+"%"
            let py=e.clientY - cont.y;
            py = Math.round(((py/cont.width*100)-100)*factor).toString()+"%"
           
            console.log("px:"+px+" py:"+py)
        
            this.setState(
                {
            eyeXtranslate:px,
            eyeYtranslate:py
            })
        }
    }
    onMouseLeave=()=>
    {
        this.setState(
            {
        onReturn:true,
         eyeXtranslate:"-50%",
         eyeYtranslate:"-50%"
        })
    } 

    stateControl(){
        switch(this.state.botState){
            case "wait":break;
            case "looking":
                if(this.state.stamina<=0){
                    this.setState({
                        botState:"recover"
                    })
                }
                break;
            case "recover":
                if(this.state.stamina>=50){
                    this.setState({
                        botState:"wait"
                    })
                }
                break;
            default:
                this.setState({
                    botState:"wait"
                })
        }
    }
    //return render(used to draw in parent)
    //if the only function nesesary for  a componet too be valid.
    render() {

        
        return (
            // at least have to contain a div
            <div id="botInt" className="BotInterface"  onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
               
                <div className="HeadBot">
                    <div className="head">
                        <img src={headImg} alt=""></img>
                        <img src={glassImg} alt=""></img>
                        <img className="eye" style={{transform: 'translate('+this.state.eyeXtranslate+','+this.state.eyeYtranslate+')'}} src={eyeImg} alt=""></img>
                        
                    </div>
                  
                </div> 

                <div className="infobox" style = {{width:" 320px"}}>
                    <div>
                      :<span> px:{this.state.eyeXtranslate}</span><span>  py:{this.state.eyeYtranslate}</span>
                       
                    <br/>
                    <hr/>
                      :<span> date-time:{this.state.ticks}</span>
                      <br/>
                    <hr/>
                      :<span> energy:{this.state.stamina}</span>
                      <br/>
                    <hr/>
                      :<span> botState:{this.state.botState}</span>
                   </div>
                </div>
            </div>
   

        )
    }


}

export default CoreBot;
