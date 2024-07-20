import { TextField } from '@mui/material'
import './App.css'
import Button from '@mui/material/button'
import { useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer";

function App() {
  const [weight,setWeight] = useState(0)
  const [height,setHeight] = useState(0)
  const [bmi,setBmi] = useState(0)
  const [desc,setDesc] = useState("")
  const [isWeight,setIsWeight] = useState(true)
  const [isHeight,setIsHeight] = useState(true)



  const validate = (e)=>{
    const name = e.target.name
    const value = e.target.value
    // console.log(name,value);
    // console.log(!!value.match('/^[0-9]*$/'));
    if(!!value.match(/^[0-9]*$/)){
      if(name=='weight'){
        setWeight(value)
        setIsWeight(true)
      }
      else{
        setHeight(value)
        setIsHeight(true)
      }
    }
    else{
      if(name=='weight'){
        setWeight(value)
        setIsWeight(false)
      }
      else{
        setHeight(value)
        setIsHeight(false)
      }    
    }
  }

  const handleReset = ()=>{
    setWeight(0)
    setHeight(0)
    setIsWeight(true)
    setIsHeight(true)
    setBmi(0)
    setDesc('')
  }

  const handleCalculate = (e)=>{
    e.preventDefault()
    if(weight==""||height==""){
      alert('Please fill the data')
    }
    else{
      let bmiFormula=(weight/((height/100)*(height/100)));
      setBmi(bmiFormula.toFixed(2))
      if(bmi <= 18.5){
        setDesc("Underweight")
      }
      else if (bmi < 25){
        setDesc("Healthy")
      }
      else if (bmi < 30){
        setDesc("Overweight")
      }
      else{
        setDesc("Obese")
      }
    }
    
  }

  return (
    <>
    <div className="row w-100 mt-2">
    <div className="col-md-4"></div>
    <div className="col-md-4" style={{justifyContent:'center'}}>
    <div className="container rounded" style={{justifyContent:'center'}}>
        <div className="input">
        <h1 className='text-center' style={{fontWeight:'700'}}>BMI Calculator</h1>
          <form className='form-control' onSubmit={handleCalculate}>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}} className="my-4">
              <label ><h6 style={{fontWeight:'700'}}>Weight (kg)</h6></label>
              <input type="text" placeholder='0kg' onChange={(e)=>validate(e)} name='weight' value={weight||""}/>
              {!isWeight && <i class="fa-solid fa-triangle-exclamation" style={{fontSize:'1.5rem',margin:'10px',color:'crimson'}}></i>}
            </div>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <label ><h6 style={{fontWeight:'700'}}>Height (cm)</h6></label>
              <input type="text" placeholder='0cm' onChange={(e)=>validate(e)} name='height' value={height||""}/>
              {!isHeight && <i class="fa-solid fa-triangle-exclamation" style={{fontSize:'1.5rem',margin:'10px',color:'crimson'}}></i>}

            </div>
            <div className="button m-4" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="row" style={{display:'flex'}}>
            <div className="col-md-6" ><button id='calc' type='submit' disabled={isHeight && isHeight?false:true} >calculate</button></div>
            <div className="col-md-6" ><button id='reset' type='reset' onClick={handleReset}>Reset</button></div>
          </div>
          </div>
          </form>
        </div>
        <div className="view text-center" style={{justifyContent:'center'}}>
          <h6>Your <b>BMI</b> is:</h6>
          <div id="disp">
            <h1 style={{fontSize:'4rem',fontWeight:'700'}} id="bmi">{bmi}</h1>
            <h6>you are <b>{desc}</b></h6>
          </div>
          <div className="speed mt-4" style={{height:'200px'}}>
          <ReactSpeedometer
              width={300}
              needleHeightRatio={0.65}
              value={bmi}
              segments={4}
              customSegmentStops={[0, 18, 25, 30, 58]}
              minValue={0}
              maxValue={58}
              currentValueText="BMI"
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={"#000000"}
              textColor={"#000000"}
              segmentColors={[
                "orange","green","lightcoral","crimson"
              ]}
              
              />
          </div>
          <div className="index" style={{display:'flex',justifyContent:'space-around'}}>
            <div className='uw'>
              <h6>Underweight</h6>
              <p>&lt;18.5</p>
            </div>
            <div className='n'>
              <h6>Normal</h6>
              <p>18.5-25</p>
            </div>
            <div className='ow'>
              <h6>Overweight</h6>
              <p>25-30</p>
            </div>
            <div className='o'>
              <h6>Obese</h6>
              <p>≥30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4"></div>
    </div>
      
    </>
  )
}

export default App
