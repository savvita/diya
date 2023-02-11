import { useEffect, useState } from 'react';
import { getEuroRate } from '../modules/bank-info'
import { getEngineTypes } from '../modules/car-specification';
import { calcTax } from '../modules/calculation';

import CalcResultLine from './CalcResultLine/CalcResultLine'

import './CalcForm.css';

function CalcForm() {
    const [types, setTypes] = useState([]);
    const [rate, setRate] = useState(0);

    const [year, setYear] = useState(2023);
    const [coeffCapacity, setCoeffCapacity] = useState(0);
    const [coeffEngine, setCoeffEngine] = useState(0);
    const [isExclusive, setIsExclusive] = useState(false);

    const [isCalculated, setIsCalculated] = useState(false);

    const [tax, setTax] = useState({
        "tax": 0,
        "vat": 0,
        "total": 0
    });

    function calculateTax() {
        let t = calcTax(year, coeffCapacity, coeffEngine, isExclusive);
        console.log(t);
        setTax(t);
        setIsCalculated(true);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getEuroRate();
            if(response !== undefined) {
                setRate(response.rate);
            }
            setTypes(getEngineTypes());
        }
        fetchData();
    }, []);

    return (
      <div className="container">
        <div className="calculator">
            <div className="layout-grid">
                <h2 className="calc-title">Нова система розрахунку</h2>

                <div className="calc-form-box">
                    <div className="input-group">
                        <span className="input-label">Рік виготовлення</span>
                        <input className="input input-number" type="number" min="1900" max="2022" placeholder="XXXX" value={ year } onChange={(e) => setYear(e.target.value)}></input>
                    </div>

                    <div className="input-group">
                        <span className="input-label">Тип двигуна</span>
                        <select className="input input-select" required value={coeffEngine} onChange={(e) => setCoeffEngine(e.target.value)}>
                            <option value="0" defaultChecked disabled>Оберіть зі списку</option>
                            {types.map((x ,i) => <option key={i} value={x.value}>{x.type}</option>)}
                        </select>
                        <svg className="select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.38411 11.5391C8.18421 11.7789 7.81579 11.7789 7.61589 11.5391L3.68341 6.82009C3.41202 6.49443 3.6436 6 4.06752 6L11.9325 6C12.3564 6 12.588 6.49443 12.3166 6.82009L8.38411 11.5391Z" fill="black"></path>
                        </svg>
                    </div>

                    <div className="input-group">
                        <span className="input-label">Робочий об’єм двигуна, см³</span>
                        <input className="input input-number" type="number" pattern="/\d+/" placeholder="XXXX" value={coeffCapacity} onChange={(e) => setCoeffCapacity(e.target.value)}></input>
                    </div>

                    <div className="calc-bottom">
                        <div className="calc-exclusive">
                            <div className="checkbox-container">
                                <input id="exclusiveChkbox" type="checkbox" checked={isExclusive} onChange={(e) => setIsExclusive(e.target.checked)}></input>
                                <label className="checkbox" htmlFor="exclusiveChkbox">Ексклюзивне авто</label>
                            </div>
                            <a className="calc-tooltip" href="#">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10.25" fill="white" stroke="black" strokeWidth="1.5"/>
                                    <path d="M11.1797 13.5H12.6328V13.4297C12.6328 13.0312 12.9141 12.7031 13.5938 12.2344C14.5781 11.5312 14.9766 10.875 14.9766 9.96094C14.9766 8.48438 13.7812 7.47656 12 7.47656C10.1484 7.47656 8.85938 8.60156 8.69531 10.3359L10.2656 10.6406C10.3594 9.53906 11.0156 8.88281 11.9766 8.88281C12.7734 8.88281 13.2891 9.32812 13.2891 10.0781C13.2891 10.6172 13.1016 10.8984 12.3281 11.5078C11.3672 12.2812 11.1328 12.6797 11.1797 13.5ZM10.9219 16.5H12.9609V14.4375H10.9219V16.5Z" fill="black"/>
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="calc-tooltip-hover">
                                    <circle cx="12" cy="12" r="10.25" fill="black" stroke="black" strokeWidth="1.5"/>
                                    <path d="M11.1797 13.5H12.6328V13.4297C12.6328 13.0312 12.9141 12.7031 13.5938 12.2344C14.5781 11.5312 14.9766 10.875 14.9766 9.96094C14.9766 8.48438 13.7812 7.47656 12 7.47656C10.1484 7.47656 8.85938 8.60156 8.69531 10.3359L10.2656 10.6406C10.3594 9.53906 11.0156 8.88281 11.9766 8.88281C12.7734 8.88281 13.2891 9.32812 13.2891 10.0781C13.2891 10.6172 13.1016 10.8984 12.3281 11.5078C11.3672 12.2812 11.1328 12.6797 11.1797 13.5ZM10.9219 16.5H12.9609V14.4375H10.9219V16.5Z" fill="white"/>
                                </svg>
                            </a>

                        </div>
                        <a className="btn calc-button" href="#" onClick={ calculateTax }>Розрахувати</a>
                    </div>
                </div>

                <div className="calc-res-box">
                    <div className="calc-res-description">
                        <p className="lead">Ми створили калькулятор, який через просту формулу розраховує вартість розмитнення за новою системою.</p>
                        <p className="lead">Скористайтесь ним, щоб дізнатися, скільки коштуватиме розмитнення вашого авто. А по завершенню — залиште відгук про систему розрахунку.</p>
                    </div>

                    <div className={isCalculated ? "calc-res-total" : "d-none"}>
                        <CalcResultLine title="Акцизний податок:" euro={ tax.tax } rate={ rate } />
                        <CalcResultLine title="ПДВ:" euro={ tax.vat } rate={ rate } />
                        <CalcResultLine className="total" title="Загалом:" euro={ tax.total } rate={ rate } />
                    </div>

                    <a className="btn calc-button-about" href="#">Детальніше про розрахунок</a>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default CalcForm;