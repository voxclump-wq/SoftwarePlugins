using UnityEngine;
using System;
using AGICharacterService;

public class AGICharacterBridge : MonoBehaviour
{
    /// **Summary:**

    /// Clean event other scripts can subscribe to when a new character arrives from the website.
    /// This keeps your game code decoupled and maintainable.
    /// 
    public event Action<CharacterData> OnCharacterApplied;

    /// **Summary:**

    /// Called automatically by the website via SendMessage.
    /// Do NOT rename this method or the GameObject (must be named "AGICharacterBridge").
    /// 
    public void ApplyCharacterFromWeb(string jsonPayload)
    {
        if (string.IsNullOrEmpty(jsonPayload))
        {
            Debug.LogError("[AGI Service] Received empty payload from website.");
            return;
        }

        try
        {
            CharacterData data = JsonUtility.FromJson<CharacterData>(jsonPayload);

            Debug.Log($"[AGI Service] Successfully received character: {data.characterId} | Prompt length: {data.customPrompt.Length}");

            // Apply the character in your game (you implement this part)
            ApplyToGameLogic(data);

            // Notify any other scripts (dialogue system, NPC controller, LLM wrapper, etc.)
            OnCharacterApplied?.Invoke(data);
        }
        catch (Exception e)
        {
            Debug.LogError($"[AGI Service] Failed to parse character JSON: {e.Message}\nPayload: {jsonPayload}");
        }
    }

    /// **Summary:**

    /// Hook your actual game logic here.
    /// Examples:
    /// - Pass data.customPrompt to your LLM / dialogue system
    /// - Update behavior tree weights using personalityTraits
    /// - Change NPC animations, voice, name, etc.
    /// 
    private void ApplyToGameLogic(CharacterData data)
    {
        // TODO: Replace with your own implementation
        Debug.Log($"[AGI Service] Applying prompt to game: {data.customPrompt.Substring(0, Mathf.Min(100, data.customPrompt.Length))}...");

        // Example integration ideas:
        // DialogueSystem.Instance.SetBasePrompt(data.customPrompt);
        // NPCBehavior.Instance.SetTraits(data.personalityTraits);
        // LLMWrapper.Instance.UpdateSystemPrompt(data.customPrompt);
    }

    /// **Summary:**

    /// Optional: Call this from your game to send events back to the website
    /// (e.g. "character just insulted the player")
    /// 
    public void ReportEventToWeb(string eventType, string details)
    {
        // This will be implemented via .jslib in the next file
        Debug.Log($"[AGI Service] Event to website: {eventType} - {details}");
    }
}