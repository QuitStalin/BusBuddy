import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const UserScreen = () => {
  const router = useRouter();

  // Pretpostavimo da su ovo default podaci
  const user = {
    username: 'tima',
    email: 'ado@gmail.com', // Koristi pravi email ovde
    password: '12345',
  };

  const handleLogout = () => {
    router.push('/login'); // Putanja do login stranice
  };

  const handleDeleteAccount = () => {
    axios
      .get('https://script.google.com/macros/s/AKfycbxCckvojV8mcjNkXhWqcwglBhpAiFe7B1x1lEcydkgqCD6zrBsumPlItlLQ6Dba9Myp/exec', {
        params: {
          type: 'deleteAccount',
          email: user.email,
        },
      })
      .then((response) => {
        if (response.data === 'Account Deleted') {
          Alert.alert('Success', 'Account has been deleted successfully.');
          router.push('/login'); // Vraća na login stranicu nakon brisanja
        } else if (response.data === 'Email Not Found') {
          Alert.alert('Error', 'The email address does not exist.');
        } else {
          Alert.alert('Error', 'An error occurred while deleting the account.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'An error occurred while trying to delete the account.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4CE14" translucent={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.userInfo}>{user.username}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.userInfo}>{user.password}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4CE14',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  userInfoContainer: {
    backgroundColor: '#272727',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'RadioCanadaSemiBold',
    color: '#F4CE14',
  },
  userInfo: {
    fontSize: 18,
    fontFamily: 'RadioCanadaRegular',
    color: '#F4CE14',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#272727',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    fontFamily: 'RadioCanadaSemiBold',
    color: '#F4CE14',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C', // Crvena boja za dugme za brisanje
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    fontFamily: 'RadioCanadaSemiBold',
    color: '#FFFFFF', // Bele boje za tekst na crvenom dugmetu
  },
});

export default UserScreen;

