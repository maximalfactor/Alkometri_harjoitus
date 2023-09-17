import './App.css';
import {useState} from "react"

function App() {
  const [weight, setWeight] = useState(70);
  const [bottles, setAmount] = useState(0);
  const [gender, setGender] = useState("male");
  const [hours, setTime] = useState(0);
  const [total, setTotal] = useState(0);
  const hourTable = [...Array(13).keys()];
  const bottleTable = [...Array(17).keys()];

  function Calculate(e) {
    e.preventDefault();

    let genderCoef = gender == "male" ? 0.7 : 0.6;
    let litres = 0.33 * bottles;
    let grams = litres * 8 * 4.5;
    let outputElement = document.getElementById("result");
    let calculatedTotal = 0;
    let resultNumber =  document.querySelector("#result>h3:last-of-type");

    grams = grams - ((weight / 10) * hours);
    calculatedTotal = grams / (weight * genderCoef);
    setTotal(Math.max(calculatedTotal, 0));

    outputElement.classList.remove("hide");
    resultNumber.classList.remove("bad");
    resultNumber.classList.remove("not-good");

    if(calculatedTotal > 2) {
      resultNumber.classList.add("bad");
      return
    }

    if(calculatedTotal > 0.5) {
      resultNumber.classList.add("not-good");
      return
    }
    
  };
  return (
    <div className="App">
      <h2>Calculate blood alcohol content</h2>
      <form onSubmit={Calculate}>
        <div>
          <label>Weight</label>
          <input name="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)}></input>
        </div>

        <div>
          <label>Bottles</label>
          <select value={bottles} onChange={e => setAmount(e.target.value)}>
          {bottleTable.map(i => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Time (hours)</label>
          <select value={hours} onChange={e => setTime(e.target.value)}>
            {hourTable.map(i => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Gender</label>
          <input name="gender" type="radio" value="male" defaultChecked onChange={e => setGender(e.target.value)}></input>
          <label>Male</label>
          <input name="gender" type="radio" value="female" onChange={e => setGender(e.target.value)}></input>
          <label>Female</label>
        </div>

        <div id="result" class="hide">
          <h3>Total:</h3>
          <h3>{total.toFixed(2)}</h3>
        </div>
        <button>Calculate</button>

      </form>
    </div>
  );
}

export default App;
