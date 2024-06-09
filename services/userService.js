import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usermail: email, 
          userpassword: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Falló el inicio de sesión');
      }

      const data = await response.json();
      console.log(data.message); 
      navigation.navigate('LandingPage');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo iniciar sesión. Por favor, intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, Platform.OS === 'web' ? styles.inputWeb : null]}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={[styles.input, Platform.OS === 'web' ? styles.inputWeb : null]}
      />
      <View style={[styles.buttonContainer, Platform.OS === 'web' ? styles.buttonContainerWeb : null]}>
        <Button
          title="Iniciar Sesión"
          onPress={onSignIn} 
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>
        <Text style={styles.signUpText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 34,
    color: '#0000ff', // Azul
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
  },
  inputWeb: {
    width: '50%', 
    alignSelf: 'center', 
  },
  button: {
    marginTop: 20,
  },
  buttonWeb: {
    width: '50%', 
    alignSelf: 'center',
  },
  signUpLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainerWeb: {
    width: '50%', 
    alignSelf: 'center',
  },
  signUpText: {
    color: '#0000cc', // Un azul ligeramente más oscuro 
    textDecorationLine: 'underline',
  },
});

export default SignIn;
