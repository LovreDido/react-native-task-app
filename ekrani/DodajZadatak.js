import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../constants/firebase';

const DodajZadatak = ({ navigation }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');

  const handleDodaj = async () => {
    if (!naziv.trim()) {
      Alert.alert('Greška', 'Naziv zadatka je obavezan!');
      return;
    }
    try {
      await addDoc(collection(db, 'zadaci'), {
        naziv: naziv.trim(),
        opis: opis.trim(),
        zavrsen: false,
        userId: auth.currentUser.uid,
        kreiran: new Date()
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Greška', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novi zadatak</Text>
      <TextInput style={styles.input} placeholder="Naziv zadatka" value={naziv} onChangeText={setNaziv} />
      <TextInput style={[styles.input, styles.textarea]} placeholder="Opis zadatka" value={opis} onChangeText={setOpis} multiline numberOfLines={4} />
      <TouchableOpacity style={styles.button} onPress={handleDodaj}>
        <Text style={styles.buttonText}>Spremi zadatak</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Odustani</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  textarea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#268bd2', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { padding: 15, borderRadius: 8, alignItems: 'center' },
  cancelText: { color: '#dc322f', fontSize: 16 }
});

export default DodajZadatak;