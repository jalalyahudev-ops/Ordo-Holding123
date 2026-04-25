import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Bell, Scan, QrCode, Grid, Map as MapIcon, ChevronRight } from 'lucide-react-native';

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }} 
                className="w-full h-full"
              />
            </View>
            <View>
              <Text className="text-gray-500 font-medium">Привет,</Text>
              <Text className="text-xl font-extrabold text-black">Аида 👋</Text>
            </View>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
            <Bell size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="mx-5 my-4 bg-[#A2BC3C] rounded-[32px] p-6 shadow-lg">
          <Text className="text-white/80 font-bold mb-2 uppercase tracking-widest text-[10px]">Кошелек Yaya</Text>
          <View className="flex-row items-end justify-between mb-6">
            <Text className="text-white font-black text-4xl">45 000 ₸</Text>
            <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-full">
              <Text className="text-white font-bold">Пополнить</Text>
            </TouchableOpacity>
          </View>
          <View className="h-[1px] bg-white/20 mb-4" />
          <View className="flex-row items-center justify-between">
            <View className="flex-row space-x-4">
              <TouchableOpacity className="flex-row items-center space-x-2">
                <Scan size={20} color="white" />
                <Text className="text-white font-bold ml-1">QR Оплата</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center space-x-2 ml-4">
                <QrCode size={20} color="white" />
                <Text className="text-white font-bold ml-1">Мой код</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stories/Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5 mb-2">
          {['Акции', 'Новинки', 'Спорт', 'Творчество'].map((item, index) => (
            <TouchableOpacity key={index} className="items-center mr-4">
              <View className="w-20 h-20 rounded-[24px] bg-white border border-gray-100 shadow-sm items-center justify-center mb-2">
                <Text className="text-2xl">🌟</Text>
              </View>
              <Text className="text-xs font-bold text-gray-600">{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Map Promo */}
        <View className="mx-5 mt-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-extrabold text-black">Рядом с вами</Text>
            <TouchableOpacity>
              <Text className="text-[#A2BC3C] font-bold">Смотреть все</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="h-40 bg-gray-200 rounded-[32px] overflow-hidden items-center justify-center relative">
            <Text className="text-gray-500 font-bold z-10">Карта загружается...</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
