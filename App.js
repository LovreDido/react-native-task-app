import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './constants/firebase';

import DodajZadatak from './ekrani/DodajZadatak';
import Home from './ekrani/Home';
import Login from './ekrani/Login';
import Register from './ekrani/Register';
import UrediZadatak from './ekrani/UrediZadatak';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Moji zadaci' }} />
            <Stack.Screen name="DodajZadatak" component={DodajZadatak} options={{ title: 'Dodaj zadatak' }} />
            <Stack.Screen name="UrediZadatak" component={UrediZadatak} options={{ title: 'Uredi zadatak' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Prijava' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Registracija' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}