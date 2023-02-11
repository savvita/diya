import './CalcResultLine.css';

function CalcResultLine(props) {

    return (<div className={props.className !== undefined ? props.className + " calc-res-text" : "calc-res-text"}>
                <div>{props.title ?? ''}</div>
                <div className="calc-res-num">
                    <div className="euro-text">{props.euro !== undefined ? <> &euro; ${props.euro}</> : ''}</div>
                    <div>{props.rate !== undefined && props.euro !== undefined ? <>&asymp;${(parseFloat(props.euro) * parseFloat(props.rate)).toFixed(0)} грн</> : ''}</div>
                </div>
            </div>
    );
  }
  
  export default CalcResultLine;