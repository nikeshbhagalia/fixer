import Button from '@material-ui/core/Button';
import * as React from 'react';
import '.././App.css';


interface IState {
        dataSet: any,
        showDropDown: boolean,
        showDropDown2: boolean,
        convertFrom: number,
        convertTo: number,
        newNumber: number,
        currency: any,
        currency2: any,
      }
      
      export default class App extends React.Component<{}, IState> {
      
        constructor(props: any) {
          super(props);
          this.state = {
            convertFrom: 1,
            convertTo: 0,
            currency: "Choose a Currency to Convert From",
            currency2: "Choose a Currency to Convert To",
            dataSet: [],
            newNumber: 0,
            showDropDown: false,
            showDropDown2: false,
          };
          this.showDropDown = this.showDropDown.bind(this);
          this.showDropDown2 = this.showDropDown2.bind(this);
          this.updateCalculation = this.updateCalculation.bind(this);
        }
      
        public componentDidMount()  {
           fetch('http://data.fixer.io/api/latest?access_key=532168c196118164797206eac4e9996c', {
           method: 'GET'})  .then(results => results.json())
          .then(data => {
            this.setState({dataSet: data.rates});
          })
        }
      
        public showDropDown() {
          this.setState({
            showDropDown: !this.state.showDropDown
          })
        }
        public showDropDown2() {
                this.setState({
                  showDropDown2: !this.state.showDropDown2
                })
              }
        public onClick(value: any, cur: any){
          this.showDropDown();
          this.setState({
             convertFrom: value,
          });
          this.setState({
                currency: cur,
          });
        }
        public onClick2(value: any, cur: any){
          this.showDropDown2();
          this.setState({
             convertTo: value,
          });
          this.setState({
                currency2: cur,
          });
        }
        public updateCalculation(event) {
          this.setState({
            newNumber: event.target.value
          });
        }
        public render() {
          const { dataSet } = this.state; 
          return (
            <div className="App">
              <div className="flex">
                <div className="dropdown-container">
                  <Button variant="contained" color="primary" className="currency-button" onClick={this.showDropDown}>
                    {this.state.currency}
                  </Button>
                  { this.state.showDropDown &&
                    <div className="dropdown">
                    {
                      Object.keys(dataSet).map(key => (
                        <li>
                          <a
                            href={`#${dataSet[key]}`}
                            onClick={this.onClick.bind(this, (dataSet[key]), key)
                            }
                            key={key}>
                            {key}
                          </a>
                        </li>
                      ))
                    }
                  </div>
                  }
                </div>
                <div className="dropdown-container">
                  <Button variant="contained" color="primary" className="currency-button" onClick={this.showDropDown2}>
                    {this.state.currency2}
                  </Button>
                  { this.state.showDropDown2 &&
                    <div className="dropdown">
                    {
                      Object.keys(dataSet).map(key => (
                        <li>
                          <a
                            href={`#${dataSet[key]}`}
                            onClick={this.onClick2.bind(this, (dataSet[key]), key)
                            }
                            key={key}>
                            {key}
                          </a>
                        </li>
                      ))
                    }
                  </div>
                  }
                </div>
                <div>
                  <form>
                    <input 
                      type="number" 
                      placeholder="Enter Amount Here"
                      onChange={this.updateCalculation.bind(event)}
                    />
                  </form>
                  <p>Currency rate: {(this.state.convertTo / this.state.convertFrom).toFixed(2)}</p>
                  <p>Currency Converted: {(this.state.newNumber * (this.state.convertTo / this.state.convertFrom)).toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        }
}