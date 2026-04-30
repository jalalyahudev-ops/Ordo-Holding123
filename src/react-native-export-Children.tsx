import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  SafeAreaView,
  TextInput
} from 'react-native';
import { 
  ChevronLeft, 
  Plus, 
  CheckCircle2, 
  ChevronRight, 
  Star,
  Crosshair,
  BookOpen,
  Calendar,
  ClipboardList,
  Wallet,
  User2
} from 'lucide-react-native'; // NOTE: You need to map these to lucide-react-native
// import { LineChart } from 'react-native-chart-kit'; // Alternative for recharts
// import { styled } from 'nativewind'; // Using NativeWind for Tailwind support in RN

// This is a React Native + NativeWind conversion of the Children.tsx screen
export function ChildrenScreen({ navigation }) {
  const [activeModal, setActiveModal] = useState(null);
  const [newChildName, setNewChildName] = useState('');
  const [newChildDate, setNewChildDate] = useState('');
  const [newChildIin, setNewChildIin] = useState('');
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [token, setToken] = useState('get_from_secure_storage'); // Replace with robust token retrieval
  
  const handleAddChild = async () => {
    if (!newChildName || !newChildDate || !newChildIin) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    
    setIsAddingChild(true);
    // Simulate local success for mobile export
    setTimeout(() => {
      setIsAddingChild(false);
      alert("Ребенок успешно добавлен (локально)!");
      setActiveModal(null);
      setNewChildName('');
      setNewChildDate('');
      setNewChildIin('');
    }, 1000);
  };

  const text = {
    title: 'Развитие',
    results: 'Результаты',
    skillsSuccess: 'Навыки освоены 2 дня подряд',
    monitoringStatus: 'Мониторинг 3 функций',
    childName: 'Денис Ранд',
    dob: '15.05.2018',
    dobLabel: 'Дата рождения',
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'add_child':
        return (
          <View className="space-y-6">
            <Text className="text-2xl font-black mb-4">Добавить ребенка</Text>
            {/* Using native component inputs for React Native */}
            <View className="space-y-4">
              <View className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 items-center justify-center shadow-inner">
                 <Plus size={32} color="#9CA3AF" />
              </View>
              <TextInput 
                 placeholder="Имя ребенка"
                 value={newChildName}
                 onChangeText={setNewChildName}
                 className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl font-bold text-black border border-transparent"
              />
              <TextInput 
                 placeholder="ИИН ребенка"
                 value={newChildIin}
                 onChangeText={setNewChildIin}
                 className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl font-bold text-black border border-transparent"
              />
              <TextInput 
                 placeholder="Дата рождения (ГГГГ-ММ-ДД)"
                 value={newChildDate}
                 onChangeText={setNewChildDate}
                 className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl font-bold text-gray-500 border border-transparent"
              />
              <TouchableOpacity 
                 disabled={isAddingChild}
                 onPress={handleAddChild}
                 className="w-full bg-[#A2BC3C] mt-4 py-4 rounded-[20px] items-center justify-center opacity-100 disabled:opacity-50"
              >
                  <Text className="text-white text-[17px] font-black">
                     {isAddingChild ? "Сохранение..." : "Сохранить"}
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      // ... same logic for other modals (results, monitoring, etc.)
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      <ScrollView className="flex-1 relative" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row justify-between items-center bg-white shadow-sm">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F7]"
            >
              <ChevronLeft size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-extrabold text-black">
              {text.title}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => setActiveModal('add_child')} 
            className="w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F7]"
          >
            <Plus size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="px-5 space-y-6 pt-6">
          {/* Child Profile Card */}
          <View className="bg-white rounded-[32px] p-6 shadow-sm overflow-hidden flex-row items-start space-x-4">
             <View className="w-40 h-56 justify-end items-center relative">
               {/* Note: React Native Image requires specific source formats */}
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800' }} 
                 className="w-full h-full"
                 resizeMode="contain"
               />
             </View>

             <View className="flex-1 pt-2">
               <Text className="text-2xl font-black text-black mb-2">{text.childName}</Text>
               <View className="mb-4">
                  <Text className="text-[10px] uppercase font-black text-gray-400">{text.dobLabel}</Text>
                  <Text className="text-base font-bold text-black">{text.dob}</Text>
               </View>
             </View>
          </View>

          {/* Action Grid */}
          <View className="space-y-4 pt-4">
             <DashButton 
               icon={<Star color="#fbbf24" />} 
               label={text.results} 
               onPress={() => setActiveModal('results')} 
             />
             {/* Add other buttons here replacing div/button with View/TouchableOpacity */}
          </View>
        </View>
      </ScrollView>

      {/* Action Modals - using RN Modal */}
      <Modal
        visible={!!activeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View className="flex-1 justify-end bg-black/40">
           <View className="w-full bg-white rounded-t-[40px] px-8 py-8 shadow-2xl">
              <View className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              {renderModalContent()}
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="mt-10 w-full py-4 items-center"
              >
                <Text className="text-gray-400 font-bold uppercase text-xs">Закрыть</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Reusable DashButton component converted to React Native
const DashButton = ({ icon, label, onPress, primary = false, small = false }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`flex-row items-center px-6 py-5 rounded-[28px] bg-white border border-gray-100 shadow-sm ${primary ? 'bg-[#A2BC3C] border-0' : ''} ${small ? 'px-4 py-4' : ''}`}
  >
    <View className={`w-11 h-11 rounded-2xl bg-gray-50 items-center justify-center ${primary ? 'bg-white/20' : ''} ${small ? 'w-9 h-9 rounded-xl' : ''}`}>
      {icon}
    </View>
    <View className="flex-1 mx-4">
      <Text className={`font-bold text-[15px] text-gray-800 ${primary ? 'text-white text-lg' : ''} ${small ? 'text-[13px]' : ''}`}>
        {label}
      </Text>
    </View>
    <ChevronRight size={20} color={primary ? 'rgba(255,255,255,0.6)' : '#D1D5DB'} />
  </TouchableOpacity>
);
