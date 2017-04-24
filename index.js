import React from 'react';
import ReactDOM from 'react-dom';
var moment = require('moment');
import InputRange from 'react-input-range';
import Network from './Network/Network'
var max = 1000;
var min = 100;
var graphWidth = 1300;
var bandwiths = [100,200,300,400,500,600,700,800,900,1000]
import {data,zoomData} from './data'
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      zoom:true,
      bwSliderValue:100
    }
  }
  componentDidMount(){
    this.getData.bind(this)
  }
  getData(){

  }
  zoom(){

    this.setState({
      zoom:!this.state.zoom
    })
  }
  leftSliderChange(value){
    this.setState({
      bwSliderValue:value,
    })
  }
  bottomSliderChange(values){
    this.setState({
      ...values
    })
  }
  render() {
    return(<div style={{width:'100%',height:'100vh',overflow:'auto'}}>
		<div style={{width:'100%',height:1000}}>
		<Network/>
		</div>
      <div style={{width:this.props.graphWidth}}>

        {this.state.zoom
        ?
          <ZoomedChart toggleZoom={this.zoom.bind(this)} bwSliderValue={this.state.bwSliderValue} {...this.state} leftSliderChange={this.leftSliderChange.bind(this)} bottomSliderChange={this.bottomSliderChange.bind(this)} {...this.props} height={300}/>
        :
        <Chart toggleZoom={this.zoom.bind(this)} bwSliderValue={this.state.bwSliderValue} {...this.state} leftSliderChange={this.leftSliderChange.bind(this)} bottomSliderChange={this.bottomSliderChange.bind(this)} {...this.props} height={300}/>}
        </div>
      </div>)
  }
}
class Chart extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      values: {
        min: 1,
        max: 72,
      },
    };
  }

  handleValuesChange(component, values) {
    this.props.bottomSliderChange(values)
    this.setState({
      values: values,
    });
  }
 handleValueChange(component, value) {
    this.setState({
      value: value,
    });
  }
  changeLeftSlider(e){
  this.props.leftSliderChange(e.target.value)


}
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
{/*Input Range*/}
        <div style={{position:'absolute',width:'100%',bottom:0}}>
                <form style={{  position: 'absolute',
bottom:80,left:-170,
   transform: 'rotate(270deg)'}} className="form">
    {/*  <input type="range"  min="0" max="100" value="40"/>
*/}
        <input style={{height:0,width:200}} onChange={this.changeLeftSlider.bind(this)} min={100} max={1000} step="100" type="range" className="vert"  />

                            </form>
    </div>
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
             var isInRange = false;
            var whatColor;
            if(i+1 > this.props.min && i+1 < this.props.max){
              whatColor = 'tomato'
              isInRange = true
            }else if(i+1 == this.props.max || i+1 == this.props.min){
               isInRange = true
              whatColor = 'tomato'
            }else{
              whatColor = '#bebee1'
            }
             var howManyCells = bandwith / 100


              return(
            <Column isInRange={isInRange} {...this.state} {...this.props} whatColor={whatColor} howManyCells={howManyCells} key={i} bandwith={bandwith} />
          )

        })}
        </div>
        </div>
        {/*Input Range*/}
        <div style={{position:'absolute',width:'100%',bottom:-100}}>
                <form className="form">

         <InputRange
            maxValue={72}
            minValue={1}
            value={this.state.values}
            onChange={this.handleValuesChange.bind(this)}
          />
                            </form>
														</div>
        <div style={{display:'flex',width:'100%',position:'absolute',bottom:-150,textAlign:'center'}}>
          <div style={{margin:'auto',display:'flex',flexDirection:'row',alignItems:'center',alignContent:'center'}}><h4>Nov 27th-30th</h4>&nbsp;&nbsp;<div className="fa fa-2x fa-calendar"></div></div>
          <div>
         <button onClick={this.props.toggleZoom} className="btn btn-primary">Zoom</button>
            &nbsp;
            <button className="btn btn-success">Submit</button>
         </div>
				 </div>
            {/* X Axis */}
            <div style={{textAlign:'center',display:'flex',width:'100%',position:'absolute',bottom:-40}}>
            {dates.map((date,k) =>{
              return(
                <div key={k} style={{transform:'rotate(90deg)',display:'flex',flexDirection:'column',flex:1,width:this.props.graphWidth / dates.length}}>
                <div style={{flex:1}} >{moment(date).format('h')}&nbsp;{moment(date).format('a')}</div>
                </div>
              )
            })}
            </div>

      </div>
      </div>
    );
  }
}
class Column extends React.Component {
  constructor(props){
    super(props)
  }
  render() {

    var cells = [];
    for(var i = 0; i <= this.props.howManyCells; i++){
      cells.push(<Cell bwSliderValue={this.props.bwSliderValue} cellNumber={i} {...this.props} key={i}/>)
    }
    return <div style={{marginTop:'auto',zIndex:19,height:this.props.bandwith / 5,width:'100%',background:this.props.whatColor,display:'flex',flexDirection:'column-reverse'}}>

    {cells}
    </div>
       }
}
class Cell extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var background
     if(this.props.cellNumber < this.props.bwSliderValue / 100){
              if(this.props.isInRange){
                background = 'green';
              }else{
                background= this.props.whatColor
              }

       }else{
                background= this.props.whatColor
              }


    return <div  style={{background,flex:'0 0 20px'}}></div>
       }
}
class ZoomedChart extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      values: {
        min: 1,
        max: 25,
      },
    };
  }

  handleValuesChange(component, values) {
    this.props.bottomSliderChange(values)
    this.setState({
      values: values,
    });
  }
 handleValueChange(component, value) {
    this.setState({
      value: value,
    });
  }
