import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, SafeAreaView } from 'react-native';
import { SearchIcon, ChevronLeft, SlidersHorizontal } from 'lucide-react-native';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      {/* Header & Search Bar */}
      <View className="px-5 pt-4 pb-4 bg-white shadow-sm z-30">
        <Text className="text-3xl font-extrabold tracking-tight text-black mb-4">Поиск</Text>
        <View className="flex-row space-x-3">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <SearchIcon size={20} color="#9CA3AF" />
            </View>
            <TextInput 
              placeholder="Активности, центры..."
              placeholderTextColor="#9CA3AF"
              className="w-full bg-[#F5F5F7] pl-12 pr-5 py-4 rounded-[20px] font-bold text-black"
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <TouchableOpacity 
            onPress={() => setIsFilterOpen(true)}
            className="w-14 h-14 bg-[#F5F5F7] rounded-[20px] items-center justify-center ml-2"
          >
            <SlidersHorizontal size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* List content would go here */}
      <ScrollView className="flex-1 px-5 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="text-center text-gray-500 font-bold mt-10">Начните поиск</Text>
      </ScrollView>

      {/* Filter Bottom Sheet Modal */}
      <Modal
        visible={isFilterOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterOpen(false)}
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => setIsFilterOpen(false)} 
            className="absolute inset-0 bg-black/40" 
          />
          <View className="bg-[#F5F5F7] w-full rounded-t-[40px] shadow-2xl h-[85%]">
            
            {/* Header */}
            <View className="bg-white rounded-t-[40px] pt-4 pb-4 px-6 border-b border-gray-100 items-center">
              <View className="w-12 h-1.5 bg-gray-200 rounded-full mb-6" />
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-2xl font-black">Фильтр</Text>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
                  <Text className="text-gray-600 font-bold text-sm">Сбросить</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filter Options */}
            <ScrollView className="px-6 py-6" contentContainerStyle={{ paddingBottom: 120 }}>
              <View className="mb-6">
                <Text className="font-bold text-lg mb-4">Подойдет для</Text>
                <View className="flex-row flex-wrap">
                  <TouchableOpacity className="px-5 py-3 rounded-full border border-gray-200 bg-white mr-2 mb-2">
                    <Text className="font-medium text-gray-700">Амир</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-5 py-3 rounded-full border border-[#A2BC3C] bg-[#A2BC3C]/10 mr-2 mb-2">
                    <Text className="font-medium text-[#A2BC3C]">Аружан</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View className="mb-6">
                <Text className="font-bold text-lg mb-4">Категория</Text>
                <View className="flex-row flex-wrap">
                  {['Спорт', 'Музыка', 'Онлайн', 'Здоровье'].map((cat, i) => (
                    <TouchableOpacity key={i} className="px-5 py-3 rounded-full border border-gray-200 bg-white mr-2 mb-2">
                      <Text className="font-medium text-gray-700">{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="bg-white p-6 border-t border-gray-100 pb-10">
              <TouchableOpacity 
                onPress={() => setIsFilterOpen(false)}
                className="w-full bg-[#A2BC3C] py-4 rounded-2xl items-center shadow-lg"
              >
                <Text className="text-white font-bold text-[18px]">Показать (12)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
