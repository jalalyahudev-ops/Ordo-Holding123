import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import { Plus, Settings, Hexagon, Share2, ChevronRight, User2 } from 'lucide-react-native';

export function ProfileScreen() {
  const [activeModal, setActiveModal] = useState(null);

  const Stat = ({ item, label, active = false }) => (
    <View className="items-center">
      <Text className={`text-2xl font-black ${active ? 'text-[#A2BC3C]' : 'text-black'}`}>{item}</Text>
      <Text className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-wider">{label}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      {/* Header */}
      <View className="px-5 pt-4 pb-4 flex-row justify-between items-center bg-white z-30 shadow-sm">
        <Text className="text-3xl font-extrabold tracking-tight text-black">Профиль</Text>
        <View className="flex-row items-center space-x-5">
          <TouchableOpacity onPress={() => setActiveModal('post')}>
            <Plus size={32} color="black" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveModal('settings')} className="ml-4">
            <Settings size={32} color="black" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Card */}
        <View className="mx-5 mt-6 bg-white rounded-[32px] p-6 shadow-sm items-center">
          <View className="relative mb-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' }} 
              className="w-full h-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-[#A2BC3C] rounded-full border-2 border-white items-center justify-center">
              <Plus size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-6">
            <Text className="text-[28px] font-bold text-black tracking-tight mb-1">Аида Азаматкизы</Text>
            <View className="flex-row items-center space-x-2">
              <Hexagon size={20} color="#E5E7EB" fill="#E5E7EB" />
              <Text className="text-sm font-bold text-gray-400">Начинающий</Text>
            </View>
          </View>

          <View className="flex-row justify-around w-full mb-8">
            <Stat item="1" label="Подписчики" />
            <View className="w-[1px] bg-gray-100 h-8 mt-2" />
            <Stat item="0" label="Подписки" />
            <View className="w-[1px] bg-gray-100 h-8 mt-2" />
            <Stat item="1" label="Просмотры" active />
          </View>

          {/* Social Links & Bio Buttons */}
          <View className="w-full space-y-4">
            <TouchableOpacity onPress={() => setActiveModal('bio')} className="w-full bg-[#F5F5F7] py-4 rounded-2xl items-center px-4 mb-4">
              <Text className="text-black font-bold text-[17px]">Добавить био</Text>
            </TouchableOpacity>
            
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity onPress={() => setActiveModal('instagram')} className="flex-1 bg-white border border-gray-100 py-4 rounded-2xl items-center shadow-sm mr-2">
                <Text className="text-[#A2BC3C] font-bold">Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveModal('tiktok')} className="flex-1 bg-white border border-gray-100 py-4 rounded-2xl items-center shadow-sm ml-2">
                <Text className="text-[#A2BC3C] font-bold">TikTok</Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex-row items-center justify-between">
              <TouchableOpacity className="flex-1 bg-[#A2BC3C] py-5 rounded-3xl items-center shadow-lg mr-4">
                <Text className="text-white font-bold text-[18px]">Найти друзей</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-16 h-16 bg-white border border-gray-100 rounded-3xl items-center justify-center shadow-sm">
                <Share2 size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </ScrollView>
      
      {/* Shared Profile Modals handler */}
      <Modal
         visible={!!activeModal}
         animationType="slide"
         transparent={true}
         onRequestClose={() => setActiveModal(null)}
      >
        <View className="flex-1 justify-end bg-black/40">
           <View className="w-full bg-white rounded-t-[40px] px-8 py-8 shadow-2xl min-h-[50%]">
              <View className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <Text className="text-2xl font-black mb-4 uppercase">Редактирование</Text>
              {/* Content depending on activeModal type goes here */}
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="mt-auto w-full bg-[#A2BC3C] py-4 rounded-[20px] items-center"
              >
                <Text className="text-white font-bold text-lg">Сохранить</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
