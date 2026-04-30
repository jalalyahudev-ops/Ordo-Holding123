import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Mail, Lock, Phone as PhoneIcon, ChevronLeft, User, Eye, EyeOff } from 'lucide-react-native';

export function LoginScreen() {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Phone State
  const [phone, setPhone] = useState('+7 ');
  
  // Email State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const isValidPhone = phone.replace(/\D/g, '').length >= 11;
  const isValidEmail = email.includes('@') && password.length >= 4;
  const isValidRegister = regName.trim().length > 2 && regPhone.length > 10 && regEmail.includes('@');

  const handlePhoneContinue = () => {
    if (isValidPhone) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to verify screen
      }, 1000);
    }
  };

  const handleEmailContinue = async () => {
    if (isValidEmail) {
      setIsLoading(true);
      // Simulate independent login for mobile
      setTimeout(() => {
        setIsLoading(false);
        const fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbCIsImlhdCI6MTY5NTMxMDg1MiwKZXhwIjoxNjk1MzE0NDUyfQ.local_dev_token";
        alert('Успешный вход (симуляция)!');
        // In a real app, you would navigate here
      }, 800);
    }
  };

  const handleRegister = async () => {
    if (isValidRegister) {
      setIsLoading(true);
      // Simulate registration
      setTimeout(() => {
        setIsLoading(false);
        setEmail(regEmail);
        setPassword('123456');
        alert(`Регистрация успешна!\n\nЛогин: ${regEmail}\nПароль: 123456`);
        setView('login');
      }, 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 pt-4"
      >
        <TouchableOpacity 
          onPress={() => {
            if (view === 'register') setView('login');
          }}
          className="w-10 h-10 items-center justify-center rounded-full bg-white mb-6 shadow-sm"
        >
          <ChevronLeft color="black" size={24} />
        </TouchableOpacity>

        {view === 'login' ? (
          <>
            <View className="flex-1">
              <Text className="text-3xl font-extrabold mb-2 text-black">
                Войдите по Email
              </Text>
              <Text className="text-gray-500 mb-8 font-medium">
                Введите email и пароль
              </Text>

              <View>
                <View className="relative mb-4 justify-center">
                  <View className="absolute left-4 z-10">
                    <Mail color="#9CA3AF" size={20} />
                  </View>
                  <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Ваш email"
                    placeholderTextColor="#9CA3AF"
                    className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl font-bold text-lg text-black border border-gray-100"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                  
                  <View className="relative mb-8 justify-center">
                    <View className="absolute left-4 z-10">
                      <Lock color="#9CA3AF" size={20} />
                    </View>
                    <TextInput
                      secureTextEntry={!showPassword}
                      placeholder="Пароль"
                      placeholderTextColor="#9CA3AF"
                      className="w-full bg-white pl-12 pr-12 py-4 rounded-2xl font-bold text-lg text-black border border-gray-100"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 z-10"
                    >
                       {showPassword ? <EyeOff color="#9CA3AF" size={20} /> : <Eye color="#9CA3AF" size={20} />}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity 
                    onPress={handleEmailContinue}
                    disabled={!isValidEmail || isLoading}
                    className={`w-full py-5 rounded-2xl items-center shadow-md ${!isValidEmail ? 'bg-gray-300' : 'bg-[#A2BC3C]'}`}
                  >
                    <Text className="text-white font-bold text-[18px]">
                      {isLoading ? 'Загрузка...' : 'Войти'}
                    </Text>
                  </TouchableOpacity>

                  <View className="mt-8 flex-row justify-center">
                    <Text className="text-gray-500 text-sm">Нет аккаунта? </Text>
                    <TouchableOpacity onPress={() => setView('register')}>
                        <Text className="text-[#A2BC3C] font-bold text-sm">Зарегистрируйтесь сейчас</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </>
        ) : (
          <View className="flex-1">
            <Text className="text-3xl font-extrabold mb-2 text-black">Регистрация</Text>
            <Text className="text-gray-500 mb-8 font-medium">
              Создайте аккаунт. Пароль будет отправлен на вашу почту
            </Text>

            <View className="relative mb-4 justify-center">
              <View className="absolute left-4 z-10">
                <User color="#9CA3AF" size={20} />
              </View>
              <TextInput
                placeholder="ФИО"
                placeholderTextColor="#9CA3AF"
                className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl font-bold text-lg text-black border border-gray-100"
                value={regName}
                onChangeText={setRegName}
              />
            </View>

            <View className="relative mb-4 justify-center">
              <View className="absolute left-4 z-10">
                <PhoneIcon color="#9CA3AF" size={20} />
              </View>
              <TextInput
                keyboardType="phone-pad"
                placeholder="Телефон"
                placeholderTextColor="#9CA3AF"
                className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl font-bold text-lg text-black border border-gray-100"
                value={regPhone}
                onChangeText={setRegPhone}
              />
            </View>

            <View className="relative mb-8 justify-center">
              <View className="absolute left-4 z-10">
                <Mail color="#9CA3AF" size={20} />
              </View>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email почта"
                placeholderTextColor="#9CA3AF"
                className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl font-bold text-lg text-black border border-gray-100"
                value={regEmail}
                onChangeText={setRegEmail}
              />
            </View>

            <TouchableOpacity 
              onPress={handleRegister}
              disabled={!isValidRegister || isLoading}
              className={`w-full py-5 rounded-2xl items-center shadow-md ${!isValidRegister ? 'bg-gray-300' : 'bg-[#A2BC3C]'}`}
            >
              <Text className="text-white font-bold text-[18px]">
                {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
              </Text>
            </TouchableOpacity>

            <View className="mt-8 flex-row justify-center">
              <Text className="text-gray-500 text-sm">Уже есть аккаунт? </Text>
              <TouchableOpacity onPress={() => setView('login')}>
                  <Text className="text-[#A2BC3C] font-bold text-sm">Вернуться ко входу</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
