import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faSun, faPlane, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { format } from 'date-fns';
import './header.css'

function Header({type}) {

    const [openState, setOpenSate] = useState(false)
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [openOptions, setOpenOptions] = useState(false)
      const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
      })

      const handleOption = (name, operation) => {
        setOptions((prev) => { 
            return {
            ...prev,
            [name] : operation === "i" ? options[name] +1 : options[name] -1, 
        }})
      }

  return (
    <div className='header'>
        <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItems active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faSun} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
                { type !== "list" &&
                <>
                <h1 className="headerTitle">Find your next stay</h1>
                <p className="headerDesc">Search deals on hotels, homes, and much more...</p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                        <input type="text" placeholder="Where are you going?" className='headerSearchInput' />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span onClick={() => setOpenSate(!openState)} className='headerSearchText'>{`${format(state[0].startDate, "MM/dd/yyyy")} to ${format(state[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openState && <DateRange
                            editableDateInputs={true}
                            onChange={item => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            className='date'
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                        <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adults</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <div className="optionTexts">
                                        <span className="optionText">Children</span>
                                        <span className="optionSubText">Ages 0 - 17</span>
                                    </div>
                                    <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Rooms</span>
                                    <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        <div className="headerSearchItem">
                            <button className="headerSearchBtn">Search</button>
                        </div>
                    </div>
                </div></>}
        </div>
    </div>
  )
}

export default Header