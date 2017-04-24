import React, { Component } from 'react';
import moment from 'moment';
import Draggable from 'react-draggable'; // The default

class Chart extends Component  {
  render() {
    var dates = []
    var bandwiths = []
    this.props.data.map( (obj,i) =>{
      dates.push(obj.date)
  bandwiths.push(obj.bandwiths)
    })

    return (
      <div style={{zIndex:9,position:'relative',marginLeft:100,width:this.props.graphWidth,height:this.props.height}}>
      <div style={{width:'100%',height:'100%',position:'relative'}}>

        {/* Y Axis */}
        <div style={{display:'flex',flexDirection:'column-reverse',position:'absolute',left:-50,bottom:0}}>
        {this.props.bandwiths.map((bandwith,i) =>{
          return(
            <div style={{height:20}} key={i}>{bandwith}</div>
          )
        })}
        </div>
            {/* Bars  */}
        <div style={{position:'absolute',bottom:0,zIndex:19,width:'100%'}}>
        <div style={{display:'flex',zIndex:19}}>
        {bandwiths.map((bandwith,i) =>{
          return(
            <div style={{marginTop:'auto',zIndex:19,height:bandwith / 5,width:'100%',flex:1,background:'blue'}} key={i}></div>
          )
        })}
       </div>
       


        

       
     <Draggable
       axis="x"
       handle=".handle"
       defaultPosition={{x: 0, y: 0}}
       position={null}
       grid={[25, 25]}
       zIndex={100}
       onStart={this.handleStart}
       onDrag={this.handleDrag}
       onStop={this.handleStop}>
       <div>
         <div className="handle">Drag from here</div>
         <div>This readme is really dragging on...</div>
       </div>
     </Draggable>
            {/* X Axis */}
            <div style={{display:'flex',width:'100%',position:'absolute',bottom:-20}}>
            {dates.map((date,k) =>{
              return(
                <div style={{flex:1}} key={k}>{moment(date).format('MMM Do YYYY, h:mm a')}</div>
              )
            })}
            </div>
      </div>
      </div>
    );
  }
}
export default Chart;
