import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface LoginPageProps {
  onSocialLogin: () => Promise<void>;
  onEmailLogin: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSocialLogin,
  onEmailLogin,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TouchableOpacity style={styles.socialBtn} onPress={onSocialLogin} disabled={isLoading}>
        <Text style={styles.socialBtnText}>구글로 로그인</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => onEmailLogin(email, password)}
        disabled={isLoading}
      >
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1e293b',
  },
  socialBtn: {
    backgroundColor: '#f87171',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  socialBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: 240,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#60a5fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ef4444',
    marginTop: 16,
    fontSize: 15,
  },
});
