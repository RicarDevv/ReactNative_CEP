import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard
} from 'react-native';
import api from './src/services/api';

export default function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep válido'),
      setCep('');
      return; //
    }

    try{
    const response = await api.get(`/${cep}/json`);
    console.log(response.data);
    setCepUser(response.data);  
    Keyboard.dismiss(); //Ele garante que o teclado seja fechado ao digitar
  
  }catch(error){
    console.log( 'ERROR: ' + error);
  }
  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Busca Cep</Text>
        <TextInput 
        style={styles.input}
        placeholder="Ex: 00000000"
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType="numeric"
        ref={inputRef}
        
        />
        
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, {backgroundColor: '#f69a06'}]}
        onPress={ buscar }
        >
          <Text styles={styles.botaoText}>Buscar</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, {backgroundColor: '#f69a06'}]}
        onPress={ limpar }
        >
          <Text  styles={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser &&
      <View style={styles.resultado}>
      <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
      <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
      <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
      <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
      <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
    </View>
      }
      
    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#040405'
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f5f6f5',
  },
  input:{
    backgroundColor: '#dbdbdb',
    borderEndWidth: 5,
    borderColor: '#040405',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 40,
    borderBottomColor: '#040405',
  },
  botaoText:{
    fontSize: 22,
    color: '#ffffff',
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText:{
    fontSize: 22,
    color: '#f5f6f5',
  },
});