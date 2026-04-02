// Web/react-component/AGICharacterProvider.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const AGIContext = createContext();

export function AGICharacterProvider({ 
  children, 
  buildConfig, // { loaderUrl, dataUrl, frameworkUrl, codeUrl, ... }
  onUnityLoaded 
}) {
  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    ...buildConfig,
    // Add any additional Unity config here
  });

  // Register the instance so plain JS API (agi-service.js) can also work
  useEffect(() => {
    if (isLoaded && onUnityLoaded) {
      // For compatibility with the plain JS service
      window.registerUnityInstance({
        SendMessage: sendMessage
      });
      onUnityLoaded();
    }
  }, [isLoaded, sendMessage, onUnityLoaded]);

  const applyCharacter = (characterId, options = {}) => {
    if (!isLoaded) {
      console.warn('[AGI React] Unity not loaded yet');
      return false;
    }

    const payload = JSON.stringify({
      characterId,
      personalityTraits: options.personalityTraits || {},
      customPrompt: options.customPrompt || '',
      version: '1.0',
      timestamp: Date.now()
    });

    sendMessage('AGICharacterBridge', 'ApplyCharacterFromWeb', payload);
    console.log(`[AGI React] Applied character: ${characterId}`);
    return true;
  };

  const value = {
    applyCharacter,
    isLoaded,
    unityProvider
  };

  return (
    <AGIContext.Provider value={value}>
      <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
      {children}
    </AGIContext.Provider>
  );
}

export const useAGICharacter = () => useContext(AGIContext);