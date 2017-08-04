import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// import requirements  
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

// created a reducer with  combineReducers function because there is no other reducer  
const reducer = combineReducers({
  user: (s={pet: 0,dir1:0,dir2:100},a)=>{
    switch(a.type)
    {
      case 'dog':
        return{
        dir1: s.dir1,
        dir2: s.dir2,
        pet: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi"
        }
      case 'cat':
        return{
        dir1: s.dir1,
        dir2: s.dir2,
        pet: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"
        }
      case 'up':
        return{
        dir1: s.dir1,
        dir2: s.dir2-50,
        pet: s.pet
        }
      case 'down':
        return{
        dir1: s.dir1,
        dir2: s.dir2+50,
        pet: s.pet
      }
      case 'right':
        return{
        dir1: s.dir1+50,
        dir2: s.dir2,
        pet: s.pet
      }
      case 'left':
        return{
        dir1: s.dir1-50,
        dir2: s.dir2,
        pet: s.pet
      }
      default:
        return{
        dir1: s.dir1,
        dir2: s.dir2,
        pet: "https://s-media-cache-ak0.pinimg.com/originals/a2/3e/22/a23e22e062d3ce86ae497998da94fdc1.jpg"
      }
    }
  }
});


// create a store, set it equal to createStore and pass in the reducer into it
const store = createStore(reducer);

// Map state to props
const a = (state) =>{
  return{
    x: state.user.dir1,
    y: state.user.dir2,
    z: state.user.pet
  }
};

// Map dispatch to props
const b = (d)=>{
  return{
    clickDog: ()=>{
      d({type: 'dog'})
    },
    clickCat: ()=>{
      d({type: 'cat'})
    },
    clickRight: ()=>{
      d({type: 'right'})
    },
    clickLeft: ()=>{
      d({type: 'left'})
    },
    clickUp: ()=>{
      d({type: 'up'})
    },
    clickDown: ()=>{
      d({type: 'down'})
    }
  }
};

// Create component, which is a function that returns html
const C = ({x,y,z,clickDog,clickCat,clickRight,clickLeft,clickUp,clickDown})=>{
  return(
    <div>
    <button onClick={clickDog}>Dog</button>
    <button onClick={clickCat}>Cat</button>
    <button onClick={clickRight}>Right</button>
    <button onClick={clickLeft}>Left</button>
    <button onClick={clickDown}>Down</button>
    <button onClick={clickUp}>Up</button>
    <img style={{position: 'absolute',left: x+'px',top: y+'px'}} src={z}/>
  </div>
  );
};

// create a container that connects map state to props and map dispatch to props
const container = connect(a,b);

// create an App use the function container and pass in the component 
const App = container(C);

// provider is able to see the store and the app is wrapped around with the app
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
