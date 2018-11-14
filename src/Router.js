import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import MainWindow from './components/MainWindow';
// import Authentication from './components/Authentication';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
// import Nustatymai from './components/Nustatymai/Nustatymai';
// import LogOut from './components/Nustatymai/LogOut';
// import NaujasPacientas from './components/Pacientas/NaujasPacientas';
// import PacientoPaieska from './components/Pacientas/PacientoPaieska';
import LoadingPage from './components/Auth/LoadingPage';
// import Duomenys from './components/Nustatymai/Duomenys';
// import GydytojoDuomenys from './components/Nustatymai/GydytojoDuomenys';
// import Lygis1 from './components/Pacientas/Planas/Lygis1';
// import Pabaiga from './components/Pacientas/Planas/Pabaiga';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar >
        <Scene key="auth">
          <Scene key="load" component={LoadingPage} title="Please Login" hideNavBar initial />
          <Scene key="login" component={LoginForm} title="Please Login" hideNavBar/>
          <Scene key="register" component={RegisterForm} title="Please Register" hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene 
            // rightTitle="Nustatymai"
            // onRight={() => { Actions.employeeCreate() }}
            key="mainWindow" 
            component={MainWindow} 
            title="AutoPing" 
            hideNavBar
            initial
          />
          {/* <Scene key="naujas" hideNavBar>
            <Scene 
              key="naujasPacientas" 
              component={NaujasPacientas} 
              title="Naujas Pacientas" 
              initial
              hideNavBar
            />
            <Scene 
              key="lygis1" 
              component={Lygis1} 
              title="Lygis1" 
              hideNavBar
            />
            <Scene 
              key="pabaiga" 
              component={Pabaiga} 
              title="Pabaiga" 
              hideNavBar
            />
          </Scene>
          <Scene 
            key="pacientoPaieska" 
            component={PacientoPaieska} 
            title="Paciento Paieška" 
            hideNavBar
          /> */}
          {/* <Scene key="nustatymai" hideNavBar>
            <Scene 
              key="nustatymaiWindow" 
              component={Nustatymai} 
              title="Nustatymai" 
              hideNavBar
              initial
            />
            <Scene 
              key="gydytojas" 
              component={GydytojoDuomenys} 
              title="Gydytojo duomenys" 
              hideNavBar
            />
            <Scene 
              key="atsijungti" 
              component={LogOut} 
              title="Atsijungti" 
              hideNavBar
            />
            <Scene 
              key="duomenys" 
              component={Duomenys} 
              title="Duomenų saugojimas" 
              hideNavBar
            />
          </Scene> */}
        </Scene>
        {/* <Scene 
          key='Authentication'
          component={Authentication}
          hideNavBar={false}
          // initial={true}
          title='Authentication'
          hideNavBar
        /> */}

      </Scene>
    </Router>
  );
};

const styles = {
  navigationBarStyle: {
    backgroundColor: '#1E95EF'
  },
  navigationBarTitleStyle: {
    // centering for Android
    flex: 1,
    textAlign: 'left',
    textSize: 20,
    color: '#fff'
  }
};

export default RouterComponent;
