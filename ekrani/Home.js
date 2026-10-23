import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../constants/firebase';

const Home = ({ navigation }) => {
  const [zadaci, setZadaci] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    // Dohvacamo samo zadatke trenutnog korisnika
    // onSnapshot automatski osvjezava listu kad se nesto promijeni u Firestoreu
    const q = query(collection(db, 'zadaci'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setZadaci(lista);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const renderZadatak = ({ item }) => (
    <TouchableOpacity
      style={styles.zadatak}
      onPress={() => navigation.navigate('UrediZadatak', { zadatak: item })}
    >
      <View style={styles.zadatakInfo}>
        <Text style={[styles.naziv, item.zavrsen && styles.zavrseno]}>{item.naziv}</Text>
        <Text style={styles.opis} numberOfLines={1}>{item.opis}</Text>
      </View>
      <View style={[styles.status, { backgroundColor: item.zavrsen ? '#859900' : '#cb4b16' }]}>
        <Text style={styles.statusText}>{item.zavrsen ? '✓' : '○'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={zadaci}
        keyExtractor={item => item.id}
        renderItem={renderZadatak}
        ListEmptyComponent={<Text style={styles.prazno}>Nema zadataka. Dodaj novi!</Text>}
      />
      <TouchableOpacity style={styles.dodajBtn} onPress={() => navigation.navigate('DodajZadatak')}>
        <Text style={styles.dodajText}>+ Dodaj zadatak</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  zadatak: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  zadatakInfo: { flex: 1 },
  naziv: { fontSize: 16, fontWeight: 'bold' },
  zavrseno: { textDecorationLine: 'line-through', color: '#999' },
  opis: { fontSize: 13, color: '#666', marginTop: 3 },
  status: { width: 35, height: 35, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  statusText: { color: 'white', fontWeight: 'bold' },
  prazno: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 },
  dodajBtn: { backgroundColor: '#268bd2', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  dodajText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#dc322f', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  logoutText: { color: 'white', fontWeight: 'bold' }
});

export default Home;