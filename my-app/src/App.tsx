import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';


interface IState {
  currency: any,
  current: number,
  dataSet: any,
  showDropDown: boolean
}

export default class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currency: "Choose a Currency to see Rate",
      current: 0,
      dataSet: [],
      showDropDown: false
    };
    this.showDropDown = this.showDropDown.bind(this);
  }

  public componentDidMount()  {
    fetch('http://data.fixer.io/api/latest?access_key=532168c196118164797206eac4e9996c', {
      method: 'GET'})
    .then(results => results.json())
    .then(data => {
      this.setState({dataSet: data.rates});
    })
  }

  public showDropDown() {
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }
  public onClick(value: any, cur: any){
    this.showDropDown();
    this.setState({
      current: value,
    });
    this.setState({
      currency: cur,
    });
  }

  public render() {
    const { dataSet } = this.state; 
    console.log(dataSet);
    return (
      <div className="App">
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
                  onClick={this.onClick.bind(this, dataSet[key], key)
                  }
                  key={key}>
                  {key}
                </a>
              </li>
            ))
          }
        </div>
        }
      <p>Currency rate: {this.state.current}</p>
      </div>
    );
  }
}

