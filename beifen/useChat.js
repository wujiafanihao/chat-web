import { useState, useCallback } from 'react';

const API_URL = 'http://your-api-url.com/api'; // 替换为你的实际API URL

const useChat = () => {
  const [chatSessions, setChatSessions] = useState([]); // 存储所有聊天会话的数组
  const [activeSession, setActiveSession] = useState(null); // 当前激活的聊天会话ID
  const [isLoading, setIsLoading] = useState(false); // 表示当前是否正在加载数据的布尔值
  const [error, setError] = useState(null); // 存储错误信息的字符串

  // 获取所有聊天会话的函数
  const fetchSessions = useCallback(async () => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const response = await fetch(`${API_URL}/sessions`); // 发送获取会话的请求
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      const data = await response.json(); // 解析响应数据
      setChatSessions(data); // 更新聊天会话状态
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, []);

  // 创建新的聊天会话的函数
  const createSession = useCallback(async () => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST', // 发送创建会话的POST请求
      });
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      const data = await response.json(); // 解析响应数据
      setChatSessions(prevSessions => [...prevSessions, data]); // 更新聊天会话状态
      setActiveSession(data.id); // 设置新创建的会话为激活状态
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, []);

  // 删除指定聊天会话的函数
  const deleteSession = useCallback(async (sessionId) => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'DELETE', // 发送删除会话的DELETE请求
      });
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      setChatSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId)); // 更新聊天会话状态
      if (activeSession === sessionId) {
        setActiveSession(null); // 如果删除的是激活的会话，则取消激活状态
      }
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, [activeSession]);

  // 发送消息到指定聊天会话的函数
  const sendMessage = useCallback(async (sessionId, content, model) => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`, {
        method: 'POST', // 发送消息的POST请求
        headers: {
          'Content-Type': 'application/json', // 设置请求头
        },
        body: JSON.stringify({
          content,
          model,
          type: 'HumanMessage', // 消息类型
        }),
      });
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      const data = await response.json(); // 解析响应数据
      setChatSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === sessionId 
            ? { ...session, messages: [...session.messages, data] }
            : session
        )
      ); // 更新聊天会话状态
      return data; // 返回消息数据
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
      throw err; // 抛出错误
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, []);

  // 上传文件的函数
  const uploadFile = useCallback(async (file, embeddingModel, knowledgeBaseName) => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const formData = new FormData();
      formData.append('file', file); // 添加文件到formData
      formData.append('embeddingModel', embeddingModel); // 添加embeddingModel到formData
      formData.append('knowledgeBaseName', knowledgeBaseName); // 添加knowledgeBaseName到formData

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST', // 发送上传文件的POST请求
        body: formData, // 设置请求体
      });
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      const data = await response.json(); // 解析响应数据
      return data; // 返回上传文件的数据
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
      throw err; // 抛出错误
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, []);

  // 获取流式响应的函数
  const getStreamResponse = useCallback(async (sessionId, content, model) => {
    setIsLoading(true); // 开始加载，设置isLoading为true
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}/stream`, {
        method: 'POST', // 发送流式响应的POST请求
        headers: {
          'Content-Type': 'application/json', // 设置请求头
        },
        body: JSON.stringify({
          content,
          model,
          type: 'HumanMessage', // 消息类型
        }),
      });
      if (!response.ok) {
        throw new Error('网络响应不正常'); // 如果响应不正常，抛出错误
      }
      const reader = response.body.getReader(); // 获取响应体的读取器
      const decoder = new TextDecoder('utf-8'); // 创建文本解码器
      let data = '';
      while (true) {
        const { done, value } = await reader.read(); // 读取响应体
        if (done) break; // 如果读取完成，退出循环
        data += decoder.decode(value, { stream: true }); // 解码并拼接数据
      }
      return data; // 返回流式响应的数据
    } catch (err) {
      setError(err.message); // 捕获错误并更新错误状态
      throw err; // 抛出错误
    } finally {
      setIsLoading(false); // 加载结束，设置isLoading为false
    }
  }, []);

  // 返回所有状态和函数
  return {
    chatSessions,
    activeSession,
    isLoading,
    error,
    fetchSessions,
    createSession,
    deleteSession,
    sendMessage,
    setActiveSession,
    uploadFile,
    getStreamResponse,
  };
};

export default useChat;