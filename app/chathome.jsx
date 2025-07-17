import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';


const ChatBotHome = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Bot',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Replace with your actual GitHub openAi token
  //  const GITHUBAPI_TOKEN = '';

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const callOpenAI = async (userMessage) => {
    try {
      const response = await fetch('https://models.github.ai/inference/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUBAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 1,
          max_tokens: 4096,
          top_p: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    if (!GITHUBAPI_TOKEN || GITHUBAPI_TOKEN === 'your_github_token_here') {
      Alert.alert(
        'API Token Missing',
        'Please add your GitHub token to use the AI features.',
        [{ text: 'OK' }]
      );
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: 'You',
      text: inputText.trim(),
      isUser: true,
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      // Call OpenAI API
      const aiResponse = await callOpenAI(currentInput);
      
      // Add AI response
      const botMessage = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: aiResponse,
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        isUser: false,
      };

      setMessages(prev => [...prev, errorMessage]);
      
      Alert.alert(
        'Error',
        'Failed to get AI response. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'Bot',
        text: 'Hello! I\'m your AI assistant. How can I help you today?',
        isUser: false,
      },
    ]);
  };

  return (
    <SafeAreaView className='flex-1 bg-[#f5f5f5] mt-5' style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View  className='bg-[#00bcff] py-4 px-5 flex-row justify-between items-center'>
          <Text className="text-lg font-extrabold text-gray-800">AI ChatBot</Text>
          <TouchableOpacity 
           className="bg-white px-3 py-1.5 rounded-2xl border border-gray-300"
            onPress={clearChat}
          >
            <Text className="text-gray-600 text-sm font-medium">Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
           className="flex-1 px-4 py-2.5"
          showsVerticalScrollIndicator={false}
        >
           {messages.map((message) => (
            <View key={message.id} className="mb-4">
              <Text
                className={`text-sm font-bold mb-1 ${
                  message.isUser ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message.sender}:
              </Text>
              <View
                className={`p-3 rounded-lg max-w-[85%] ${
                  message.isUser
                    ? 'bg-[#00bcff] self-end'
                    : 'bg-white self-start border border-gray-200'
                }`}
              >
                <Text
                  className={`text-sm leading-5 text-gray-800`}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
          
      {/* Loading indicator */}
          {isLoading && (
            <View className="flex-row items-center justify-center py-2.5">
              <ActivityIndicator size="small" color="#666666" />
              <Text className="ml-2 text-gray-600 text-sm italic">AI is thinking...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="bg-white px-4 py-2.5 border-t border-gray-200">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base min-h-[50px] max-h-[100px] bg-gray-50"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything"
            placeholderTextColor="#999999"
            multiline
            maxLength={1000}
            editable={!isLoading}
          />
          <TouchableOpacity
            className={`py-4 rounded-lg items-center justify-center ${
              isLoading || !inputText.trim() ? 'bg-gray-200' : 'bg-[#d4c441]'
            }`}
            onPress={sendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#333333" />
            ) : (
              <Text className="text-gray-800 text-base font-bold">Let's Go</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ChatBotHome;





