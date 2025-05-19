import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { LoginPage } from '@crossword-core/components/LoginPage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // 구글 로그인 세팅
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig?.extra?.GOOGLE_EXPO_CLIENT_ID,
    iosClientId: Constants.expoConfig?.extra?.GOOGLE_IOS_CLIENT_ID,
    androidClientId: Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID,
    webClientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // response.authentication.accessToken 등으로 서버 인증
      router.replace('/mainpage');
    }
  }, [response]);

  // 소셜 로그인(구글)
  const handleSocialLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await promptAsync();
    } catch (e) {
      setError('소셜 로그인 실패');
    }
    setIsLoading(false);
  };

  // 이메일 로그인(더미)
  const handleEmailLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    try {
      // 실제 서버 인증 구현 필요
      if (email === 'test@example.com' && password === '1234') {
        router.replace('/mainpage');
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (e) {
      setError('이메일 로그인 실패');
    }
    setIsLoading(false);
  };

  return (
    <LoginPage
      onSocialLogin={handleSocialLogin}
      onEmailLogin={handleEmailLogin}
      isLoading={isLoading}
      error={error}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignSelf: "center",
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 16,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  },
  googleBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  dividerWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#94a3b8",
    fontSize: 12,
  },
  inputWrap: {
    marginTop: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f1f5f9",
    marginBottom: 10,
    fontSize: 15,
    color: "#222",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 6,
  },
  loginBtn: {
    backgroundColor: "#60a5fa",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 2,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
}); 