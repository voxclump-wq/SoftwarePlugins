/**
 * AGI Character Service - Website to Unity WebGL Bridge
 * 
 * This file exposes a clean global API for your website to control AGI characters
 * inside embedded Unity WebGL games.
 * 
 * Usage:
 *   1. Include this script on the page that hosts the Unity build.
 *   2. After Unity loads, call AGICharacterService.applyCharacter(...)
 * 
 * Matches the C# AGICharacterBridge in the Unity package.
 */

(function () {
  'use strict';

  // Global service object – easy for game devs to call
  window.AGICharacterService = {
    /**
     * Apply a character (created on your website) to the running Unity game.
     * 
     * @param {string} characterId - Unique ID from your character builder
     * @param {Object} options - Optional personality and prompt overrides
     * @param {Object} [options.personalityTraits] - e.g. { aggression: 0.8, humor: 0.6, helpfulness: 0.9 }
     * @param {string} [options.customPrompt] - Override base prompt for LLM/dialogue
     * @param {string} [options.version] - Payload version for future compatibility (default: "1.0")
     */
    applyCharacter: function (characterId, options = {}) {
      if (!window.unityInstance) {
        console.warn('[AGI Service] Unity instance not ready yet. Call this after loading completes.');
        // Optional: queue the call and retry once Unity loads (advanced version can add this)
        return false;
      }

      const payload = {
        characterId: characterId,
        personalityTraits: options.personalityTraits || {},
        customPrompt: options.customPrompt || '',
        version: options.version || '1.0',
        timestamp: Date.now() // Helpful for debugging
      };

      const jsonPayload = JSON.stringify(payload);

      try {
        window.unityInstance.SendMessage(
          'AGICharacterBridge',           // Exact GameObject name in Unity scene
          'ApplyCharacterFromWeb',        // Exact method name in AGICharacterBridge.cs
          jsonPayload
        );
        console.log(`[AGI Service] Applied character: ${characterId}`);
        return true;
      } catch (error) {
        console.error('[AGI Service] Failed to send character to Unity:', error);
        return false;
      }
    },

    /**
     * Optional: Check if Unity is ready to receive commands
     */
    isReady: function () {
      return !!window.unityInstance;
    },

    /**
     * Optional callback registry for events coming back from Unity
     * (e.g., "character reacted with high aggression")
     * 
     * Usage: AGICharacterService.onUnityEvent = function(eventType, details) { ... }
     */
    onUnityEvent: null
  };

  // Expose a helper to register the Unity instance (call this from your embedding code)
  window.registerUnityInstance = function (instance) {
    window.unityInstance = instance;
    console.log('[AGI Service] Unity instance registered – ready for character updates.');
  };

})();