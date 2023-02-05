import React from 'react'
import "./background.css"

function BackgroundHomePage(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
              <button className='button-profile' onClick={() => props.PageChange(1)} style={{backgroundColor: "#9ad08d"}}> Games </button>
              <button className='button-profile' onClick={() => props.PageChange(6)} > Classes </button>
              <button className='button-profile' onClick={() => props.PageChange(7)} > Students </button>
              <button className='button-profile' onClick={() => props.PageChange(8)} > Statistics </button>
          </div>
        </div>
          <div className='main-home-intro'>
            <h1 className='welcome-class'> Welcome Class 1</h1>
            <div className='button-game-series'>
              <button className='button-game' onClick={() => {
                props.PageChange(2)
                props.GameChange(1)
                }}> Drawing and Matching </button>
              <button className='button-game'onClick={() => {
                props.PageChange(3)
                props.GameChange(1)
                }}> Shadows </button>
              <button className='button-game' onClick={() => {
                props.PageChange(5)
                props.GameChange(1)
                }}> Models </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundClassesPage(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
            <button className='button-profile' onClick={() => props.PageChange(1)} > Games </button>
              <button className='button-profile' onClick={() => props.PageChange(6)} style={{backgroundColor: "#9ad08d"}}> Classes </button>
              <button className='button-profile' onClick={() => props.PageChange(7)} > Students </button>
              <button className='button-profile' onClick={() => props.PageChange(8)} > Statistics </button>
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
}

function BackgroundStudentsPage(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
            <button className='button-profile' onClick={() => props.PageChange(1)} > Games </button>
              <button className='button-profile' onClick={() => props.PageChange(6)} > Classes </button>
              <button className='button-profile' onClick={() => props.PageChange(7)} style={{backgroundColor: "#9ad08d"}}> Students </button>
              <button className='button-profile' onClick={() => props.PageChange(8)} > Statistics </button>
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
}

function BackgroundStatisticsPage(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
            <button className='button-profile' onClick={() => props.PageChange(1)} > Games </button>
              <button className='button-profile' onClick={() => props.PageChange(6)} > Classes </button>
              <button className='button-profile' onClick={() => props.PageChange(7)} > Students </button>
              <button className='button-profile' onClick={() => props.PageChange(8)} style={{backgroundColor: "#9ad08d"}}> Statistics </button>
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
}

function BackgroundGames1(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
            <div className="logo"></div>
          </div>
          <h1 className='project-name'> Illuminate </h1>
          <div className='button-profile-series'>
            <button className='button-profile' onClick={() => {
                props.PageChange(2)
                props.GameChange(1)
                }} style={{backgroundColor: "#9ad08d"}}> Drawing and Matching </button>
            <button className='button-profile' onClick={() => {
                props.PageChange(3)
                props.GameChange(1)
                }}> Shadows </button>
            <button className='button-profile' onClick={() => {
                props.PageChange(5)
                props.GameChange(1)
                }}> Models </button>
            <button className='button-profile' style={{width: 220, height: 70}} onClick={() => {
                props.PageChange(1)
                props.GameChange(1)
                }}> Home </button>
          </div>
        </div>
          <div className='main'>
            <div className='top-tab'>
              <button className='top-tab-button-game' onClick={() => props.GameChange(1)} style={props.gameNum === 1 ? {backgroundColor: "#e1c7a1"} : null}> Word Search </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(2)} style={props.gameNum === 2 ? {backgroundColor: "#e1c7a1"} : null}> Sequence Memorization </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(3)} style={props.gameNum === 3 ? {backgroundColor: "#e1c7a1"} : null}> Letter Rescramble </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(4)} style={props.gameNum === 4 ? {backgroundColor: "#e1c7a1"} : null}> Redraw </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(5)} style={props.gameNum === 5 ? {backgroundColor: "#e1c7a1"} : null}> Drawing Canvas </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGames2(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
              <button className='button-profile' onClick={() => {
                props.PageChange(2)
                props.GameChange(1)
                }}> Drawing and Matching </button>
              <button className='button-profile' onClick={() => {
                props.PageChange(3)
                props.GameChange(1)
                }} style={{backgroundColor: "#9ad08d"}}> Shadows </button>
              <button className='button-profile' onClick={() => {
                props.PageChange(5)
                props.GameChange(1)
                }}> Models </button>
              <button className='button-profile' style={{width: 220, height: 70}} onClick={() => {
                props.PageChange(1)
                props.GameChange(1)
                }}> Home </button>
            </div>
          </div>
          <div className='main'>
            <div className='top-tab'>
              <button className='top-tab-button-game' onClick={() => props.GameChange(1)} style={props.gameNum === 1 ? {backgroundColor: "#e1c7a1"} : null}> Shadow Building </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(2)} style={props.gameNum === 2 ? {backgroundColor: "#e1c7a1"} : null}> Hand Shadow Play </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(3)} style={props.gameNum === 3 ? {backgroundColor: "#e1c7a1"} : null}> Shadow in the Wall </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGames22(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='main'>
            <div className='top-tab-v2' >
              <button className='top-tab-button-game' onClick={() => props.GameChange(1)} style={props.gameNum === 1 ? {backgroundColor: "#e1c7a1"} : null}> Shadow Building </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(2)} style={props.gameNum === 2 ? {backgroundColor: "#e1c7a1"} : null}> Hand Shadow Play </button>
              <button className='top-tab-button-game' onClick={() => props.GameChange(3)} style={props.gameNum === 3 ? {backgroundColor: "#e1c7a1"} : null}> Shadow in the Wall </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGames3(props) {
  return (
    <div className='background-outer'>
      <div className='background-inner'>
        <div className='background-home-page'>
          <div className='left-tab'>
            <div className='logo-background'>
              <div className="logo"></div>
            </div>
            <h1 className='project-name'> Illuminate </h1>
            <div className='button-profile-series'>
              <button className='button-profile' onClick={() => {
                props.PageChange(2)
                props.GameChange(1)
                }}> Drawing and Matching </button>
              <button className='button-profile' onClick={() => {
                props.PageChange(3)
                props.GameChange(1)
                }}> Shadows </button>
              <button className='button-profile' onClick={() => {
                props.PageChange(5)
                props.GameChange(1)
                }} style={{backgroundColor: "#9ad08d"}}> Models </button>
              <button className='button-profile' style={{width: 220, height: 70}} onClick={() => {
                props.PageChange(1)
                props.GameChange(1)
                }}> Home </button>
            </div>
          </div>
          <div className='main'>
            <div className='top-tab'>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export { BackgroundHomePage, BackgroundClassesPage, BackgroundStudentsPage, BackgroundStatisticsPage, BackgroundGames1, BackgroundGames2, BackgroundGames22, BackgroundGames3 };