changeLeftSlider(e){
  this.props.leftSliderChange(e.target.value)


}

  render() {
    var dates = []
    var bandwiths = []
    this.props.zoomData.map( (obj,i) =>{
      dates.push(obj.date)
  bandwiths.push(obj.bandwiths)
    })

    return (
      <div style={{zIndex:9,position:'relative',marginLeft:100,width:this.props.graphWidth,height:this.props.height}}>
      <div style={{width:'100%',height:'100%',position:'relative'}}>
{/*Input Range*/}
        <div style={{position:'absolute',width:'100%',bottom:0}}>
                <form style={{  position: 'absolute',
bottom:80,left:-170,
   transform: 'rotate(270deg)'}} className="form">
    {/*  <input type="range"  min="0" max="100" value="40"/>
*/}
        <input style={{height:0,width:200}} onChange={this.changeLeftSlider.bind(this)} min={100} max={1000} step="100" type="range" className="vert"  />

                            </form>
    </div>
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
            var isInRange = false;
            var whatColor;
            if(i+1 > this.props.min && i+1 < this.props.max){
              whatColor = 'tomato'
              isInRange = true
            }else if(i+1 == this.props.max || i+1 == this.props.min){
               isInRange = true
              whatColor = 'tomato'
            }else{
              whatColor = '#bebee1'
            }
             var howManyCells = bandwith / 100


              return(
            <Column isInRange={isInRange} {...this.state} {...this.props} whatColor={whatColor} howManyCells={howManyCells} key={i} bandwith={bandwith} />
          )

        })}
        </div>
        </div>
        {/*Input Range*/}
        <div style={{position:'absolute',width:'100%',bottom:-70}}>
                <form className="form">

         <InputRange
            maxValue={25}
            minValue={1}
            value={this.state.values}
            onChange={this.handleValuesChange.bind(this)}
          />
                            </form>
</div>
       <div style={{display:'flex',width:'100%',position:'absolute',bottom:-120,textAlign:'center'}}>
          <div style={{margin:'auto',display:'flex',flexDirection:'row',alignItems:'center',alignContent:'center'}}><h4>Nov 27th</h4>&nbsp;&nbsp;<div className="fa fa-2x fa-calendar"></div></div>
         <div>
         <button onClick={this.props.toggleZoom} className="btn btn-primary">Zoom</button>
           &nbsp;
           <button className="btn btn-success">Submit</button>
         </div>
</div>
            {/* X Axis */}
            <div style={{display:'flex',width:'100%',position:'absolute',bottom:-40}}>

            {dates.map((date,k) =>{
              return(
          <div key={k} style={{textAlign:'center',display:'flex',flexDirection:'column',flex:1}}>
                <div style={{flex:1}} >{moment(date).format('h:mm')}</div>
                <div style={{flex:1,color:'grey'}} key={k}>{moment(date).format('a')}</div>
                </div>
              )
            })}

            </div>

      </div>
      </div>
    );
  }
}
/*
 * Render the above component into the div#app
 */
ReactDOM.render(<Application graphWidth={graphWidth} bandwiths={bandwiths} zoomData={zoomData} data={data} />, document.getElementById('root'));
