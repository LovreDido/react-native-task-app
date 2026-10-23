import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../constants/firebase';

const UrediZadatak = ({ route, navigation }) => {
  const { zadatak } = route.params;
  const [naziv, setNaziv] = useState(zadatak.naziv);
  const [opis, setOpis] = useState(zadatak.opis);
  const [zavrsen, setZavrsen] = useState(zadatak.zavrsen);

  const handleSpremi = async () => {
    if (!naziv.trim()) {
      Alert.alert('Greška', 'Naziv zadatka je obavezan!');
      return;
    }
    try {
      await updateDoc(doc(db, 'zadaci', zadatak.id), {
        naziv: naziv.trim(),
        opis: opis.trim(),
        zavrsen: zavrsen
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Greška', error.message);
    }
  };

  const handleObrisi = () => {
    Alert.alert(
      'Brisanje zadatka',
      'Jesi li siguran da želiš obrisati ovaj zadatak?',
      [
        { text: 'Odustani', style: 'cancel' },
        {
          text: 'Obriši',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'zadaci', zadatak.id));
              navigation.goBack();
            } catch (error) {
              Alert.alert('Greška', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uredi zadatak</Text>
      <TextInput style={styles.input} placeholder="Naziv zadatka" value={naziv} onChangeText={setNaziv} />
      <TextInput style={[styles.input, styles.textarea]} placeholder="Opis zadatka" value={opis} onChangeText={setOpis} multiline numberOfLines={4} />
      
      <TouchableOpacity style={[styles.statusBtn, { backgroundColor: zavrsen ? '#859900' : '#cb4b16' }]} onPress={() => setZavrsen(!zavrsen)}>
        <Text style={styles.statusText}>{zavrsen ? '✓ Završen' : '○ Nije završen'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSpremi}>
        <Text style={styles.buttonText}>Spremi promjene</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleObrisi}>
        <Text style={styles.deleteText}>Obriši zadatak</Text>
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
  statusBtn: { padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  statusText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: '#268bd2', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#dc322f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  deleteText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { padding: 15, borderRadius: 8, alignItems: 'center' },
  cancelText: { color: '#666', fontSize: 16 }
});

export default UrediZadatak;