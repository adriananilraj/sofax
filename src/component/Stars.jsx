import FullStar from '../assets/svg/star-full-icon.svg';
import React from 'react'

function Stars(props) {
    
    const FullFiveStar = () => {

        const FullFiveStarElement = [];
        
        for(let x=0; x < props.count; x++) {
            FullFiveStarElement.push(
                <img id={x} key={x} width={'13px'} src={FullStar}/>
            )
        }
        return <div className='star-container'>{FullFiveStarElement}</div>
    }


  return (
    <div>{FullFiveStar()}</div>
  )
}

export default Stars