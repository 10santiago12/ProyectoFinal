import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export const PriceScanLogin = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome to PriceScan</Text>
      <Text style={styles.subheader}>Sign in to continue saving money</Text>
      
      <View style={styles.divider} />
      
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          placeholderTextColor="#888"
        />
      </View>
      
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        
        {/* Password dots indicator - this is decorative since actual input would handle this */}
        <View style={styles.passwordDotsContainer}>
          <Text style={styles.passwordDots}>······</Text>
        </View>
        
        <View style={styles.rememberMeContainer}>
          <View style={styles.checkbox}></View>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
      </View>
      
      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      
      {/* Social Login Options */}
      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialLoginText}>or continue with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}></TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}></TouchableOpacity>
        </View>
      </View>
      
      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  forgotPassword: {
    color: '#0066cc',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 12,
  },
  passwordDotsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  passwordDots: {
    fontSize: 16,
    letterSpacing: 2,
    color: '#000',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#666',
  },
  signInButton: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  socialLoginText: {
    color: '#666',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginHorizontal: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});