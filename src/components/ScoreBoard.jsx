import React, { useEffect } from 'react'
// function to display the score board using timer function to set timer after specific time
function ScoreBoard({score}) {
    const [timer, setTimer] = React.useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setTimer((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [setTimer, score]);
  return (
    <div className='w-full h-[60px] bg-green-700 flex flex-row justify-center item-center gap-44 text-white text-xl'>
        <div>{`Timer: ${timer} sec`}</div>
        <div>{`Score: ${score} score`}</div>
        <div>Undo</div>
    </div>
  )
}

export default ScoreBoard