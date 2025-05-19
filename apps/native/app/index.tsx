import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

function Splash() {
  // 애니메이션 효과(React Native에서 bounce 대체)
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        <Text style={styles.emoji}>🌍</Text>
      </Animated.View>
      <Text style={styles.title}>지리 크로스워드</Text>
      <Text style={styles.subtitle}>재미있게 배우는 지리 개념, 크로스워드로 도전하세요!</Text>
      <View style={styles.progressWrap}>
        <View style={styles.progressBarBg}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.waitText}>잠시만 기다려주세요...</Text>
      </View>
    </View>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.replace("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return <Splash />;
  }
  // 2초 후 자동으로 /login으로 이동
  return null;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 24,
    textAlign: "center",
  },
  progressWrap: {
    marginTop: 24,
    alignItems: "center",
  },
  progressBarBg: {
    width: width * 0.5,
    height: 8,
    backgroundColor: "#cbd5e1",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    width: (width * 0.5) * 0.66,
    height: 8,
    backgroundColor: "#60a5fa",
    borderRadius: 8,
  },
  waitText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 8,
  },
});
